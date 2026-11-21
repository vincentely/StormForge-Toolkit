import { desktopArchive, desktopDownload, desktopPackages } from '../scripts/desktop-releases.mjs';

// Uncompressed P-256 point from the official StormHub release key (CNG ECS1).
const publisher = '04f06ec0200155e821092ee4ea29a6a47ed8028809f3972b71761e55d653f9ba968462f1fa39b2eb6b4e5337b09cc38e4c80235af1b1a19434bd4f7474dc274a57';
function hexBytes(text: string) {
  return Uint8Array.from(text.match(/../g)!, byte => Number.parseInt(byte, 16));
}

async function read(path: string, method = 'GET') {
  const response = await fetch(path, { method, redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Download service returned ${response.status}`);
  return response;
}

async function archiveMetadata(url: string) {
  const [archive, sidecar] = await Promise.all([read(url, 'HEAD'), read(url + '.sha256')]);
  const length = Number(archive.headers.get('Content-Length'));
  const checksum = /^([0-9a-f]{64})  ([^\r\n]+)$/.exec((await sidecar.text()).trimEnd());
  if (!Number.isSafeInteger(length) || length < 1 || !checksum || checksum[2] !== url.split('/').at(-1)) {
    throw new Error('Invalid archive metadata');
  }
  return { length, sha256: checksum[1] };
}

async function refreshCard(card: HTMLElement, key: CryptoKey) {
  const saved = desktopPackages.find(p => p.channel === card.dataset.channel && p.product === card.dataset.product);
  if (!saved) throw new Error('Unknown desktop product');
  const { channel, product } = saved;
  const envelope = await (await read(`/downloads/channels/${channel}/${product}/windows-x64.json`)).json();
  if (typeof envelope.signed !== 'string' || !/^[0-9a-f]{128}$/.test(envelope.signature) ||
      !await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, hexBytes(envelope.signature), new TextEncoder().encode(envelope.signed))) {
    throw new Error('Invalid release signature');
  }
  const tip = JSON.parse(envelope.signed);
  if (tip.schema !== 'stormforge.release-channel.v1' || tip.audience !== 'release' ||
      tip.channel !== channel || tip.product !== product || tip.platform !== 'windows-x64' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(tip.version) || !Number.isSafeInteger(tip.sequence) || tip.sequence < saved.sequence ||
      tip.manifest !== `releases/${channel}/${product}/${tip.version}/windows-x64.json`) {
    throw new Error('Invalid release identity');
  }
  const unchanged = tip.version === saved.version && tip.sequence === saved.sequence;
  const stableEntry = product === 'editor' && channel === 'beta';
  if (unchanged && !stableEntry) return;
  if (!unchanged && (tip.sequence === saved.sequence || tip.version === saved.version)) throw new Error('Release identity was reused');

  const immutableUrl = desktopArchive(product, channel, tip.version);
  const { length, sha256 } = await archiveMetadata(immutableUrl);
  const url = desktopDownload(product, channel, tip.version);
  if (stableEntry) {
    const current = await archiveMetadata(url);
    if (current.length !== length || current.sha256 !== sha256 ||
        (unchanged && (length !== saved.size_bytes || sha256 !== saved.sha256))) {
      throw new Error('Stable download does not match the immutable release');
    }
  }
  const link = card.querySelector<HTMLAnchorElement>('a[data-sha256]')!;
  card.querySelector('time')!.textContent = tip.version;
  card.querySelector('[data-size]')!.textContent = length < 1048576
    ? `${(length / 1024).toFixed(0)} KiB` : `${(length / 1048576).toFixed(1)} MiB`;
  card.querySelector('[data-bytes-label]')!.textContent = `${length.toLocaleString('zh-CN')} 字节`;
  card.querySelector('details code')!.textContent = sha256;
  card.querySelector<HTMLAnchorElement>('details a')!.href = url + '.sha256';
  link.dataset.bytes = String(length);
  link.dataset.sha256 = sha256;
  link.href = url;
}

export async function refreshDesktopDownloads() {
  const status = document.getElementById('channel-status');
  if (!status || location.origin !== 'https://stormforge.vollagames.com') return;
  try {
    const key = await crypto.subtle.importKey('raw', hexBytes(publisher), { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-product][data-channel]'))
      .filter(card => card.querySelector('a[data-sha256]'));
    const results = await Promise.allSettled(cards.map(card => refreshCard(card, key)));
    status.hidden = results.every(result => result.status === 'fulfilled');
  } catch {
    status.hidden = false;
  }
}
