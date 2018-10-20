<template>
  <div>
    <div class="header">
     <div>
         
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
    background: #f9fafd;
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
 
 
</style>
