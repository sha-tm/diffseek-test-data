# diffseek-test-data

Generated fixture tree for DiffSeek live E2E coverage.

## Regenerate

```bash
npm run generate
```

Or:

```bash
DIFFSEEK_FIXTURE_ROOT=. node scripts/diffseek-test-data/generate-fixture-tree.mjs
```

Optional: `DIFFSEEK_FIXTURE_SEED` (default `185108`).

## Layout

- Seven Mortal Kombat–named top-level arenas with nested folders
- Five animal `group=` values in `.gitattributes`
- `CODEOWNERS` on each top-level arena
- Alternating `linguist-generated` folder/file markers (with overrides)
- `ts` / `tsx` / `css` / `json` plus extensionless and binary edge paths under `neutral/`
