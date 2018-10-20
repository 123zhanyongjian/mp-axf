<script>
import carts from '@/components/components'
export default {
  data(){
    return{
      data:[]
    }
  },
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
    
  },
    onShow() {
   this.$mp.app.globalData.love=this.data;
   this.$mp.app.globalData.Address=this.data;
   console.log(this.$mp.app.globalData);
    },
  
}
</script>

<style>
.xt{
  width: 100%;
  height:24rpx;
  background-color: #efefef;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.numm {
    position: absolute;
    right: 52rpx;
    top: 126rpx;
}
.nume {
    float: left;
    line-height: 30px;
    margin: 0 5px;
}
.num {
    width: 60rpx;
    /* position: absolute; */
    height: 60rpx;
    line-height: 60rpx;
    float: left;
    display: inline-block;
    border: 2rpx solid #e0e0e0;
    border-radius: 50%;
    text-align: center;
    color: red;
    font-size: 28rpx;
}
.productchild {
    display: flex;
    position: relative;
    width: 100%;
}
.productchild div > p {
    height: 50rpx;
    width: 90%;
}

</style>
