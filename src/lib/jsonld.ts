/**
 * Serialize a schema object to a JSON-LD string that is safe to embed inside a
 * `<script type="application/ld+json">` tag.
 *
 * Escaping `<` (and, defensively, `>` and `&`) prevents content — e.g. an FAQ
 * answer that contains a literal `</script>` — from breaking out of the script
 * element and corrupting the structured data. The escaped sequences are valid
 * JSON, so consumers decode them back to the original characters.
 */
export function jsonLd(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
