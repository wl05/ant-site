<template>
  <center class="title">{{text}}</center>
</template>
<script>
export default {
  name: "image-description",
  props:["text"]
}
</script>

<style rel="stylesheet/scss" scoped>
  .title {
   font-size:14px;
   text-decoration:underline
  }
</style>


// <center style="font-size:14px;text-decoration:underline"></center>