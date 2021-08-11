<template>
    <page-layout >
      <template slot="action">
        <a-button type="primary" @click="goChange">修改个人资料</a-button>
      </template>
      <a-card :bordered="false">
        <div class="userInfo" v-html="userInfo"></div>
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
  },
}
</script>

<style lang="less" scoped>
.userInfo{
  /deep/h2{
    margin-top: 32px;
  }
}

</style>
