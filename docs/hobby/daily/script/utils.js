const path = require('path')

const formatTitleAndDate = date => `# ${date}

<page-tags text="发布于：${date}"></page-tags>`

const formatImage = (date, pathStr) => `${formatTitleAndDate(date)}

<image-container>
  <img src="./pictures/${pathStr}"/>
</image-container>`

const formatVideo = (date, pathStr) => `${formatTitleAndDate(date)}
<video-container>
  <source src="./pictures/${pathStr}"/>
</video-container>`

module.exports = {
  formatImage,
  formatVideo
}
