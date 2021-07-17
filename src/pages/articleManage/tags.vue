<template>
  <a-card>
    <div>
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="标签名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入标签名称" />
              </a-form-item>
            </a-col>
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left:4px">重置</a-button>
            <span style="float: right; margin-top: 3px;">
              <a-button @click="addNew" type="primary">新建</a-button>
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
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="action" slot-scope="{ record}">
          <router-link style="color:green" :to="`/list/query/detail/${record.key}`" >查看详情</router-link>
          <a style="margin:0 8px">
            <a-icon type="edit"/>编辑
          </a>
          <a @click="deleteRecord(record.key)" style="color:red">
            <a-icon type="delete" />删除
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
import {tagColumns} from '../components/data'

export default {
  name: 'QueryList',
  components: {StandardTable},
  data () {
    return {
      advanced: true,
      columns: tagColumns,
      dataSource:[
        { id:1,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:2,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:3,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:4,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:5,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:6,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
        { id:7,title:'测试文章',tag:'vue',createTime:'2021-07-17',updateTime:'2021-07-17',viewNum:2392 },
      ]
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  methods: {
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },
    onClear() {
      this.$message.info('您清空了勾选的所有行')
    },
    onStatusTitleClick() {
      this.$message.info('你点击了状态栏表头')
    },
    onChange() {
      this.$message.info('表格状态改变了')
    },
    onSelectChange() {
      this.$message.info('选中行改变了')
    },
    addNew () {
      this.dataSource.unshift({
        key: this.dataSource.length,
        no: 'NO ' + this.dataSource.length,
        description: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2018-07-26'
      })
    },
    handleMenuClick (e) {
      if (e.key === 'delete') {
        this.remove()
      }
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
</style>
