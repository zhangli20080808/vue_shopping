new Vue({
    el: "#app",
    data: {
        //使用resource来调用我们的方法
        totalMoney:0,
        productList:[],
        selectAll:false,
        delFlag:false,
        currentProduct:''
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
                // this.totalMoney = resp.body.result.totalMoney;
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
            this.calcTotalPrice();
        },
        selectProduct:function (item) {
        //    我们这里没有checked 这个字段 所以我们要使用set 去设置
            if(typeof item.checked == 'undefined'){
                Vue.set(item,'checked',true);
                // this.$set(item,'checked',true)
            }else {
                item.checked =!item.checked
            }
            this.calcTotalPrice();
        },
        checkAll:function (flag) {
            this.selectAll= flag;
            var _this = this;
            this.productList.forEach(function (item,index) {
                if(typeof item.checked == 'undefined'){
                    Vue.set(item,'checked', _this.selectAll);
                    // this.$set(item,'checked',true)
                }else {
                    item.checked =_this.selectAll;
                }
            })
        },
        calcTotalPrice:function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    _this.totalMoney += item.productPrice*item.productQuentity;
                }
            })
        },
        delForm:function (item) {
            this.delFlag = true;
            this.currentProduct = item;
        },
        delProduct:function () {
           var index =  this.productList.indexOf(this.currentProduct);
           this.productList.splice(index,1)
            this.delFlag = false;
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