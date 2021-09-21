<template>
  <div>
    <el-card :body-style="{ padding: '10px' }" shadow="hover">
      <div class="container">
        <div ref="imgContainer" class="img-container" :width="width">
          <slot></slot>
        </div>
      </div>
      <center class="title">{{desc}}</center>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'image-container',
  props: ['width', 'desc'],
  mounted: function () {
    this.$refs.imgContainer.children[0].setAttribute('preview', '1')
    this.$refs.imgContainer.children[0].setAttribute('width', '100%')
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.container {
  height: 638px;
  overflow: hidden;
  position: relative;
}
.img-container {
  width: 100%;
  height: 100%;
  cursor: zoom-in;
  overflow: hidden;
  position: absolute;
  /* transform: translateY(-50%); */
}
.title {
  font-size: 14px;
  text-decoration: underline;
  margin-top: 10px;
}
</style>