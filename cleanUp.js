/**
 * cleanUp.js
 * 
 * Deletes all the dist folders that were created by...
 * 
 *   node build.mjs XX
 * 
 * ... where XX is the numerical name of a folder in this
 * directory.
 */


const { readdirSync, rmSync } = require('fs')
const { join } = require('path')

const options = { withFileTypes: true }
const folderNames = readdirSync(__dirname, options)
  .filter( Dirent => Dirent.isDirectory() )
  .map( Dirent => Dirent.name )
  // Exclude directories whose names are not pure numbers
  .filter( name => !isNaN(name ))

// Delete the `dist/` directory in each of the folders
folderNames.forEach( folderName => {
  const folderPath = join( __dirname, folderName, "dist" )
  rmSync(folderPath, { recursive: true, force: true })
})