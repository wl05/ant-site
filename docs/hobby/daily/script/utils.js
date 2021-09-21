const domain = 'http://wangleant.com/turtle-images-thumbnail/'
const formatTitleAndDate = date => `# ${date}
`

const formatImage = (date, pathStr) => `
<image-container>
  <img preview="0" src="${domain}${pathStr}"/>
</image-container>`

const formatVideo = (date, pathStr) => `
<video-container>
  <source src="${domain}${pathStr}"/>
</video-container>`

module.exports = {
  formatImage,
  formatVideo,
  formatTitleAndDate
}
