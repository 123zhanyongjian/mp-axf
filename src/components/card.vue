<template>
  <div>
    <div class="header">
     <div>
         <span class="search"></span>
         <span class="serach1">搜索</span>
     </div>
       <span>
         {{text}}
       </span>
      
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style scoped>
  .header{
    background: #ffd600;
    width: 100%;
    height:110rpx; 
    position: relative;
  }
  .header>span{
    display: inline-block;
    width: 100%;
    line-height: 110rpx;
    text-align: center;
    font-size:30rpx;
    font-weight: 700;
  }
  .search{
    position: absolute;
    display: inline-block;
    width:46rpx !important;
    top:16rpx;
    right:16rpx;
    height: 46rpx;
    background: url('../../static/image/serach.png');
    background-size:100% 100%; 
    z-index: 10;

    
  }
  .serach1{
     position: absolute;
    display: inline-block;
    font-size: 24rpx;
    top:60rpx;
    right:16rpx;
    
    /* background: url('../../static/image/serach.png'); */
    background-size:100% 100%; 
    z-index: 10;
  }
</style>
