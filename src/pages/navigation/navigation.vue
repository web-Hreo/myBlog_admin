<template>
  <a-card>
    <div>
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="资源名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入学习资源名称" />
              </a-form-item>
            </a-col>
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left:4px">重置</a-button>
            <span style="float: right; margin-top: 3px;">
              <a-button @click="visible = true" type="primary">新建类目</a-button>
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
          <a style="margin:0 8px" @click="goNavigationDetail(record)">
            <a-icon />编辑资源详情
          </a>
          <a style="margin:0 8px" @click="updateTag(record)">
            <a-icon type="edit"/>修改资源名称
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
      title="新增学习资源"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-item
        label="资源名称"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18, offset: 1}"
      >
        <a-input v-model="modalTagName" placeholder="请输入学习资源名称" @keyup.enter="handleOk" />
      </a-form-item>
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
import StandardTable from '@/components/table/StandardTable'
import {tagColumns} from '../components/data'
import {getTag,addTag,updateTag,deleteTag} from '@/api/navigation'
import {notify} from '../components/methods'

export default {
  name: 'QueryList',
  components: {StandardTable},
  data () {
    return {
      advanced: true,
      columns: tagColumns,
      dataSource:[ ],
      delShow:false,
      visible:false,//新增学习资源模态框开关
      modalTagName:'',
      currentRow:{},//当前选中的数组
      isUpdate:false//当前是否处于修改状态中
    }
  },
  created(){
    this.getTag()
  },
  methods: {
    async getTag(){
      const {data} = await getTag()
      this.dataSource = data
    },
    //  新增学习资源 -模态框 - 关闭事件
    handleCancel(){
      this.visible = false
      this.modalTagName = ''
    },
    //  新增学习资源 -模态框 - 确定事件
    async handleOk(){
      if( this.isUpdate){
        const {_id} = this.currentRow
        await updateTag({_id,name:this.modalTagName})
        notify('success','编辑成功')
      }else{
        await addTag({name:this.modalTagName})
        notify('success','新增成功')
      }
      this.getTag()
      this.handleCancel()
      this.isUpdate = false//取消编辑状态
    },
    //打开 修改模态框
    updateTag(row){
      this.isUpdate = true
      this.visible = true
      this.currentRow = row
      this.modalTagName = row.name
      console.log(row);
    },
    //开打删除模态框
    deleteTag(row){
      this.delShow = true
      this.currentRow = row
    },
    //删除学习资源
    async delHandleOk(){
      await deleteTag({_id:this.currentRow._id})
      this.delShow = false
      this.getTag()
      notify('success','删除成功')
    },
    goNavigationDetail(row){
      console.log(row);
      this.$router.push('/navigation/details?name='+row.name)
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
