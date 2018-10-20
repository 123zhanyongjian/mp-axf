<template>
    <div>

        <div>
            <garya :text="msg" />
            <div v-if="productstype.length>0">

                <div class="address">
                    <div>
                        <ul class="info">
                            <li>收
                                <span style="visibility: hidden;">a</span>货
                                <span style="visibility: hidden;">a</span>人</li>
                            <li>电
                                <span style="visibility: hidden;">了</span>
                                <span style="visibility: hidden;">里</span> 话</li>
                            <li>收 货 地址</li>
                        </ul>
                        <ul class="delet">
                            <li>{{data.name}}</li>
                            <li>{{data.tel}}</li>
                            <li>{{data.addes}}</li>
                        </ul>
                    </div>
                    <div class="patch" @click="patch">
                        <span>修改</span>
                        <span class="img">

                            <img src="../../../static/image/right.png" alt="">
                        </span>
                    </div>

                </div>
                <div class="time">
                    <span @click="dj">收货时间</span>
                    <span>
                        <picker style="display:inline-block" @change="bindPickerChange" :value="index" :range="array">
                            <view class="picker" style="color:red">
                                {{array[index]}}
                            </view>

                        </picker>
                        <p class="ts">￥0起送，22点前满39免运费，不满39收￥5运费</p>
                    </span>
                    <span class="imgq">

                        <img src="../../../static/image/right.png" alt="">
                    </span>

                </div>
                <scroll-view scroll-y="true" class="product">
                    <ul>
                        <li class="productchild" v-for="(item,index) in productstype" :key="index">
                            <div class="cartimg" style="flex: 1.3;height:100%;float:left;">
                                <span class="check" :class="!item.check?'checkactive':''" @click="changecheck(item)"></span>
                                <img :src="item.app_mimg" alt="" @click="godelt(item)">
                            </div>
                            <div style="height:100%;float:left;padding:0 20rpx;flex: 3;text-align: center;">
                                <p>{{item.name}}</p>

                                <p style="color:red">￥{{item.price}}</p>
                                <div class="numm">

                                    <span class="num" v-if="item.pre_state>0" @click="reduceproduct(item)">-</span>
                                    <span class="nume" v-if="item.pre_state>0">{{item.pre_state}}</span>
                                    <span class="num" @click="addproduct(item)">+</span>

                                </div>
                            </div>
                            <div style="flex:1"></div>
                        </li>
                    </ul>
                    <div class="pay">
                        <span class="check" style="left:16rpx !important;top:46rpx;" :class="!ALL?'checkactive':''" @click="changeAll"></span>
                        <div style="position: relative;float: left;width:470rpx;">

                            <span class="All">全选</span>
                            <span class="tatals">共：￥{{total}}</span>
                        </div>
                        <div class="btns" :class="total==0?'active':''">
                            {{state}}
                        </div>
                    </div>
                </scroll-view>
            </div>
            <div class="Noproduct" v-if="productstype.length==0">
                <div class="Noproduct-cotent">
                    <div class="bg"></div>
                    <span style="color:#999;font-size: 28rpx">购物车空空如也的耶~</span>
                    <br>
                    <span class="goshop" @click="goshop">去逛逛</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import garya from "@/components/gary";
