<template>
    <page-layout >
      <a-card :bordered="false">
        <a-button type="primary" @click="goChange">修改个人资料</a-button>
        <div class="userInfo" v-html="userInfo"></div>
        <!-- <a-divider style="margin-bottom: 32px"/>
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
        <a-divider style="margin-bottom: 32px"/> -->
      </a-card>
    </page-layout>
</template>

<script>
import PageLayout from '../../layouts/PageLayout'
import {getDesc} from '@/api/user'

export default {
  name: 'BasicDetail',
  components: {PageLayout, },
  data () {
    return {
      userInfo:''
    }
  },
  created(){
    this.getDesc()
  },
  methods:{
    async getDesc(){
      const {data} = await getDesc()
      console.log(data);
      this.userInfo = data
    },
    goChange(){
      this.$router.push('/user/change')
    }
  }
}
</script>

<style lang="less" scoped>
.userInfo{
  /deep/h2{
    margin-top: 32px;
  }
}

</style>
