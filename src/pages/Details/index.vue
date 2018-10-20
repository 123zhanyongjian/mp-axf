<template>
    <div>
        <gary :text="data.name+data.specifics" />
        <scroll-view scroll-y="true" class="pro">
            <div class="bg">
                <img :src="img" alt="" srcset="">
            </div>
            <div class="hr"></div>
            <div>
                <p class="name">{{data.name+data.specifics}}</p>
                <p class="name" style="margin-top: 5rpx;">
                    <span style="color:red">￥{{data.price}}</span>

                </p>
            </div>
            <div class="xt"></div>
            <div class="detail">
                <p class="details">商品详情</p>
                <p>
                    <span style="color:#848c99">品
                        <span style="visibility: hidden;">我是</span>牌</span>
                    <span class="pp">{{data.brand_name}}</span>
                </p>
                <p>
                    <span style="color:#848c99">产品规格</span>
                    <span class="pp">{{data.specifics}}</span>
                </p>
                <p>
                    <span style="color:#848c99">保质期限</span>
                    <span class="pp">{{data.safe_day+data.safe_unit_desc}}</span>
                </p>

            </div>
            <div class="axf" style="">
                <img src="../../../static/image/axf.png" alt="">
            </div>
        </scroll-view>
        <footer>
            <div class="Collection" @click="loves">
                <div :class="!state?'coll':'colls'"></div>
                <span>收藏</span>
            </div>
            <div class="add">
                <span>添加商品:</span>

                <span class="num" style="float: none; margin-left: 20rpx;" @click="reduceproduct">-</span>
                <span class="nume" style="float: none;">{{data.pre_state}}</span>
                <span class="num" style="float: none;" @click="addproduct">+</span>

            </div>
            <div class="cart" @click="goshop">
                <span class="numes" v-if="num>0">{{num}}</span>
            </div>
        </footer>
    </div>
</template>
<script>
import gary from "@/components/gary";
import carts from "@/components/components";
export default {
    data() {
        return {
            data: "",
            img: "",
            
            num: 0,
            state:''
        };
    },
    onLoad(w) {
        this.data = JSON.parse(w.product);
        var m = this.data.img;
        var y = m.replace(/200w/g, wx.getSystemInfoSync().windowWidth + "w");
        var z = y.replace(/200h/g, wx.getSystemInfoSync().windowWidth + "h");
        this.img = z;
    },
    components: {
        gary
    },
    onShow() {
        var love=this.globalData.love;
        carts.num(this);
        if(love.length==0){
             this.state=false
        }else{
            for(let i of love){
            if(i.id==this.data.id){
                this.state=true;
                break
            }else{
                this.state=false
            }
        }
        }
        console.log(this.state,55555)
    },
    onUnload(){
        var that=this
         if (that.num) {
                        wx.setTabBarBadge({
                            index: 2,
                            text: that.num.toString()
                        });
                    } else {
                        wx.removeTabBarBadge({
                            index: 2
                        });
                    }
    },
    methods: {
        loves() {
             var love=this.globalData.love;
          
            // console.log(this.love)
            if (!this.state) {
                
               love.push(this.data);
               this.state=true
                wx.showToast({
                    title: "收藏成功"
                });
            } else {
                for(let i=0;i<love.length;i++){
                    if(love[i].id==this.data.id){
                        love.splice(i,1);
                        this.state=false
                        
                    }
                }
                wx.showToast({
                    title: "已取消收藏"
                });
            }
            console.log(love)
        },
        //添加商品
        addproduct() {
            carts.cart(this, this.data);
        },
        //减少商品
        reduceproduct() {
            carts.del(this, this.data);
        },
        //跳转到购物车
        goshop() {
            var that = this;
            wx.switchTab({
                url: "../user/main",
                success: function() {
                    if (that.num) {
                        wx.setTabBarBadge({
                            index: 2,
                            text: that.num.toString()
                        });
                    } else {
                        wx.removeTabBarBadge({
                            index: 2
                        });
                    }
                  
                }
            });
        }
    }
};
</script>
<style scoped>
.bg {
    text-align: center;
}
.bg > img {
    width: 730rpx;
    height: 730rpx;
    padding: 20rpx;
}
.name {
    font-weight: 700;
    font-size: 36rpx;
    text-align: center;
    margin-top: 10rpx;
    width: 100%;
    padding-bottom: 20rpx;
}
.hr {
    height: 4rpx;
    width: 100%;
    background: #efefef;
}
.details {
    margin-bottom: 30rpx;
    background-image: url("../../../static/image/xq.png");
    background-repeat: no-repeat;
    background-size: auto 4rpx;
    background-position: center;
    font-size: 26rpx;
    margin-top: 10rpx;
    text-align: center;
    color: #e0bd6a;
}
.pro {
    position: absolute;
    top: 110rpx;
    bottom: 0;
    left: 0;
    right: 0;
}
.detail {
    padding: 30rpx;
    font-size: 28rpx;
    line-height: 60rpx;
}
.pp {
    padding-left: 30rpx;
}
.axf {
    /* background-image: url("../../../static/image/danger.png");
    background-size: 100% 100%; */
    margin: auto;
    /* background: red; */
    /* background-repeat: no-repeat;
    background-position: center bottom; */
    width: 90%;
    height: 632rpx;
}
.axf > img {
    width: 100%;
    height: 100%;
}
footer {
    position: absolute;
    bottom: 0;
    height: 120rpx;

    background: #f9f9f9;
    font-size: 28rpx;
    width: 100%;
}
footer > div {
    float: left;
}
.Collection {
    width: 96rpx;
    height: 100%;

    text-align: center;
}
.Collection > div {
    width: 100%;
    height: 50%;
}
.coll {
    background-image: url("../../../static/image/sc.png");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 44% 60%;
}
.colls {
    background-image: url("../../../static/image/cs.png");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 44% 60%;
}
.add {
    height: 100%;
    line-height: 120rpx;
}
.add > span {
    margin-left: 15px;
    font-weight: 700;
}
.cart {
    height: 140rpx;
    width: 140rpx;
    border-radius: 50%;
    background: #ffd600;
    position: absolute;
    right: 20rpx;
    bottom: 20rpx;
    background-image: url("../../../static/image/cartt.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 90%;
}
.numes {
    position: absolute;
    display: inline-block;
    color: #fff;
    background: #f40;
    border-radius: 50%;
    right: 0;
    line-height: 36rpx;
    width: 36rpx;
    text-align: center;
}
</style>


