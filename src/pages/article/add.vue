<template>
  <page-layout>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form>
      <a-form-item
        label="文章封面"
        :labelCol="{span: 2}"
        :wrapperCol="{span: 10}"
      >
      <Upload :imageUrl="form.viewImg" @upload="uploadImg"></Upload>
      </a-form-item>
      <a-form-item
        label="文章标题"
        :labelCol="{span: 2}"
        :wrapperCol="{span: 10}"
      >
        <a-input v-model="form.title" placeholder="请输入文章标题" />
      </a-form-item>
      <a-form-item :labelCol="{span: 2}"
        :wrapperCol="{span: 10}" label="文章标签">
        <a-select placeholder="请输入文章标签" v-model="form.tag" >
          <a-select-option v-for="item in tagList" :key="item._id" :value="item.name">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="初始浏览量"
        :labelCol="{span: 2}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input v-model="form.viewNum" placeholder="请输入文章标题" />
      </a-form-item>
      <Wangeditor :ditorHtml="form.cont" @onchange="onchange" />
      <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="submit">保存</a-button>
        <a-button style="margin-left: 8px" @click="$router.go(-1)">返回</a-button>
      </a-form-item>
    </a-form>
  </a-card>
  </page-layout>
</template>

<script>
import Wangeditor from '../components/wangeditor.vue'
import PageLayout from '../../layouts/PageLayout'
import Upload from '@/pages/components/upload'
import {getTags} from '@/api/tags'
import {addArticle,getArticleById,updateArticle} from '@/api/article'
import {notify} from '@/pages/components/methods'

export default {
  name: 'BasicForm',
  components:{ Wangeditor,PageLayout ,Upload},
  data () {
    return {
      value: 1,
      tagList:[],
      id:'',//若为编辑页 那么当前页应有id
      form:{
        viewImg:'',
        title:'',
        cont:'',
        tag:'',
        viewNum:''
      }
    }
  },
  created(){
    this.getTags()
    if(this.$route.path==='/article/edit'){
      this.id = this.$route.query.id
      this.getArticleById()
    }
  },
  methods:{
    //获取标签
    async getTags(){
      const {data} = await getTags()
      this.tagList = data
    },
    //上传图片
    uploadImg(e){
      this.form.viewImg = e
    },
    //富文本编辑器改变事件
    onchange(e){
      this.form.cont = e
    },
    //编辑页根据id获取文章详情
    async getArticleById(){
      const data = await getArticleById({id:this.id})
      this.form = data
    },
    //确定事件
    async submit(){
      this.id?this.updateArticle():this.addArticle()
      
    },
    //新增文章
    async addArticle(){
      const {success} = await addArticle(this.form)
      success?notify('success','新增成功'):notify('error','新增失败')
      success && this.$router.go(-1)
    },
    //编辑文章
    async updateArticle(){
      this.form.id = this.id
      const {success} = await updateArticle(this.form)
      success?notify('success','编辑成功'):notify('error','编辑失败')
      success && this.$router.go(-1)
    }
  },
  computed: {
    desc() {
      return this.$t('pageDesc')
    }
  }
}
</script>

<style scoped>

</style>
