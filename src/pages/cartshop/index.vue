<template>
    <div >
        <card text="同泰时代广场" />
        <div class="list">
           <scroll-view class="listleft" scroll-y="true">
                 <div class="listleft">
                <ul>

                    <li v-for="(item,index) in data" :key="index" @click="change(item,index)">
                         <img class="hot" :src="item.flag" alt="">
                        <i class="active" v-if="ins===index"></i>
                        {{item.name}}
                    </li>
                </ul>
            </div>
           </scroll-view>
            <div class="listright">
                <div class="tops">
                    <p style="border:none" @click="ALLs">
                        <span>{{allname}}</span>
                        <img :class="ALL==true?'activess':''" src="../../../static/image/down.png" alt="">
                    </p>

                    <p @click="sortsa">
                        <span>{{sortname}}</span>
                        <img :class="sort==true?'activess':'' " src="../../../static/image/down.png" alt="">
                    </p>
                </div>
                <div class="all" v-if="sort">
                    <div class="alls">
                        <span :class="index===inall?'activeALL':''" v-for="(item,index) in SORT" :key="item.id" @click="sorts(item,index)">{{item}}</span>
                    </div>
                </div>
                <transition name="mybox">
                    <div class="all" v-if="ALL">
                        <div class="alls">
                            <span :class="index===inall?'activeALL':''" v-for="(item,index) in data[ins].cids" :key="item.id" @click="alls(item.name,index,item)">{{item.name}}</span>
                        </div>
                    </div>
                </transition>
                <scroll-view scroll-y="true" class="product">
                    <ul>
                        <li class="productchild" v-for="(item,index) in productstype" :key="index" >
                            <div style="flex: 1;height:100%;float:left" >
                              
                                <img :src="item.app_mimg" alt="" @click="godelt(item)" :id="'home'+item.id">
                            </div>
                            <div style="height:100%;float:left;padding:0 20rpx;flex: 2">
                                <p>{{item.name}}</p>
                                <p></p>
                                <p style="color:#999">{{item.specifics}}</p>
                                <p style="color:red">￥{{item.price}} <span style="text-decoration: line-through;color:#999">￥{{item.market_price}}</span></p>
                                <div class="numm">

                                    <span class="num" v-if="item.pre_state>0" @click="reduceproduct(item)">-</span>
                                    <span class="nume" v-if="item.pre_state>0">{{item.pre_state}}</span>
                                    <span class="num" @click="addproduct(item)">+</span>

                                </div>
                            </div>
                        </li>
                    </ul>
                </scroll-view>
            </div>
        </div>
          <rich-text :nodes="nodes" v-if="show"></rich-text> 
    </div>
