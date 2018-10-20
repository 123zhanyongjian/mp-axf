<template>
    <div>
        <div class="serach">

            <img class="imgs" src="../../../static/image/serach1.png" alt="">
            <input type="text" placeholder="请输入地址" v-model="address">
        </div>

        <scroll-view class="list" scroll-y="true" v-if="data.length>0">
            <ul>
                <li v-for="(item,index) in data" :key="index" @click="back(item)">
                    <p class="addname">{{item.name}}</p>

                </li>

            </ul>
        </scroll-view>

        <map v-if="data.length==0" id="map" :longitude="city.longitude" :latitude="city.latitude" scale="15" :markers="markers"></map>

        <scroll-view class="zhoubian" scroll-y="true">
            <ul>
                <img src="../../../static/image/map.png" alt="">
                <li v-for="(item,index) in round" :key="index" @click="back(item)">
                    <p class="addname">{{item.title}}</p>
                    <p class="adddell">{{item.address}}</p>

                </li>

            </ul>
        </scroll-view>
    </div>
</template>
<script>
import baidumap from "../../../static/js/bmap-wx.min.js";
export default {
    data() {
        return {
            data: [],
            round: [],
            address: "",
            city: {
                name: "深圳市",
                x: 114.03,
                y: 22.52
            },
            markers: [
                {
                    iconPath: "../../../static/image/map.png",
                    id: 0,
                    latitude: 22.52,
                    longitude: 114.03,
                    width: 20,
                    height: 30
                }
            ]
        };
    },
    watch: {
        address(e) {
            var that = this;
            this.data = [];
            var BMap = new baidumap.BMapWX({
                ak: "NyLYzmZ8iG56ww79FxVFUIQhdQVMm89D"
            });
          if(e!==''){
                BMap.suggestion({
                query: e,
                region: that.city.name,
                city_limit: true,
                fail: function(err) {
                    console.log(err);
                },
                success: function(res) {
                    that.data = res.result;
                    for (let i of that.data) {
                        i["title"] = i.name;
                        i["latitude"] = i.location.lat;
                        i["longitude"] = i.location.lng;
                       
                    }
                }
            });
          }
        }
    },
    onLoad(e) {
        console.log(JSON.parse(e.city));
        this.data = [];
        this.address=''
        var that = this;
        if (JSON.stringify(e) !== "{}") {
            this.city = JSON.parse(e.city);
            this.markers[0].latitude = this.city.latitude;
            this.markers[0].longitude = this.city.longitude;
            console.log(this.markers);
        }
        //进入页面获取周边信息
        var BMap = new baidumap.BMapWX({
            ak: "NyLYzmZ8iG56ww79FxVFUIQhdQVMm89D"
        });
        var dw =
            this.city.latitude.toString() +
            "," +
            this.city.longitude.toString();

        console.log(dw);
        BMap.search({
            location: dw,
            success: function(res) {
                that.round = res.wxMarkerData;
                console.log(res);
            }
        });
    },
    methods: {
        back(item) {
          this.$store.commit('MAP',item)
wx.navigateBack({
        delta: 1
      })
        }
    }
};
</script>

<style lang="less" scoped>
#map {
    width: 100%;
    height: 400rpx;
}
.serach {
    font-size: 26rpx;
    width: 80%;
    margin: auto;
    height: 70rpx;
    position: relative;
    .imgs {
        width: 44rpx;
        height: 44rpx;
        position: absolute;
        left: 6rpx;
        top: 8rpx;
    }
    .back {
        width: 90rpx;
        text-align: left;
        height: 44rpx;
        transform: rotate(-180deg);
        position: absolute;
        left: -120rpx;
        top: 6rpx;
    }
    input {
        border: 1px solid #f1f1f1;

        padding-left: 50rpx;
    }
}
.zhoubian {
    position: absolute;
    bottom: 0;
    top: 470rpx;
    ul {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: scroll;
    }
    img {
        position: absolute;
        width: 33rpx;
        height: 44rpx;
        left: 18rpx;
        top: 40rpx;
    }
    li {
        width: 80%;
        margin: auto;
        line-height: 60rpx;
        // height: 60rpx;
        padding: 20rpx 40rpx 0 40rpx;
    }
}
.list {
    position: absolute;
    top: 70rpx;
    background: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    li {
        width: 80%;
        margin: auto;
        height: 60rpx;
        padding: 20rpx 40rpx;
        border-bottom: 1px solid #f1f1f1;
    }
}
.addname {
    font-size: 32rpx;
}
.adddell {
    font-size: 28rpx;
    color: #999;
    border-bottom: 1px solid #f1f1f1;
}
</style>


