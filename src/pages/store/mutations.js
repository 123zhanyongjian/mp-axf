export default {
    //添加地址
    ADDADDRESS(state,data){
       state.Alladdress.push(data);
       console.log(state.Alladdress)
    },
    //地图信息
    MAP(state,data){
    	state.map=data;
    	console.log(data)

    },
    // 修改信息
    PATCHADDRESS(state,data){
        state.Alladdress[data.index]=data
    },
    // 删除地址
    DELADDRESS(state,data){
        state.Alladdress.splice(data,1);
    }


}