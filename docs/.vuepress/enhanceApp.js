// 使用异步函数也是可以的
import VuePhotoPreview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import PageTags from './components/page-tags.vue'
import ImageDescription from './components/image-description.vue'
import ImageGroup from './components/image-group.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(<ClientOnly>VuePhotoPreview</ClientOnly>)
  Vue.use(Element)
  Vue.use(PageTags)
  Vue.use(ImageDescription)
  Vue.use(ImageGroup)
}
