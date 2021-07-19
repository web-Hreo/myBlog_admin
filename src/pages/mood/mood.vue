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
              <a-button @click="visible = true" type="primary">新建</a-button>
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
          <a style="margin:0 8px" @click="updateTag(record)">
            <a-icon type="edit"/>编辑
          </a>
          <a @click="deleteTag(record)" style="color:red">
            <a-icon type="delete" />删除
          </a>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>

    <!-- 新建模态框 -->
    <a-modal
      title="新增标签"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <Wangeditor :ditorHtml="cont" @onchange="onchange" />
    </a-modal>

    <a-modal
      title="删除提示"
      :visible="delShow"
      @ok="delHandleOk"
      @cancel="delShow=false"
    >
      <p>删除不可恢复,请您再次确认是否删除</p>
    </a-modal>
  </a-card>
</template>

<script>
import Wangeditor from '../components/wangeditor.vue'
import StandardTable from '@/components/table/StandardTable'
import {moodColumns} from '../components/data'
import {getTags,setTag,updateTag,deleteTag} from '@/api/mood'
import {notify} from '../components/methods'

export default {
  name: 'QueryList',
  components: {StandardTable,Wangeditor},
  data () {
    return {
      advanced: true,
      columns: moodColumns,
      dataSource:[ ],
      delShow:false,
      visible:false,//新增标签模态框开关
      cont:'',
      currentRow:{},//当前选中的数组
      isUpdate:false//当前是否处于修改状态中
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  created(){
    this.getTags()
  },
  methods: {
    async getTags(){
      const {data} = await getTags()
      this.dataSource = data
    },
    //  新增标签 -模态框 - 关闭事件
    handleCancel(){
      this.visible = false
      this.cont = ''
    },
    //  新增标签 -模态框 - 确定事件
    async handleOk(){
      if( this.isUpdate){
        const {_id} = this.currentRow
        await updateTag({_id,cont:this.cont})
        notify('success','编辑成功')
      }else{
        await setTag({cont:this.cont})
        notify('success','新增成功')
      }
      this.getTags()
      this.handleCancel()
      this.isUpdate = false//取消编辑状态
    },
    //打开 修改模态框
    updateTag(row){
      this.isUpdate = true
      this.visible = true
      this.currentRow = row
      this.cont = row.cont
      console.log(row);
    },
    //开打删除模态框
    deleteTag(row){
      this.delShow = true
      this.currentRow = row
    },
    //删除标签
    async delHandleOk(){
      await deleteTag({_id:this.currentRow._id})
      this.delShow = false
      this.getTags()
      notify('success','删除成功')
    },
    onchange(e){
      this.cont = e
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
