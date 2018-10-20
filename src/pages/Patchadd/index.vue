<template>
    <div class="mainse">
        <gary text="修改地址" />
        <span class="bc" @click="Tuanz">保存</span>
        <div class="mains">
            <div class="name">
                <p>联
                    <span class="yc">a</span>系
                    <span class="yc">a</span>人: </p>
                <p>
                    <input type="text" placeholder="收货人姓名" v-model="Info1.name">
                </p>
            </div>
            <div class="name">
                <p>手
                    <span class="yc">a</span>机
                    <span class="yc">a</span>号: </p>
                <p>
                    <input type="number" placeholder="鲜蜂侠联系您的电话" v-model="Info1.tel">
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
                    <input type="text" placeholder="请输入详细地址" v-model="Info1.add">
                </p>
            </div>

        </div>
        <div class="deladdres" @click="del">
            删除地址
        </div>
    </div>
</template>
<script>
import gary from "@/components/gary";
export default {
    data() {
        return {
            title1:'',
            indexs:0,
            Info1: {
                name: "",
                tel: "",
                add: ""
            },
            citys: "请选择城市",
            index: 20,
            info: {
                title: ""
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
    watch: {
        index(e) {
            if (e === 20) {
                this.citys = "请选择城市";
            } else {
                this.citys = this.city[this.index].name;
            }
        }
    },
    components: {
        gary
    },
    onLoad(e) {
        if (e.item !== undefined) {
            this.info = JSON.parse(e.item);
            console.log(this.info);
        } else if (e.abc !== undefined) {

            this.indexs=e.abc
            this.Info1 = this.$store.state.Alladdress[e.abc];
            this.index= this.$store.state.Alladdress[e.abc].index;
            this.title1=e.title;
            this.info.title=this.$store.state.Alladdress[e.abc].add
           console.log(this.info.title,11111)
        }
    },
     onShow(){
    if(this.$store.state.map!==''){
        this.info=this.$store.state.map;
       if(this.title1!=''){
         this.info.title=this.title1;
       }
    }
   
   },
    methods: {
        bindPickerChange(e) {
            this.index = e.mp.detail.value;
            this.info.title = "请选择地址";
        },
        map() {

            if (this.index === 20) {
                return wx.showToast({
                    title: "请先选择城市",
                    icon: "none"
                });
            }
            this.title1='';
            if (this.info.title == "请选择地址") {
                var city = JSON.stringify(this.city[this.index]);
            } else {
                var city = JSON.stringify(this.info);
            }
            const url = "../map/main?city=" + city;
            
            wx.navigateTo({ url });
        },
        Tuanz() {
             this.Info1['index']=this.indexs;
             this.Info1['title']=this.info.title
             console.log(this.Info1)
            this.$store.commit('PATCHADDRESS',this.Info1)
            wx.navigateTo({
                url: '../Addaddrss/main'
            });
        },
        //删除地址
        del(){
            var that=this;
             wx.showModal({
        title: "提示",
        content: "确定删除地址？",
        success:function(res){
            if (res.confirm) {
          that.$store.commit('DELADDRESS',that.indexs);
           wx.redirectTo({
                url: '../Addaddrss/main'
            });
        }}
        
        })
            
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


