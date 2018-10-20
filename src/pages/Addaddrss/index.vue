<template>
    <div id="main">
        <gary text="选择地址" />
        <div>
            <div v-if="data.length>0">
                <ul>
                    <li class="list" v-for="(item,index) in data" :key="index">
                        <i class="active" v-if="ins===index"></i>
                        <div class="left" @click="changadd(index,item)">

                            <p>
                                <span>{{item.name}}</span>
                                <span>{{item.tel}}</span>
                            </p>
                            <p style="color:#999;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
                                {{item.addes}}
                            </p>
                        </div>
                        <div class="right" @click="patch(index,item.title)">

                        </div>

                    </li>
                </ul>
            </div>
            <div>
                <div class="Noproduct" v-if="data.length==0">
                    <div class="Noproduct-cotent">
                        <div class="bg"></div>
                        <span style="color:#999;font-size: 28rpx">您还没有地址哦~</span>
                        <br>
                       
                    </div>
                </div>
            </div>
            <footer>
                <div class="add" @click="add">+新增地址</div>
            </footer>
        </div>
    </div>
</template>
<script>
import gary from "@/components/gary";
export default {
    data() {
        return {
            ins: 0
        };
    },
    components: {
        gary
    },
    computed: {
        data() {
            return this.$store.state.Alladdress;
        }
    },
    onLoad() {},
    onShow() {
        console.log(this.$store.state.Alladdress)
    },
    methods: {
        changadd(index, item) {
            this.ins = index;
            this.globalData["add"] = item;
            wx.switchTab({
                url: "../user/main"
            });
        },
        patch(item,title) {
            const url = "../Patchadd/main?abc=" + item+'&&title='+title;
            console.log(item);

            wx.redirectTo({ url });
        },
        add() {
            wx.navigateTo({
                url: "../addAddress/main"
            });
        }
    }
};
</script>
<style scoped>
.list {
    width: 100%;
    background: #fff;
    position: relative;
    height: 132rpx;
    border-bottom: 1px solid #f1f1f1;
}
.left {
    float: left;
    font-size: 28rpx;
    width: 70%;
    line-height: 56rpx;
    padding-left: 20rpx;
    padding-top: 14rpx;
}
#main {
    background: #ccc;
}
.right {
    float: left;
    width: 194rpx;
    height: 124.8rpx;
    border-left: 1px solid #f1f1f1;
    background-image: url("../../../static/image/patch.png");
    background-size: 40px 41px;
    background-repeat: no-repeat;
    background-position: center center;
}
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    background: #fff;
}
.add {
    background: #ffd600;
    text-align: center;
    line-height: 90rpx;
    font-size: 32rpx;
    margin: 18rpx 20%;
    border-radius: 15rpx;
}
.active {
    border-color: #ffd600;
    width: 20rpx;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-left: 7rpx solid #ffd600;
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


