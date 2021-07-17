<template>
    <page-layout >
      <a-card :bordered="false">
        <a-button type="primary" @click="goChange">修改个人资料</a-button>
      <router-view></router-view>

        <a-divider style="margin-bottom: 32px"/>
        <detail-list :title="item.title" v-for="item in userInfo" :key="item.id">
          <div v-html="item.cont"></div>
        </detail-list>
        <a-divider style="margin-bottom: 32px"/>
        <detail-list title="关于技术栈">
          <div>
            <p>html(5) css(3) es6+</p>
            <p>BackBone JQuery</p>
            <p>Vue全家桶 Vue + Vue-Router + Axios</p>
            <p>REACT全家桶 React + React-Dom + React-Router + Axios + Redux/Mobx</p>
            <p>小程序及框架 taro uniapp 原生小程序</p>
            <p>混合开发 uniapp React-Native</p>
            <p>服务端 Node + MySql</p>
            <p>版本管理：Git Svn</p>
            <p>调试：chrome控制台 firebug</p>
            </div>
        </detail-list>
        <a-divider style="margin-bottom: 32px"/>
      </a-card>
    </page-layout>
</template>

<script>
import DetailList from '../../components/tool/DetailList'
import PageLayout from '../../layouts/PageLayout'

export default {
  name: 'BasicDetail',
  components: {PageLayout, DetailList},
  data () {
    return {
      userInfo:[
        { 
          id:1,
          title:'关于我',
          cont:'<p>目前坐标-厦门</p><p>97年狮子座 爱学习爱写DEMO爱旅游爱追剧看电影吃火锅</p><p>喜欢厦门喜欢大海，林荫小道，也向往细腻温柔的故事</p>'
        },
      ]
    }
  },
  methods:{
    goChange(){
      this.$router.push('/user/change')
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    color: @title-color;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>
