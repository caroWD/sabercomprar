const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  minify: true,
  format: 'esm',
  tsconfig: './tsconfig.json',
})

if (!result.success) {
  console.error('Build failed:', result.logs)
  process.exit(1)
}
