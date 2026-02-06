import esbuild from 'esbuild'
import path from 'path'
import { exec } from 'child_process'
import os from 'os'

const step = process.argv[2]
const PORT = process.argv[3] || 5500 // default for Live Server

if (!step) {
  console.error('Usage: node build.mjs <step>')
  process.exit(1)
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

const url = `http://localhost:${PORT}/${step}/index.html`

exec(openCommand(url), err => {
  if (err) {
    console.error('Failed to open browser:', err)
  } else {
    console.log(`The page for step ${step} should now be open in your browser`)
  }
})