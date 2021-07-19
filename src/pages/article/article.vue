<template>
  <a-card>
    <div>
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
            <a-col :md="6" :sm="24" >
              <a-form-item
                label="文章标题"
                :labelCol="{span: 6}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-input @keyup.enter="getArticle"  v-model="form.title" placeholder="请输入文章标题" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24" >
              <a-form-item :labelCol="{span: 6}"
                :wrapperCol="{span: 16, offset: 1}" label="文章标签">
                <a-select @change="getArticle" placeholder="请输入文章标题"  v-model="form.tag">
                  <a-select-option value="vue">vue</a-select-option>
                  <a-select-option value="html">html</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-button type="primary" @click="getArticle">查询</a-button>
            <a-button style="margin-left:4px" @click="clear">重置</a-button>
            <span style="float: right; margin-top: 3px;">
              <a-button  type="primary" @click="$router.push('article/add')">新建</a-button>
            </span>
          </a-row>
        </div>
      </a-form>
    </div>
    <div>
      <a-space class="operator"></a-space>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        @change="change"
      >
        <div slot="action" slot-scope="{ record}">
          <router-link style="color:green" :to="`/list/query/detail/${record.key}`" >查看详情</router-link>
          <router-link :to="'/article/edit?id=' +record._id "  style="margin:0 8px"><a-icon type="edit" />编辑</router-link>
          <a @click="del(record._id)" style="color:red">
            <a-icon type="delete" @click="del" />删除
          </a>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import {articleColumns} from '@/pages/components/data'
import {getArticle,deleteArticle} from '@/api/article'
import {notify} from '@/pages/components/methods'

export default {
  name: 'QueryList',
  components: {StandardTable},
  data () {
    return {
      form:{
        title:'',
        tag:'',
        pageNo:1,
      },
      advanced: true,
      columns: articleColumns,
      dataSource:[],
      pagination:{
        current:1,
        pageSize:10,
        total:''
      }
    }
  },
  created(){
    this.getArticle()
  },
  methods: {
    //获取文章列表
    async getArticle(){
      const {data} = await getArticle(this.form)
      this.handleList(data)
    },
    //处理分页
    handleList(list){
      const {data,pageNo,total} = list
      data.forEach(it=>{it.key=it._id})
      this.pagination.current = pageNo
      this.pagination.total = total
      this.dataSource = data
    },
    //重置按钮
    clear(){
      this.form.title = ''
      this.form.tag = '',
      this.form.pageNo = 1
      this.pagination.current = 1
      this.pagination.total = ''
      this.getArticle()
    },
    //删除事件
    del(id){
      const _this = this
      this.$confirm({
        title: '警告',
        content: '数据删除后 不可恢复，请在此确认',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          await deleteArticle({id})
          _this.getArticle()
          _this.notify()
          // notify('success','删除成功')
        },
      });
    },
    change(pagination){
      const {current} = pagination
      this.form.pageNo = current
      this.pagination.current = current
      this.getArticle()
    },
    notify(){
      notify('success','删除成功')
    },
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
</style>
