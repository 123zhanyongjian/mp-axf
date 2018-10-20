<template>
	<div>
		<div class="header">
			<div class="info">

			</div>
			<div class="info1">
				<p>{{name}}</p>
				<p class="dj" style="color:#e64f1a">V0</p>
			</div>
			<div class="jt"></div>
		</div>
		<div class="list">
			<p>
				<span class="shop" @click="love">商品收藏</span>
			</p>
			<p style="border-left: 1px solid #fff;">
				<span class="itemm">店铺收藏</span>
			</p>
		</div>
		<div class="mydd">
			<span>我的订单</span>
			<span class="qbdd" style="float:right">查看全部订单</span>
			<div></div>
		</div>
		<ul class="fuku">
			<li>
				<p class="pay"></p>
				<span>待付款</span>
			</li>
			<li>
				<p class="sh"></p>
				<span>待收货</span>
			</li>
			<li>
				<p class="pj"></p>
				<span>待评价</span>
			</li>
			<li>
				<p class="back"></p>
				<span>退款/售后</span>
			</li>
		</ul>
		<div class="xt"></div>
		<ul class="fuku noborder">
			<li>
				<p class="jifen"></p>
				<span>积分商城</span>
			</li>
			<li>
				<p class="juan"></p>
				<span>优惠券</span>
			</li>
			<li>
				<p class="address"></p>
				<span>收货地址</span>
			</li>
			<li>
				<p class="kf"></p>
				<span>客服/反馈</span>
			</li>

		</ul>
		<ul class="fuku1">
			<li>
				<p class="us"></p>
				<span>关于我们</span>
			</li>

		</ul>
		<div class="xt"></div>
		<div class="btn" @click="ad">
			退出当前账号
		</div>
		<div class="xt"></div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            name: "18211557064"
        };
    },
    methods: {
        ad() {
            // wx.scanCode({
            //     success: res => {
            //         console.log(res);
            //     }
            // });
		},
		love(){
			 const url = "../love/main";
            wx.navigateTo({ url });
		}
    }
};
</script>
<style scoped>
.header {
    background: #ffd600;
    height: 200rpx;
    width: 94.666%;
    font-weight: 700;
    color: #fff;
    display: flex;
    padding-top: 40rpx;
    padding-left: 40rpx;
}
.info {
    background-image: url("../../../static/image/info.png");
    height: 130rpx;
    padding: 20rpx;
    flex: 7;
    width: 130rpx;

    background-size: 100% 100%;
}
.info1 {
    flex: 32;
    padding-left: 20rpx;
}
.dj {
    line-height: 56rpx;
    margin-top: 14rpx;
    background-image: url("../../../static/image/user_level.png");
    background-repeat: no-repeat;
    background-size: auto 100%;
    padding-left: 58rpx;
    font-size: 24rpx;
    font-weight: 700;
}
.jt {
    width: 22rpx;
    position: absolute;
    right: 100rpx;
    top: 80rpx;
    height: 38rpx;
    background-image: url("../../../static/image/miright.png");
    background-size: 100% 100%;
}
.list {
    height: 82rpx;
    width: 100%;
    display: flex;
    background: #f3c800;
}
.list > p {
    display: inline-block;
    flex: 1;
    text-align: center;
    line-height: 82rpx;
    font-size: 26rpx;
    color: #fff;
}
.noborder > li {
    border: none !important;
}
.shop {
    background-image: url("../../../static/image/blockbag.png");
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: left center;

    padding-left: 60rpx;
}
.itemm {
    background-image: url("../../../static/image/shop.png");
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: left center;
    padding-left: 60rpx;
}
.mydd {
    width: (100%-30rpx);
    height: 50rpx;
    padding-left: 30rpx;
    line-height: 50rpx;

    padding-top: 28rpx;
    padding-bottom: 28rpx;
    font-size: 28rpx;
    border-bottom: 1px solid #e0e0e0;
}
.qbdd {
    padding-right: 55rpx;
    color: #999;
    background-image: url("../../../static/image/right.png");
    background-position: 128% 50%;
    background-repeat: no-repeat;
}
.fuku {
    width: 100%;
    display: flex;
    height: 168rpx;
}
.fuku1 {
    width: 100%;
    height: 168rpx;
}
.fuku1 > li {
    width: 25%;
    /*border-bottom: 1px solid #e0e0e0;*/
    font-size: 26rpx;
}
.fuku1 > li > p {
    height: 96rpx;
    width: 100%;
    background-size: auto 50%;
    background-repeat: no-repeat;
    background-position: center 100%;
}
.fuku1 > li > span {
    display: block;
    text-align: center;
    margin-top: 20rpx;
}
.fuku > li {
    flex: 1;
    float: left;
    border-bottom: 1px solid #e0e0e0;
    font-size: 26rpx;
}
.fuku > li > p {
    height: 96rpx;
    width: 100%;
    background-size: auto 50%;
    background-repeat: no-repeat;
    background-position: center 100%;
}
.fuku > li > span {
    display: block;
    text-align: center;
    margin-top: 20rpx;
}
.pay {
    background-image: url("../../../static/image/book.png");
}
.sh {
    background-image: url("../../../static/image/bigcart.png");
}
.pj {
    background-image: url("../../../static/image/pen.png");
}
.back {
    background-image: url("../../../static/image/list.png");
}
.jifen {
    background-image: url("../../../static/image/redbag.png");
}
.juan {
    background-image: url("../../../static/image/money.png");
}
.address {
    background-image: url("../../../static/image/address.png");
}
.kf {
    background-image: url("../../../static/image/music.png");
}
.us {
    background-image: url("../../../static/image/danger.png");
}

.btn {
    width: 100%;
    height: 108rpx;
    line-height: 108rpx;
    font-size: 30rpx;
    text-align: center;
}
</style>

