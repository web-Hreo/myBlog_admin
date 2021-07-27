<template>
  <page-layout >
    <div slot="headerContent" style="display:flex;align-items: center;">
      <a-input v-model="title" placeholder="请输入友链名称回车搜索" @keyup.enter="iptGetLink" />
      <a-button style="margin-left:20px" @click="visible = true;form.title=''" type="primary">新建</a-button>
    </div>
    <template slot="extra">
      <head-info class="split-right" title="我的全部友链" :content="manageNum.total"/>
      <head-info class="split-right" title="亲友友链" :content="manageNum.friendNum"/>
      <head-info class="split-right" title="常客友链" :content="manageNum.guestNum"/>
      <head-info class="split-right" title="目前失联友链" :content="manageNum.closeNum"/>
    </template>
    <a-card style="margin-top: 24px" :bordered="false">
      <a-list size="large" :pagination="pagination">
        <a-list-item :key="item._id" v-for="item in linkList">
          <a-list-item-meta :description="item.desc">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title" target='_blank'>{{item.title}}</a>
          </a-list-item-meta>
          <p slot="actions" @click="updateLink(item)"><a>编辑</a></p>
          <p slot="actions" @click="deleteLink(item)"><a style="color:red">删除</a></p>
          <div class="list-content">
            <div class="list-content-item"><span>所属卡片</span><p :style="{'color':item.color}">{{item.type}}</p></div>
            <div class="list-content-item"><span>添加时间</span><p>{{item.createTime}}</p></div>
            <div class="list-content-item"><span>修改时间</span><p>{{item.changeTime}}</p></div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
       <!-- 新建模态框 -->
    <a-modal
      title="新增标签"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-item label="博客头像" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
        <Upload  :imageUrl="form.avatar" @upload="uploadImg"></Upload>
      </a-form-item>
      <a-form-item label="URL头像" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
        <a-input v-model="form.avatar" placeholder="请输入URL头像" @keyup.enter="handleOk" />
      </a-form-item>
      <a-form-item label="博客名称" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
        <a-input v-model="form.title" placeholder="请输入博客名称" @keyup.enter="handleOk" />
      </a-form-item>
      <a-form-item label="博客描述" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
        <a-input v-model="form.desc" placeholder="请输入博客描述" @keyup.enter="handleOk" />
      </a-form-item>
      <a-form-item label="所属卡片" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
        <a-select v-model="form.type" placeholder="请输入博客所属卡片" style="width:250px" >
          <a-select-option value="亲友">亲友</a-select-option>
          <a-select-option value="常客">常客</a-select-option>
          <a-select-option value="失联">失联</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item  label="博客链接" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
        <a-input v-model="form.url" placeholder="请输入博客链接" @keyup.enter="handleOk" />
      </a-form-item>
    </a-modal>

  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import Upload from '@/pages/components/upload'
import HeadInfo from '@/components/tool/HeadInfo'
import {getLink,setLink,updateLink,deleteLink} from '@/api/links'
import {notify} from '../components/methods'

export default {
  name: 'StandardList',
  components: {HeadInfo,PageLayout,Upload},
  data() {
    return {
      visible:false,
      delShow:false,
      form:{
        title:'',//博客名称
        desc:'',//博客描述
        type:'',//所属卡片
        avatar:'',//博客头像
        url:'',//博客链接
        pageNo:1,
        pageSize:10
      },
      manageNum:{//一些统计数据
        total:'',
        friendNum:'',
        guestNum:'',
        closeNum:''
      },
      linkList:[],//友链列表
      pagination:{
        // showSizeChanger: true,
        showQuickJumper: true,
        current:1,
        total: 50
      },
      isUpdate:false//当前是否处于编辑框
    }
  },
  created(){
    this.getLink()
  },
  methods:{
    //获取友链
    async getLink(){
      const {data} = await getLink(this.form)
      this.handleData(data)
    },
    //输入框回车事件
    async iptGetLink(){
      this.form.title = this.title
      const {data} = await getLink(this.form)
      this.handleData(data)
    },
    handleData(list){ 
      console.log(list);
      list.data.forEach(it =>{
        it.type==='亲友' && (it.color='yellowgreen')
        it.type==='失联' && (it.color='red')
      })
       this.linkList = list.data
       this.pagination.current = list.pageNo
       this.pagination.total = list.total
       this.manageNum.total = list.total
       this.manageNum.friendNum = list.friendNum
       this.manageNum.guestNum = list.guestNum
       this.manageNum.closeNum = list.closeNum
    },
    //  新增标签 -模态框 - 关闭事件
    handleCancel(){
      this.visible = false
      this.form = { title:'',desc:'', type:'',avatar:'', url:''}
    },
    //  新增标签 -模态框 - 确定事件
    async handleOk(){
      if(this.isUpdate){
        await updateLink(this.form)
        notify('success','编辑成功')
      }else{
        await setLink(this.form)
        notify('success','新增成功')
      }
      this.handleCancel()
      this.getLink()
      this.isUpdate = false//取消编辑状态
    },
    //打开 修改模态框
    updateLink(row){
      this.isUpdate = true
      this.visible = true
      this.form = JSON.parse(JSON.stringify(row))
      console.log(row);
    },
    //删除标签
    async deleteLink(row){
      const _this = this
      this.$confirm({
        title: '警告',
        content: '数据删除后 不可恢复，请在此确认',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          await deleteLink({_id:row._id})
          _this.getLink()
          // _this.notify()
          notify('success','删除成功')
        },
      });

    },
    uploadImg(e){
      this.form.avatar = e
    }
  }
}
</script>

<style lang="less" scoped>
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
