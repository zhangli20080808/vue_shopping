new Vue({
    el: "#app",
    data: {
        //使用resource来调用我们的方法
        totalMoney:0,
        productList:[]
    },
    //过滤器
    filters: {
        formatMoney:function (value) {
            return "$" +value.toFixed(2)
        }
    },
    //1.0我们使用ready  2我们使用mounted 实例化完成后默认查询某个方法
    mounted: function () {
        this.$nextTick(function() {
            this.cartView();
        })
    },
    methods: {
        //内部this变量指向
        cartView: function () {
            this.$http.get("data/cartData.json",{"id":123}).then(resp=> {
                this.productList = resp.body.result.list;
                this.totalMoney = resp.body.totalMoney;
            })
        },
        changeMoney:function (product,way) {
            if(way>0){
                product.productQuentity++;
            }else {
                product.productQuentity--;
                if (product.productQuentity<1){
                    product.productQuentity =1;
                }
            }
        }
    }
});

//全局的过滤器
Vue.filter('money',function (value,type) {
  return "$" +value.toFixed(2)+'元';
});


/*Vue-resource 插件和 Ajax 的返回数据有区别。
 Vue-resource 返回数据对json数据进行一次封装，将状态码封装进返回结果中。
 用result.body 获取结果json数据。*/