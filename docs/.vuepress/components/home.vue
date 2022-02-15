<template>
<div class="container">
  <div class="content">
    <h1>学习总结与记录</h1>  
    <ul class="list">
      <li><a href="/tech/css/css-box-model/">技术</a></li>  
      <li><a href="/read/">读书</a></li>  
    </ul>
  </div>  
</div>
  
</template>
<script>
export default {
  name: 'home',
  props: ['text']
}
</script>

<style rel="stylesheet/scss" scoped>
  .container{
    background: url("/bg.jpeg") no-repeat;
    min-height: 100vh;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    color: white;
  }
  .list li a{
    color: white;
  }
</style>