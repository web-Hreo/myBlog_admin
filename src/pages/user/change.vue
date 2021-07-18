<template>
  <page-layout >
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-button type="primary" @click="setDesc">确定修改</a-button>
      <a-button  @click="$router.go(-1)" style="margin-left: 32px">返回</a-button>
      <a-divider style="margin-bottom: 32px"/>
      <wangeditor :ditorHtml="ditorHtml" @onchange="onchange" />
    </a-card>
  </page-layout>
</template>

<script>
import wangeditor from '../components/wangeditor.vue'
import PageLayout from '../../layouts/PageLayout'
import {getDesc,setDesc} from '@/api/user'
import {notify} from '../components/methods'
export default {
  name: 'BasicForm',
  // i18n: require('./i18n'),
  components:{ wangeditor,PageLayout },
  data () {
    return {
      value: 1,
      ditorHtml:'',
      desc:''
    }
  },
    created(){
    this.getDesc()
  },
  methods:{
    async getDesc(){
      const {data} = await getDesc()
      this.ditorHtml = data
    },
    async setDesc(){
      await setDesc({desc:this.desc})
      notify('success','修改成功')
      this.$router.go(-1)
    },
    onchange(e){
      this.desc = e
    }
  },
  // computed: {
  //   desc() {
  //     return this.$t('pageDesc')
  //   }
  // }
}
</script>

<style scoped>

</style>
