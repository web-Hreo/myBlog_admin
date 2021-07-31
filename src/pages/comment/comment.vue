<template>
  <page-layout >
    <a-card style="margin-top: 24px" :bordered="false">
      <a-list size="large" :pagination="pagination">
        <a-list-item :key="item._id" v-for="item in commentList">
          <a-list-item-meta :description="item.leavingEmail">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.leavingAvatar"/>
            <a slot="title" :class="{'isMaster':item.isMaster}" target='_blank'>{{item.leavingName}}</a>
          </a-list-item-meta>
          <a-list-item-meta >
            <p style="color:#999" slot="title" >{{item.leavingCont}}</p>
          </a-list-item-meta>
          <p slot="actions" @click="delComment(item)"><a style="color:red">删除</a></p>
          <div class="list-content">
            <div class="list-content-item"><span>来源IP</span><p>{{item.fromIp}}</p></div>
            <div class="list-content-item"><span>留言来源</span><p>{{item.fromText}}</p></div>
            <div class="list-content-item"><span>添加时间</span><p>{{item.createTime}}</p></div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>

  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import {getCommentList,delComment} from '@/api/public'
import {notify} from '../components/methods'

export default {
  name: 'StandardList',
  components: {PageLayout},
  data() {
    return {
      visible:false,
      delShow:false,
      title:'',
      form:{
        pageNo:1,
        pageSize:10
      },
      commentList:[],//友链列表
      pagination:{
        // showSizeChanger: true,
        showQuickJumper: true,
        current:1,
        total: 50,
        onChange: page => {
          this.change(page);
        },
      },
      isUpdate:false,//当前是否处于编辑框
      fromList:{ comment:'留言板', article:'文章内页', links:'友链' }
    }
  },
  created(){
    this.getComment()
  },
  methods:{
    //获取评论
    async getComment(){
      const {data} = await getCommentList(this.form)
       this.handleData(data)
    },
    //更新数据
    handleData(list){ 
      console.log(list);
      list.data.forEach(it =>{
        if(this.fromList[it.from]){
          it.fromText = this.fromList[it.from]
        }else{
           it.fromText ='其他'
        }
      })
      this.commentList = list.data
      this.pagination.current = list.pageNo
      this.pagination.total = list.total
    },
    //删除标签
    async delComment(row){
      const _this = this
      this.$confirm({
        title: '警告',
        content: '数据删除后 不可恢复，请在此确认',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          await delComment({_id:row._id})
          _this.getComment()
          // _this.notify()
          notify('success','删除成功')
        },
      });

    },
    change(page){
      this.form.pageNo = page
      this.pagination.current = page
      this.getComment()
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
  .isMaster{
    color: yellowgreen;
    font-weight: bold;
  }
</style>
