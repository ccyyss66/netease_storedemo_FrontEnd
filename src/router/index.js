
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import HomePage from '../pages/HomePage'
import Public from '../pages/Public'
// import ProductList from '../pages/ProductList'

import ProductDetail from '../pages/ProductDetail'
import OrderList from '../pages/OrderList'
import CartList from '../pages/CartList'
import PublicEdit from '../pages/PublicEdit'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {// 主页
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {// 登录页面
      path: '/login',
      name: 'Login',
      component: Login
    },
    {// 发布
      path: '/public',
      name: 'Public',
      component: Public
    },
    // {//商品展示页
    //   path: '/productlist',
    //   name: 'ProductList',
    //   component: ProductList
    // },
    {//商品详情页
      path: '/productdetail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {//订单详情页
      path: '/orderlist',
      name: 'OrderList',
      component: OrderList
    },
    {//购物车详情页
      path: '/cartlist',
      name: 'CartList',
      component: CartList
    } ,
    {//编辑
      path: '/publicedit',
      name: 'PublicEdit',
      component: PublicEdit
    }        
  ]
})
