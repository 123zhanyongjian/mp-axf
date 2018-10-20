<template>
    <div>
       <gary text="商品收藏"/>
       <div v-if="data.length<=0" class="nolove">
           <div class="bg"></div>
           <p>还没有收藏商品哦</p>
       </div>
       <div v-if="!data.length<=0">
           <scroll-view  scroll-y="true" class="nolove">
                 <ul>
                        <li class="productchild" v-for="(item,index) in data" :key="index" >
                            <div style="flex: 1;height:100%;float:left">
                                <img :src="item.app_mimg" alt="" @click="godelt(item)">
                            </div>
                            <div style="height:100%;float:left;padding:0 20rpx;flex: 2">
                                <p>{{item.name}}</p>
                                <p></p>
                                <p style="color:#999">{{item.specifics}}</p>
                                <p style="color:red">￥{{item.price}}</p>
                                
                            </div>
                        </li>
                    </ul>
           </scroll-view>
       </div>
    </div>
</template>
<script>
import gary from "@/components/gary";
export default {
    data(){
        return{
            data:[]
        }
    },
    onLoad(){
        this.data=this.globalData.love;
        
    },

    methods:{
         //进入详情页
        godelt(item){
         var product=  JSON.stringify(item)
             const url = "../Details/main?product="+product;
            wx.navigateTo({ url });
        },
    },
    components:{
        gary
    }
}
</script>
<style scoped>
.nolove{
    position: absolute;
    top :110rpx;
    bottom: 0;
    right: 0;
    left: 0;
    background: #efefef;
}
.nolove>.bg{
    background-image:url('../../../static/image/love.png');
    background-repeat: no-repeat;
    background-size: contain;
    margin: auto;
    margin-top: 20%;
    width: 160rpx;
    height: 160rpx; 
    
}
.nolove>p{
    text-align: center;
    color: #999;
   
    font-size: 28rpx;
    margin-top:20rpx; 
}
.productchild{
    height: 200rpx;
     background: #fff;
    padding: 10rpx;
    font-size: 24rpx;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
}
.productchild  img {
    width: 200rpx;
    height: 200rpx;
    float: left;
}
</style>

