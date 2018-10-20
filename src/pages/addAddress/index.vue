<template>
    <div class="mainse">
        <gary text="新增地址" />
        <span class="bc" @click="Tuanz">保存</span>
        <div class="mains">
            <div class="name">
                <p>联<span class="yc">a</span>系<span class="yc">a</span>人: </p>
                <p>
                    <input type="text" placeholder="收货人姓名" v-model="Names">
                </p>
            </div>
            <div class="name">
                <p>手<span class="yc">a</span>机<span class="yc">a</span>号: </p>
                <p>
                    <input type="number" placeholder="鲜蜂侠联系您的电话" v-model="tel">
                </p>
            </div>
            <div class="name">
                <p>所在城市: </p>
                <p>
                    <picker style="display:inline-block;padding-left: 20rpx;width:500rpx;" @change="bindPickerChange" :value="index" :range="city" :range-key="'name'">
                        <view class="picker">
                           {{citys}}
                        </view>

                    </picker>
                </p>
            </div>
            <div class="name">
                <p>所在地区: </p>
                <p class="dq" @click="map">
                    <span style="padding:0 20rpx;">{{info.title}}</span>
                    <img src="../../../static/image/right.png" alt="">
                </p>
            </div>
            <div class="name">
                <p>详细地址: </p>
                <p>
                    <input type="text" placeholder="请输入楼号门牌号等信息" v-model="add">
                </p>
            </div>

        </div>
        
    </div>
</template>
<script>
import gary from "@/components/gary";
export default {
    data() {
        return {
            Names:'',
            add:'',
            tel:'',
            Info1:{
                name:'',
                tel:'',
                add:''
            },
            citys:"请选择城市",
            index: 20,
            info: {
                title: "请选择地址"
            },
            city: [
                {
                    name: "深圳市",
                    longitude: 114.03,
                    latitude: 22.52
                },
                {
                    name: "北京市",
                    longitude: 116.403847,
                    latitude: 39.915526
                },
                {
                    name: "广州市",
                    longitude: 113.273093,
                    latitude: 23.134245
                },
                {
                    name: "上海市",
                    longitude: 121.476788,
                    latitude: 31.234823
                },
                 {
                    name: "南昌市",
                    longitude: 115.8645218847,
                    latitude: 28.6876884562
                }
            ]
        };
    },
    watch:{
        index(e){
            if(e==20){
                this.citys="请选择城市"
            }else{
                this.citys=this.city[this.index].name
            }
        },
       
    },
   onShow(){
    if(this.$store.state.map!==''){
        this.info=this.$store.state.map
    }
   
   },
   onUnload(){
       this. Names='';
        this.add='';
        this. tel='';
    
           this. citys="请选择城市";
            this.index=20;
            this.info.title="请选择地址"
            
   },
    components: {
        gary
    },
   
    methods: {
        bindPickerChange(e) {
            this.index = e.mp.detail.value;
            this.info.title = "请选择地址";
        },
        map() {
              if(this.index===20){
             return   wx.showToast({
                    title: "请先选择城市",
                    icon:'none'
                });
            }
            if (this.info.title == "请选择地址") {
                var city = JSON.stringify(this.city[this.index]);
            } else {
                var city = JSON.stringify(this.info);
            }
            const url = "../map/main?city=" + city;
            // console.log(7777);
            wx.navigateTo({ url });
        },
        Tuanz(){
          
          if(this.name=''||this.tel==''||this.add==''||this.info.title=='请选择地址'){
             return   wx.showToast({
                    title: "填写内容不能为空",
                    icon:'none'
                });
          }else{
              var obj={
                name:this.Names,
                tel:this.tel,
                index:this.index,
                add:this.add,
                title:this.info.title,
                addes:this.info.title+' '+this.add,
                
            }
           
           this.$store.commit('ADDADDRESS',obj)
           setTimeout(()=>{
              const url = "../Addaddrss/main";
            
           
            wx.redirectTo({ url });
        },100)
          }
        }
    }
};
</script>
 <style lang="less" scoped>
.bc {
    position: absolute;
    font-size: 26rpx;
    color: #999;
    right: 20rpx;
    top: 36rpx;
}
.mains {
    font-size: 26rpx;
    background: #fff;
}
input {
    display: inline-block;
    width: 100%;
    padding: 0 20rpx;
    height: 100%;
    /*font-size: 26rpx;*/
}
.name {
    width: 100%;
    padding: 16rpx 20rpx;
    height: 58rpx;
    position: relative;
    line-height: 58rpx;
    border-bottom: 1px solid #f1f1f1;
    > p {
        float: left;
        height: 58rpx;
    }
    img {
        position: absolute;
        right: 120rpx;
        top: 30rpx;
        width: 50rpx;
        height: 30rpx;
        float: right;
    }
}
.yc {
    visibility: hidden;
}
.dq {
}
.mainse {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgb(239, 239, 239);
}
.deladdres {
    margin-top: 30rpx;
    text-align: center;
    line-height: 108rpx;
    height: 108rpx;
    background: #fff;
    font-size: 32rpx;
}
</style>


