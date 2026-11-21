import records from '../release/desktop-windows.json' with { type: 'json' };

export const desktopChannels = [
  { id: 'dist', label: '稳定版' },
  { id: 'beta', label: '测试版' },
];

const products = { hub: 'StormHub', editor: 'StormForge' };
const seen = new Set();

export function desktopArchive(product, channel, version) {
  const suffix = product === 'hub' || channel === 'beta' ? `-${channel}` : '';
  const filename = `${products[product]}-${version}${suffix}-Windows-x64.zip`;
  return `https://stormforge.vollagames.com/downloads/packages/${channel}/${product}/${version}/${filename}`;
}

export const desktopPackages = records.map(({ channel, product, version, size_bytes, sha256, sequence }) => {
  const identity = `${channel}/${product}`;
  if (!desktopChannels.some(c => c.id === channel) || !Object.hasOwn(products, product) || seen.has(identity)
      || !/^\d{4}-\d{2}-\d{2}$/.test(version) || !Number.isSafeInteger(size_bytes) || size_bytes < 1
      || !Number.isSafeInteger(sequence) || sequence < 1 || !/^[0-9a-f]{64}$/.test(sha256)) {
    throw new Error(`Invalid desktop release: ${identity}`);
  }
  seen.add(identity);
  const name = products[product];
  const url = desktopArchive(product, channel, version);
  return { channel, product, name, version, size_bytes, sha256, sequence, url, checksum: url + '.sha256' };
});

if (desktopPackages.length !== desktopChannels.length * Object.keys(products).length) {
  throw new Error('Expected both public Windows packages on each channel');
}
