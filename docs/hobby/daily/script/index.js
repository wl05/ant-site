const path = require('path')
const fs = require('fs')
const { formatImage, formatVideo } = require('./utils')

const files = fs.readdirSync(path.resolve(__dirname, '../pictures'))

const formatFiles = files => {
  try {
    const data = new Map()
    for (let file of files) {
      if (/(\.mp4|\.jpg)$/.test(file)) {
        const _ = file.split('_')
        let date = ''
        if (/HwVideoEditor_/.test(file)) {
          date = `${_[1]}-${_[2]}-${_[3]}`
        } else {
          const currentDateStr = _[1].split('')
          date = `${currentDateStr[0]}${currentDateStr[1]}${currentDateStr[2]}${currentDateStr[3]}-${currentDateStr[4]}${currentDateStr[5]}-${currentDateStr[6]}${currentDateStr[7]}`
        }
        const currentData = data.get(date)
        if (!currentData) {
          data.set(date, [file])
        } else {
          data.set(date, [...currentData, file])
        }
      } else {
        throw Error('还有文件没有读到')
      }
    }
    return data
  } catch (error) {
    throw error
  }
}

try {
  const data = formatFiles(files)
  const keys = [...data.keys()].sort((a, b) => {
    if (a < b) {
      // 按某种排序标准进行比较, a 小于 b
      return -1
    }
    if (a > b) {
      return 1
    }
    // a must be equal to b
    return 0
  })

  console.log(
    keys.map(key => {
      return `daily/${key}.md`
    })
  )
  for (let [key, value] of data.entries()) {
    // if (!fs.existsSync(path.resolve(__dirname, `../${key}.md`))) {
    fs.writeFileSync(
      path.resolve(__dirname, `../${key}.md`),
      value.reduce((pre, cur) => {
        if (/(\.mp4)$/.test(cur)) {
          pre += formatVideo(key, cur)
        }

        if (/(\.jpg)$/.test(cur)) {
          pre += formatImage(key, cur)
        }
        return pre
      }, '')
    )
    // }
  }
} catch (error) {
  console.log(error)
}
