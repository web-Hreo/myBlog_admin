<template>
  <page-layout :title="` '${name}' 类目-学习资源编辑`">
    <template slot="action">
      <a-button type="primary" @click="visible=true">新建学习资源</a-button>
    </template>
    <a-card style="margin-top: 24px" :bordered="false">
      <a-list size="large" >
        <a-list-item :key="item._id" v-for="item in navigationList">
          <a-list-item-meta :description="item.desc">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.imgSrc"/>
            <a slot="title" target='_blank'>{{item.title}}</a>
          </a-list-item-meta>
          <p slot="actions" @click="updateLink(item)"><a>编辑</a></p>
          <p slot="actions" @click="del(item._id)"><a style="color:red">删除</a></p>
          <div class="list-content">
            <div class="list-content-item"><span>所属资源类目</span><p>{{item.navigationTag}}</p></div>
            <div class="list-content-item"><span>添加时间</span><p>{{item.createTime}}</p></div>
            <div class="list-content-item"><span>修改时间</span><p>{{item.changeTime}}</p></div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
          <!-- 新建模态框 -->
    <a-modal
      title="新增项目"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    > 
      <a-form-item
        label="资源头像"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18,offset: 1}"
      >
        <Upload :imageUrl="form.imgSrc" @upload="uploadImg"></Upload>
      </a-form-item>
      <a-form-item
        label="资源头像"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18, offset: 1}"
      >
        <a-input v-model="form.imgSrc"  placeholder="请输入资源头像" @keyup.enter="handleOk" />
      </a-form-item>
      <a-form-item
        label="资源名称"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18, offset: 1}"
      >
        <a-input v-model="form.title"  placeholder="请输入项目名称" @keyup.enter="handleOk" />
      </a-form-item>
      <a-form-item
        label="资源描述"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18, offset: 1}"
      >
        <a-input v-model="form.desc"  placeholder="请输入项目描述" @keyup.enter="handleOk" />
      </a-form-item>
      <a-form-item
        label="资源链接"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18, offset: 1}"
      >
        <a-input v-model="form.url"  placeholder="请输入项目链接" @keyup.enter="handleOk" />
      </a-form-item>
    </a-modal>
    </page-layout>

</template>

<script>
import PageLayout from '../../layouts/PageLayout'
import {ByTag,setByTag,deleteByTag,updateByTag} from '@/api/navigation'
import Upload from '@/pages/components/upload'
import {notify} from '../components/methods'

export default {
  name: 'QueryList',
  components: {PageLayout,Upload},
  data () {
    return {
      navigationList:[],
      form:{
        title:'',
        desc:'',
        imgSrc:'',
        url:'',
        navigationTag:''
      },
      name:'',
      visible:false,//新增学习资源模态框开关
      modalTagName:'',
      currentRow:{},//当前选中的数组
      isUpdate:false//当前是否处于修改状态中
    }
  },
  created(){
    this.name = this.$route.query.name
    this.form.navigationTag = this.$route.query.name
    console.log(this.name);
    this.getByTag()
  },
  methods: {
    async getByTag(){
      const {data} = await ByTag({navigationTag:this.name})
      this.navigationList = data
    },
    updateLink(row){
      const { _id,navigationTag,title,desc,imgSrc,url } = row
      this.form = {_id,navigationTag, title,desc,imgSrc,url }
      this.visible = true      
       console.log(row);
      console.log( this.form);
    },
    //确定编辑 / 确定新增
    async handleOk(){
      if(this.form._id){
        const {success} = await updateByTag(this.form)
        success && notify('success','学习资源编辑成功')
      }else{
        const {success} = await setByTag(this.form)
        success && notify('success','学习资源新增成功')
      }
      this.handleCancel()
      this.getByTag()
      
    },
    async edit(item){
      this.form = JSON.parse(JSON.stringify(item))
       this.visible = true
      // item.id = item._id
      // const data = await updateProject(item)
      // console.log(data);
    },
    del(_id){
      const _this = this
      this.$confirm({
        title: '警告',
        content: '数据删除后 不可恢复，请在此确认',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          await deleteByTag({_id})
          _this.getByTag()
          notify('success','删除成功')
        },
      });
    },
    handleCancel(){
      setTimeout(() => {
        this.form ={ desc:'', title:'', imgSrc:'', url:''}
      }, 200);
      this.visible = false
    },
    uploadImg(e){
      this.form.imgSrc = e
      console.log(e);
    }
  }
}
</script>

<style lang="less" scoped>

  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
  /deep/.ant-form-item{
    margin-top: -4px;
  }
    .list-content-item{
    color: @text-color-second;
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span{
      line-height: 20px;
    }
    p{
      margin: 4px 0 0;
      line-height: 22px;
      
    }
  }
</style>
