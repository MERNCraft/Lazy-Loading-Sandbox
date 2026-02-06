import esbuild from 'esbuild'
import { join } from 'path'
import { readdirSync } from 'fs'

const options = { withFileTypes: true }
const folderNames = readdirSync('./', options)
  .filter( Dirent => Dirent.isDirectory() )
  .map( Dirent => Dirent.name )
  // Exclude directories whose names are not pure numbers
  .filter( name => !isNaN(name ))

// Delete the `dist/` directory in each of the folders
folderNames.forEach( async folderName => {
  const entry = join(folderName, 'App.jsx')
  const outdir = join(folderName, 'dist')

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
})