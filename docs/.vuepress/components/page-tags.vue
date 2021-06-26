<template>
  <span class="title">{{text}}</span>
</template>
<script>
export default {
  name: "page-tags",
  props:["text"]
}
</script>

<style rel="stylesheet/scss" scoped>
  .title {
    font-size:14px;
    text-decoration: underline
  }
</style>