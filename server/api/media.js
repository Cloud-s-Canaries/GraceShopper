const router = require('express').Router()
const fs = require('fs')

const videoFolder = './public/videos'

function getFiles(dir, files_) {
  files_ = files_ || []
  const files = fs.readdirSync(dir)
  for (let i in files) {
    let name = dir + '/' + files[i]
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else {
      let vidName = `../videos/${name.split('/').pop()}`
      files_.push(vidName)
    }
  }
  return files_
}
let vids = getFiles(videoFolder)

router.get('/videos', (req, res, next) => {
  try {
    console.log('hi')
    res.json(vids)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