import carts from "@/components/components";
export default {
    data() {
        return {
            msg: "购物车",
            array: ["今天 30分钟内送达(可预订)"],
            index: 0,
            total: 0,
            ALL: true,
            num: 1,
            state: "选好了",
            data:{
                name:'111',
                tel:1111,
                add:99999
            }
        };
    },

    watch: {
        total(e) {
            if (e) {
                this.state = "选好了";
            } else {
                this.state = "满￥0元起送";
            }
        },
        globalData: {
            handler: function(e) {
                console.log(555);
            },
            deep: true
        }
    },
    computed: {
        productstype() {
            return this.globalData.cart;
        }
        // total(){
        //     var s=0;
        //     if(this.productstype!=undefined){
        //         for(let i of this.productstype){
        //            s=s+ i.price*i._had_pm;

        //     }
        //     return s
        //     }else{
        //         return 0
        //     }
        // }
    },

    components: {
        garya
    },

    created() {},

    onShow(w) {
              
        if(this.globalData.add!=undefined){
              this.data = this.globalData.add;
        }
        console.log(this.productstype);
        this.total = this.globalData.total;
        // this.productstype=[this.globalData.appOptions.data.products['103821'][0]]
        var time = new Date();
        var H = time.getHours();
        console.log(this.productstype);
        for (let i = 0; i < 6; i++) {
            H += 1;
            //当达到24点，自动为0点
            if (H == 24) {
                H = 0;
            }

            if (H < time.getHours()) {
                var contnet = "明天 " + H + ":00-" + Number(H + 1) + ":00";
            } else {
                var contnet = "今天 " + H + ":00-" + Number(H + 1) + ":00";
            }
            this.array.push(contnet);
        }
    },
    methods: {
        dj() {
            if (this.total) {
                this.total = 0;
            } else {
                this.total = 1;
            }
            // wx.showModal({
            //     title: "提示",
            //     content: "这是一个模态弹窗",
            //     success: function(res) {
            //         if (res.confirm) {
            //             console.log("用户点击确定");
            //         } else if (res.cancel) {
            //             console.log("用户点击取消");
            //         }
            //     }
            // });
        },
        //进入详情页
        godelt(item) {
            var product = JSON.stringify(item);
            const url = "../Details/main?product=" + product;
            wx.navigateTo({ url });
        },
        bindPickerChange(e) {
            this.index = e.mp.detail.value;
        },
        //路由跳转
        goshop() {
            wx.switchTab({
                url: "../cartshop/main"
            });
        },
        //跳转到修改页面
        patch(){
          const url = "../Addaddrss/main";
            wx.navigateTo({ url });
        },
        //添加商品
        addproduct(item) {
            carts.cart(this, item);
            setTimeout(() => {
                this.total = this.globalData.total;
            });
        },
        reduceproduct(item) {
            // console.log(6666)
            carts.del(this, item);
            setTimeout(() => {
                this.total = this.globalData.total;
                console.log(this.globalData.total);
            });
        },
        //切换选中状态
        changecheck(item) {
            carts.change(this, item);
            setTimeout(() => {
                this.total = this.globalData.total;
                console.log(this.globalData.total);
            });
        },
        // 切换全选
        changeAll() {
            console.log(44444444);
            this.ALL = !this.ALL;
            for (let i of this.productstype) {
                if (this.ALL) {
                    i.check = true;

                    this.total += i._had_pm * i.price;
                } else {
                    i.check = false;
                    this.total = 0;
                }
            }
        }
    }
};
</script>
<style scoped>
.address {
    width: 100%;
    height: 200rpx;
    position: relative;
    background-image: url("../../../static/image/border.png"),
        url("../../../static/image/border.png");
    background-position: left top, left bottom;
    background-repeat: repeat-x;
}
.info {
    float: left;
}
.address li {
    padding: 8rpx 20rpx 8rpx 30rpx;
}
.delet li {
    width: 50%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.patch {
    position: absolute;
    text-align: right;
    right: 30rpx;
    top: 40%;
}
.img {
    margin-left: 10rpx;
    position: relative;
}
img {
    width: 60rpx;
    position: absolute;
    bottom: 4rpx;
    height: 40rpx;
}
.imgq {
    width: 60rpx;
    position: absolute;
    top: 40rpx;
    right: 40rpx;
    height: 40rpx;
}
.time {
    position: relative;
    font-size: 28rpx;
    width: 100%;
    height: 120rpx;
    line-height: 60rpx;
    padding: 20rpx;
}
picker {
    margin-left: 100rpx;
}
.ts {
    font-size: 24rpx;
    color: #999;
}
.product {
    position: absolute;
    top: 470rpx;
    bottom: 0;
    left: 0rpx;
    right: 0;
    /* background: red; */
}
.product li {
    height: 50px;
    padding: 10rpx;
    font-size: 24rpx;
    border-bottom: 1px solid #e0e0e0;
    border-top: 1px solid #e0e0e0;
    width: 100%;
    /* background: green; */
}
.product li img {
    width: 100rpx;
    height: 100rpx;
    float: left;
}
.productchild {
    display: flex;
    position: relative;
    width: 100%;
}
.productchild div > p {
    height: 50rpx;
    width: 90%;
    text-align: left;
}
.numm {
    position: absolute;
    right: 52rpx;
    top: 20rpx;
}
.nume {
    float: right;
    line-height: 30px;
    margin: 0 5px;
}
.cartimg {
    position: relative;
}
.cartimg > img {
    position: absolute;
    right: 0;
}
.check {
    display: inline-block;
    position: absolute;
    width: 45rpx;
    height: 45rpx;
    background: url("../../../static/image/check1.png");
    background-size: 100% 100%;
    left: 10rpx;
    top: 25rpx;
}
.checkactive {
    background: url("../../../static/image/check.png");
    background-size: 100% 100%;
}
.num {
    width: 60rpx;
    /* position: absolute; */
    height: 60rpx;
    line-height: 60rpx;
    float: right;
    display: inline-block;
    border: 2rpx solid #e0e0e0;
    border-radius: 50%;
    text-align: center;
    color: red;
    font-size: 28rpx;
}
.pay {
    width: 100%;
    font-size: 26rpx;
    line-height: 120rpx;
    height: 120rpx;
    position: relative;
    padding: 10rpx 10rpx 10rpx 64rpx;
}
.All {
}
.tatals {
    color: red;
    margin-left: 40rpx;
}
.btns {
    background: #ffd600;
    width: 240rpx;
    float: left;
    text-align: center;
    height: 100%;
}
.active {
    background: gray !important;
}
.Noproduct {
    position: absolute;
    bottom: 0;
    top: 110rpx;
    right: 0;
    left: 0;
    background: #efefef;
}
.Noproduct-cotent {
    padding-top: 20%;
    text-align: center;
    line-height: 80rpx;
}
.Noproduct-cotent > .bg {
    background-image: url("../../../static/image/carts.png");
    background-size: 100% 100%;
    margin: auto;
    width: 160rpx;
    height: 160rpx;
    /*background:center center no-repeat;*/
}
.goshop {
    border: 1px solid #e0e0e0;
    border-radius: 6rpx;
    padding: 8rpx 60rpx;
    font-size: 28rpx;
}
</style>

