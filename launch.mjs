import esbuild from 'esbuild'
import path, { dirname, basename } from 'path'
import { fileURLToPath } from 'url';
import { exec } from 'child_process'
import os from 'os'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = basename(__dirname)

let step = process.argv[2]
const PORT = process.argv[3] || 5500 // default for Live Server


if (!step) {
  console.warn('\nUsage: node build.mjs <step>\nLaunching the app in folder 01 by default:\n\nnode build.mjs 01\n')
  step = "01"
}

const entry = path.join(step, 'App.jsx')
const outdir = path.join(step, 'dist')
const htmlFile = path.join(step, 'index.html')

await esbuild.build({
  entryPoints: [entry],
  outdir,
  bundle: true,
  format: 'esm',
  splitting: true,
  sourcemap: true,
  jsx: 'automatic',
  target: 'es2020',
})

console.log(`Step ${step} built`)

// Open url in your browser.
// This assumes that you have a local server (like VS Code's
// Live Server extension) already running on
// http://localhost:PORT/

function openCommand(target) {
  switch (os.platform()) {
    case 'win32':
      return `start "" "${target}"`
    case 'darwin':
      return `open "${target}"`
    default:
      return `xdg-open "${target}"`
  }
}

const url = `http://localhost:${PORT}/${parentDir}/${step}/index.html`

exec(openCommand(url), err => {
  if (err) {
    console.error('Failed to open browser:', err)
  } else {
    console.log(`The page for step ${step} should now be open in your browser`)
  }
})