</template>
<script>
import card from "@/components/card";
import carts from '@/components/components'
export default {
    data() {
        return {
            data: [],
            show:true,
             nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: '',
       
      }
    }],
            clid: "0",

            card: [],
            num: 0,
            imgs:'',
            ins: 0,
            inall: 0,
            SORT: ["综合排序", "销售最高", "价格最低", "价格最高"],
            ALL: false,
            id: "104747",
            sort: false,
            allname: "全部分类",
            sortname: "综合排序",
            datas: []
        };
    },
    computed: {
        products() {
            var a = this.globalData.appOptions.data.products[this.id].concat();
            if (this.sortname === "综合排序") {
                return this.globalData.appOptions.data.products[this.id];
            } else if (this.sortname === "价格最低") {
                return a.sort((a, b) => a.price - b.price);
            } else {
                return a.sort((a, b) => b.price - a.price);
            }
        },
        productstype() {
            if (this.allname == "全部分类") {
                return this.products;
            } else {
                let m = this.products.filter(
                    item => item.child_cid === this.clid
                );
                return m;
            }
        }
    },
    components: {
        card
    },
    onLoad() {
        this.getDates();
            var a=[]
       
      // for(let i in this.globalData.appOptions.data.products){
      //       a.push(this.globalData.appOptions.data.products[i])
      //       this.datas=[].concat.apply([],a)
            
      // }
      // console.log(a,this.datas)

    },
    watch: {
        // datas: {
        //     handler: function(e) {
        //         var a = 0;
        //         for (let i of e) {
        //             a = a + Number(i._had_pm);
        //         }
        //         var b = a.toString();
        //         this.globalData.num = a;

        //         if (a) {
        //             wx.setTabBarBadge({
        //                 index: 2,
        //                 text: b
        //             });
        //         }else{
        //             wx.removeTabBarBadge({
        //                  index: 2
        //             })
        //         }
        //     },
        //     deep: true
        // }
    },
    methods: {
        //进入详情页
        godelt(item){
         var product=  JSON.stringify(item)
             const url = "../Details/main?product="+product;
            wx.navigateTo({ url });
        },
        getDates() {
            var that = this;
            that.data = that.globalData.appOptions.data.categories;
            // console.log(that.globalData.appOptions.data);

            // wx.request({
            //     url:
            //         "http://m.beequick.cn/data/getCategoryProduct?asid=5b9f0f2c7d6f27584&_r=0.4702665855431476&reflogid=5b9f121b2eb0e4728&location_hash=454b19ArcTLEAcW%2BuscyR19Rk045aPIMPH2grh24L0KvVibPxsGCy0DNHKNEX%2FXFvQgTJAtNd9Xxx4NA8d4QW%2FJZIheTirTOMjhwLDvQlBWxg&zchtid=3937&bigids=524%2C0",
            //     success: function(res) {
            //         that.data = res.data.data.categories;
            //         console.log(that.data);
            //     }
            // });
        },
        //侧边切换
        change(item, idnex) {
            this.ins = idnex;
            this.id = item.id;
            this.ALL = false;
            this.sort = false;
            this.inall = 0;
            this.allname = "全部分类";
            this.sortname = "综合排序";
             
        },
        //全部分类
        ALLs() {
            this.ALL = !this.ALL;
            if (this.ALL) {
                this.sort = false;
            }
            // console.log(this.ALL);
        },
        //排序
        sortsa() {
            this.sort = !this.sort;
            if (this.sort) {
                this.ALL = false;
            }
        },
        alls(name, index, items) {
            this.allname = name;
            this.inall = index;
            this.ALL = false;
            this.clid = items.id;
            // console.log(items.id)
        },
        sorts(item, index) {
            (this.sortname = item), (this.inall = index);
            this.sort = false;
        },
        //添加商品
        addproduct(item) {
           
          var that=this
          const query = wx.createSelectorQuery()
   query.select('#home'+item.id).boundingClientRect()
   query.selectViewport().scrollOffset()
   query.exec(function(res){
    console.log(res)
   var top=res[0].top-10;
    that.show=true
   var w=res[0].width;

   var left=res[0].left
 
   
that.show=true
       
    that.nodes[0].attrs.style=' background-image: url('+item.app_mimg+');background-size: 100% 100%;background-repeat: no-repeat;background-position: center;top:'+top+'px;left:'+left+'px;width:'+w+'px;height:'+w+'px;animation: sun 1s linear 0s infinite;'
     
     setTimeout(()=>{
        that.show=false
     },1000)
     
  res[0].top       // #the-id节点的上边界坐标
  res[1].scrollTop // 显示区域的竖直滚动位置
})
            carts.cart(this,item)
          
        },
        reduceproduct(item) {
            // console.log(6666)
             carts.del(this,item)
           
        }
    }
};
</script>
<style>
.list {
   position:relative;
position:absolute;
bottom:0;
left:0;
right:0;
top:110rpx;

}
.listleft {
    width: 180rpx;
    position:absolute;
bottom:0;
left:0;

top:0rpx;
}
.listleft > ul {
    width: 100%;
}
.listleft > ul > li {
    width: 100%;
    position: relative;
    height: 100rpx;
    font-size: 24rpx;
    line-height: 100rpx;
    color: #6d6d6d;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
}
.hot{
  width:64rpx;
height:53rpx;
position:absolute;
right:0;
top:0;

}
.div_class{
   position: absolute;
   color:green;
   bottom: 50rpx;
   height: 200rpx;
   width:200rpx;
   animation: run 1.5s linear 0s infinite 
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
.listright {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 180rpx;

}
.tops {
    border-bottom: 1px solid #e6e6e6;
    height: 100rpx;
}
.tops > p {
    position: relative;
    float: left;
    height: 100rpx;
    font-size: 28rpx;
    border-left: 1px solid #e6e6e6;
    text-align: center;
    line-height: 100rpx;
    width: 48%;
    color: #777;
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
.tops > p > img {
    position: absolute;
    width: 28rpx;
    height: 28rpx;
    top: 36%;
    transition: transform 0.3s linear;
}
.activess {
    transform: rotate(-180deg);
}
.all {
    position: absolute;
    top: 100rpx;
    z-index: 1000;
    width: 100%;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
}
.alls {
    width: 100%;
    background: #fff;
    border-top: 1px solid #e6e6e6;
}
.alls > span {
    display: inline-block;
    font-size: 26rpx;
    border: 1px solid #e0e0e0;
    padding: 8rpx 16rpx;
    margin: 16rpx;
    color: #777;

    border-radius: 10rpx;
}
.mybox-leave-active,
.mybox-enter-active {
    transition: all 1s ease;
}
.mybox-leave-active,
.mybox-enter {
    height: 0px !important;
}
.mybox-leave,
.mybox-enter-active {
    height: 500px;
}
.activeALL {
    background: #fff9d9;
    border: 1px solid #ffd900 !important;
}
.product {
    position: absolute;
    top: 102rpx;
    bottom: 0;
    left: 0rpx;
    right: 0;
    /* background: red; */
}
.product li {
    height: 235rpx;
    padding: 10rpx;
    font-size: 24rpx;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
    /* background: green; */
}
.product li img {
    width: 200rpx;
    height: 200rpx;
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
  @keyframes sun{
            0%{
                
                top:322rpx;
                left: 208rpx;
            },
            50%{
               
                top: 284rpx;
                left: 230rpx
            }
           
            100%{
             
                top: 520px;
                left: 250rpx;
            }

}
</style>

