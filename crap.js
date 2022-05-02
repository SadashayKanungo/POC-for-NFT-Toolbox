var rfs = require('recursive-fs')
 
var path = require('path')
var directory = path.resolve(process.cwd(), 'NFTs/Images');

(async () => {
  try {
    var {dirs, files} = await rfs.read(directory)
    console.log(dirs)
    console.log(files)
    console.log('DONE!')
  }
  catch (err) {
    console.error(err)
  }
})()