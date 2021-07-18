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
        tag:''
      },
      advanced: true,
      columns: articleColumns,
      dataSource:[
        { id:1,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:2,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:3,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:4,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:5,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:6,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:7,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
      ],
    }
  },
  created(){
    this.getArticle()
  },
  methods: {
    //获取文章列表
    async getArticle(){
      const {data} = await getArticle(this.form)
      data.forEach(it=>{it.key=it._id})
      console.log(data);
      this.dataSource = data
    },
    clear(){
      this.form.title = ''
      this.form.tag = ''
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
