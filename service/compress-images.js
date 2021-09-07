const path = require('path')
const fs = require('fs')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const imagemin = require('imagemin')
// const files = fs.readdirSync()

async function main() {
  try {
    const res = await imagemin(['./demo/IMG_20210706_213042.jpg'], {
      destination: 'compressed-turtle-source',
      plugins: [
        imageminJpegtran({
          quality: [0.6, 0.8]
        }),
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    })

    console.log('======', res)
  } catch (error) {
    console.log(error)
  }
}

main()
