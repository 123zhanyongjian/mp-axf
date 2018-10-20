<template>
    <div>
        <card :text="add"/>
        <div>

        </div>
        <scroll-view class="mianse" scroll-y="true">
            <swiper autoplay interval="3000" circular indicator-color="#fff" indicator-active-color="#ffd600" indicator-dots>
                <swiper-item>
                    <img src="../../../static/image/lbt.png" alt="">
                </swiper-item>
                <swiper-item>
                    <img src="../../../static/image/lbt2.png" alt="">
                </swiper-item>
            </swiper>
            <div style="height:711rpx" v-for="(item,index) in data" :key="index">
                <div class="titlee">
                    <span class="tiao"></span>
                    <span>{{item.name}}</span>
                    <span @click="More">更多</span>

                    <span></span>
                </div>
                <div class="imgs">
                    <img src="../../../static/image/jsyl.jpg" alt="">
                    <ul class="products">
                        <li v-for="(ints,ins) in data[index].product" :key="ins" v-if="ins<=2">
                            <p>
                                <img style="width:100%;height:200rpx" :src="ints.app_mimg" alt="" @click="godelt(ints)">
                            </p>
                            <span class="title"></span>
                            <div class="info">
                                <p style="float:left">
                                    <span>{{ints.name}}</span>
                                    <br>

                                </p>
                                <p>
                                    <p class="pric">
                                        <span style="display:block；"></span>
                                        <span style="color:red;">￥{{ints.price}}</span>
                                    </p>
                                    <!-- <span style=" text-decoration:line-through;margin-left:10rpx">￥3</span> -->
                                  
                                    <span class="num" @click="addproduct(ints)">+</span>
                                </p>
                            
                            </div>
                        </li>

                    </ul>
                    <div class="hr"></div>
                </div>

            </div>
        </scroll-view>
    </div>

</template>

<script>
import card from "@/components/card";
import carts from "@/components/components";

export default {
    data() {
        return {
            motto: "Hello World",
            userInfo: {},
            hidden: true,
            img: "",
            data1: [],
            data: [],
            datas: [],
            add: "同泰时代广场"
        };
    },

    components: {
        card
    },

    methods: {
        //进入详情页
        godelt(item) {
            var product = JSON.stringify(item);
            const url = "../Details/main?product=" + product;
            wx.navigateTo({ url });
        },
        bindViewTap() {
            const url = "../logs/main";
            wx.navigateTo({ url });
        },
        gouser() {
            const url = "../user/main";
            wx.navigateTo({
                url
            });
        },
        getUserInfo() {
            // 调用登录接口
            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: res => {
                            this.userInfo = res.userInfo;
                            // console.log(this.userInfo);
                        }
                    });
                }
            });
        },
       
        //添加商品
        addproduct(item) {
            carts.cart(this, item);
        },
        //跳转
        More() {
            wx.switchTab({
                url: "../cartshop/main"
            });
        }
    },

    onLoad() {
        // 调用应用实例的方法获取全局数据
        this.getUserInfo();
        console.log(this.$store.state);

        var that = this;
        var a = [];
        this.globalData["cart"] = a;
    },
    onShow() {
        console.log(this);
        if (this.globalData.add != undefined) {
            this.add = this.globalData.add.addes;
        }
    },
    mounted() {
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
        var that = this;
        console.log(window)
       
        wx.request({
            url:
                "http://m.beequick.cn/data/getCategoryProduct?asid=5b9b28f2d78df5406&_r=0.9496929448575357&reflogid=5bc1b1b0cd0e32450&location_hash=a5f06bprBBp3mAaQtsGpQGLezHYn3Y7cemKRVOIOyivMyawXLMnTBAcEssA3ES5p6z2qDdPLyhWJfO5hBoYwA&zchtid=3879&bigids=2%2C0",
            success: function(res) {
                that.data = res.data.data.categories;
                for (let i of that.data) {
                    i["product"] = [];
                    for (let j in res.data.data.products) {
                        if (j == i.id) {
                            for (let k = 0; k <= 2; k++) {
                                i.product.push(res.data.data.products[j][k]);
                                if (
                                    i.product[i.product.length - 1] == undefined
                                ) {
                                    i.product.splice(i.product.length - 1, 1);
                                }
                            }
                        }
                    }
                }

                //   that.datas = res.data.data;
                that.globalData.appOptions = res.data;
                // that.hidden = false;
                // console.log(that.globalData, that.hidden,res.data);
                // // that.img = res.data.data.products["103821"][2].app_mimg;

                // that.data = res.data.data.categories;

                // for (let i = 0; i < that.data.length; i++) {
                //     that.data[i]["names"] = that.data[i]["name"];
                //     //   that.data[i]['pro']=res.data.data.products
                // }
                wx.hideLoading({});

                console.log(that.data[12].product[2]);
            }
        });
        setTimeout(() => {
            console.log(that.hidden, 5555);
        });
    }
};
</script>

<style scoped>
.userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
}

.userinfo-nickname {
    color: #aaa;
}

.usermotto {
    margin-top: 150px;
}

.form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
}
img {
    width: 100%;
    height: 100%;
}
.titlee {
    width: 100%;
    position: relative;
    height: 96rpx;
}
.titlee :nth-child(1) {
    display: inline-block;
    height: 60%;
    width: 12rpx;
    /* margin-left: 6rpx; */
    margin: 20rpx 12rpx;
    background: red;
}
.titlee :nth-child(2) {
    display: inline-block;
    top: 36rpx;
    position: absolute;
    font-size: 36rpx;
    color: red;
    line-height: 80%;
    font-weight: 700;
}
.titlee :nth-child(3) {
    display: inline-block;
    top: 42rpx;
    right: 60rpx;
    position: absolute;
    font-size: 26rpx;
    color: #999;
    line-height: 80%;
    /* font-weight: 700; */
}
.titlee :nth-child(4) {
    display: inline-block;
    top: 36rpx;
    height: 30%;
    width: 38rpx;
    right: 0rpx;
    position: absolute;
    /* font-size: 26rpx; */
    background: url("../../../static/image/right.png");
    background-size: 100% 100%;
    color: #999;

    line-height: 80%;
    /* font-weight: 700; */
}
.content {
    width: 100%;
}
.imgs {
    height: 180rpx;
}
.products {
    width: 100%;
    height: 420.5rpx;
}
.products > li {
    width: 30%;
    height: 100%;
    padding: 1.5%;
    position: relative;
    font-size: 24rpx;
    float: left;
    border-right: 1px solid #e0e0e0;
}
.products > li:nth-child(3) {
    /* background: red */
    border: none;
}
.products > li > .title {
    /* font-size: 24rpx; */
    display: inline-block;
    width: 100%;
    height: auto;
    text-align: left;
}
.info {
    width: 100%;
}
.info > p:nth-child(1) {
    color: #999;
}
.num {
    width: 60rpx;
    position: absolute;
    height: 60rpx;
    line-height: 60rpx;
    float: right;
    display: inline-block;
    border: 2rpx solid #e0e0e0;
    border-radius: 50%;
    text-align: center;
    right: 10rpx;
    bottom: 50rpx;
    color: red;
    font-size: 28rpx;
}
.hr {
    width: 100%;
    height: 10rpx;
    background: #e6e6e6;
}
.mianse {
    position: absolute;
    top: 110rpx;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: scroll;
}
.pric {
    position: absolute;
    left: 10rpx;
    bottom: 69rpx;
}
</style>
