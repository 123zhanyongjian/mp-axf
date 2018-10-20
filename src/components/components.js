function cart(that, item) {
  var cart = that.globalData.cart;
  
  var flag,
    index,
    b = 0,
    total = 0;
  //判断购物车是否有东西没有就添加
  if (cart.length == 0) {
    item.pre_state = 1;
    item['check']=true

    cart.push(item);
  } else {
    //循环购物车，发现有返回true,没有返回false并跳出循环
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id == item.id) {
        index = i;
        flag = true;
        break;
      } else {
        flag = false;
      }
    }
    //如果为true，有商品改数量，否则添加
    if (flag) {
      cart[index].pre_state = Number(cart[i].pre_state) + 1;
      item.pre_state = cart[index].pre_state;
    } else {
      item.pre_state = 1;
       item['check']=true
      cart.push(item);
    }
  }
  for (let i of cart) {
    total += i.pre_state * i.price;
  }
  that.globalData["total"] = total;
  for (let i of cart) {
    b = b + Number(i.pre_state);
  }
  var C = b.toString();
  console.log(C);
  wx.setTabBarBadge({
    index: 2,
    text: C
  });
  that.num=C
  that.globalData['num']=C
}
function del(that, item) {
  var cart = that.globalData.cart;
  var flag,
    index,
    b = 0,
    total = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == item.id) {
      index = i;
      flag = true;
      break;
    } else {
      flag = false;
    }
  }
  if (flag) {
    if (cart[index].pre_state > 1) {
      cart[index].pre_state -= 1;
      item.pre_state = cart[index].pre_state;

      console.log(cart[index].pre_state);
    } else {
      wx.showModal({
        title: "提示",
        content: "确定移除该商品？",
        success: function(res) {
          if (res.confirm) {
            cart.splice(index, 1);
            that.total=0;
            for (let i of cart){
               
            	that.total+=i.pre_state * i.price;
            }
            var c = (b - 1).toString();
            wx.setTabBarBadge({
              index: 2,
              text: c
            });
            that.globalData['num']=c
            that.num=c
            
            item.pre_state = 0;

            if (cart.length == 0) {
              that.globalData["total"] = 0;
              wx.removeTabBarBadge({
                index: 2
              });
              that.total = 0;
              console.log("用户点击确定", "进来没");
            }
            console.log("用户点击确定", cart.length);
          } else {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
  for (let i of cart) {
    total += i.pre_state * i.price;
    b = b + Number(i.pre_state);
  }
  var c = b.toString();
  wx.setTabBarBadge({
    index: 2,
    text: c
  });

  that.globalData["total"] = total;
  that.globalData['num']=c
  that.num=c
  // console.log(index, that.globalData.total);
};
//改变选中状态
function change(that,item){
	 var cart = that.globalData.cart;
	 var total=0;

	item.check=!item.check;
	for(let i of cart){
		if(i.check){
			total+=i.pre_state * i.price;
		}
	};
	that.globalData["total"] = total;
};
function num(that){
  that.num=that.globalData.num;

}

export default {
  cart,
  del,
  change,
  num
};
