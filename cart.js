var vm = new Vue({
    el: "#app",
    data: {
        //使用resource来调用我们的方法
        totalMoney:0,
        productList:[]
    },
    //过滤器
    filter: {},
    //1.0我们使用ready  2我们使用mounted 实例化完成后默认查询某个方法
    mounted: function () {
        this.$nextTick(function() {
            this.cartView();
        })
    },
    methods: {
        //内部this变量指向
        cartView: function () {
            var _this  = this;
            this.$http.get("data/cartData.json",{"id":123}).then(function (resp) {
                _this.productList = resp.body.result.list;
                _this.totalMoney = resp.body.totalMoney;

            })
        }
    }
});
/*Vue-resource 插件和 Ajax 的返回数据有区别。
 Vue-resource 返回数据对json数据进行一次封装，将状态码封装进返回结果中。
 用result.body 获取结果json数据。*/