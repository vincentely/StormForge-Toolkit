import schema from '../../../../release/schema/manifest.v1.schema.json';
export function GET() {
  return new Response(JSON.stringify(schema, null, 2), {
    headers: { 'Content-Type': 'application/schema+json; charset=utf-8' },
  });
}
