<template>
  <page-layout >
    <div class="card-list">
      <a-list
        :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
        :dataSource="dataSource"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <template v-if="item.add">
            <a-button class="new-btn" type="dashed" @click="visible=true">
              <a-icon type="plus"  />新增项目
            </a-button>
          </template>
          <template v-else>
            <a-card :hoverable="true">
              <a-card-meta >
                <div style="margin-bottom: 3px" slot="title">{{item.name}}</div>
                <a-avatar class="card-avatar" slot="avatar" :src="item.imgSrc" size="large" />
                <div class="meta-content" slot="description">{{item.title}}</div>
              </a-card-meta>
              <a slot="actions" style="color:green">查看项目</a>
              <a slot="actions" style="color:#1890ff" @click="edit(item)">编辑</a>
              <a slot="actions" style="color:red" @click="del(item._id)">删除</a>
            </a-card>
          </template>
        </a-list-item>
      </a-list>
    </div>
       <!-- 新建模态框 -->
    <a-modal
      title="新增项目"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    > 
      <a-form-item
        label="项目头像"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18,offset: 1}"
      >
        <Upload :imageUrl="form.imgSrc" @upload="uploadImg"></Upload>
      </a-form-item>
      <a-form-item
        label="项目名称"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18, offset: 1}"
      >
        <a-input v-model="form.name"  placeholder="请输入项目名称" @keyup.enter="handleOk" />
      </a-form-item>
      <a-form-item
        label="项目描述"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18, offset: 1}"
      >
        <a-input v-model="form.title"  placeholder="请输入项目描述" @keyup.enter="handleOk" />
      </a-form-item>
      <a-form-item
        label="项目链接"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18, offset: 1}"
      >
        <a-input v-model="form.href"  placeholder="请输入项目链接" @keyup.enter="handleOk" />
      </a-form-item>
    </a-modal>
  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import Upload from '@/pages/components/upload'
import {getProject,addProject,updateProject,deleteProject} from '@/api/project'
import {notify} from '@/pages/components/methods'

export default {
  name: 'CardList',
  components:{ PageLayout,Upload },
  data () {
    return {
      visible:false,
      form:{
        name:'',
        title:'',
        imgSrc:'',
        href:''
      },
      // dataSource,
      dataSource:[
        { add: true},
        // { id:1,name:'智工建-企业端',title:'智工建专业从事开发智慧工地云平台,采用物联网、人工智能',imgSrc:'https://company.libawall.com/2021_7_13_1812/assets/logo.4d25621e.svg',href:'https://company.libawall.com' },
        // { id:2,name:'智工建-项目端',title:'智工建专业从事开发智慧工地云平台,采用物联网、人工智能',imgSrc:'https://company.libawall.com/2021_7_13_1812/assets/logo.4d25621e.svg',href:'https://project.libawall.com' },
        // { id:3,name:'智工建工人端',title:'此端口为微信小程序 微信搜索打开',imgSrc:'https://company.libawall.com/2021_7_13_1812/assets/logo.4d25621e.svg',href:'#' },
        // { id:4,name:'智工建-官网',title:'智工建专业从事开发智慧工地云平台,采用物联网、人工智能',imgSrc:'https://company.libawall.com/2021_7_13_1812/assets/logo.4d25621e.svg',href:'https://www.zjgong.com/' },
        // { id:5,name:'景同舟-用户端',title:'此端口为微信H5 微信浏览器打开最优',imgSrc:'http://scenic.jtz.cn/logo.png',href:'https://i.jtz.cn' },
        // { id:6,name:'景同舟-官网',title:'景同舟,整合国内众多优质大景区,推出景区大联盟年票产品,游客一票可无限次畅玩联盟景区',imgSrc:'http://testwww.jtz.cn/_nuxt/assets/image/layouts/logo.svg',href:'http://www.jtz.cn/' },
        // { id:7,name:'篱笆墙人事管理平台',title:'为企业贯穿员工职业生涯的HRsaas服务共建信用体系',imgSrc:'https://hr.libawall.com/img/logo.7b68b222.svg',href:'https://hr.libawall.com' },
        // { id:8,name:'篱笆墙-官网',title:'为企业贯穿员工职业生涯的HRsaas服务共建信用体系',imgSrc:'https://hr.libawall.com/img/logo.7b68b222.svg',href:'https://www.libawall.com/' },
        // { id:9,name:'石猫-e网通-PC/H5',title:'为石材企业打造全面saas服务',imgSrc:'http://file.market.xiaomi.com/thumbnail/PNG/l114/AppStore/0d26064d83cd34bf80e779957469c9a0b99b0b5fb',href:'http://qy.stonetmall.com' },
        // { id:10,name:'石猫-e网通-小程序',title:'公司小程序作为总控模板 无法搜索',imgSrc:'http://file.market.xiaomi.com/thumbnail/PNG/l114/AppStore/0d26064d83cd34bf80e779957469c9a0b99b0b5fb',href:'#' },
      ]
    }
  },
  created(){
    this.getProject()
  },
  methods:{
    async getProject(){
      const data = await getProject()
      console.log(data);
      this.dataSource = data
      this.dataSource.unshift({ add: true })
    },
    openModal(){
    },
    //确定新增 / 确定新增
    async handleOk(){
      if(this.form._id){
        const {success} = await updateProject(this.form)
        success && notify('success','编辑成功')
      }else{
        const {success} = await addProject(this.form)
        success && notify('success','新增成功')
      }
      this.handleCancel()
      this.getProject()
      
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
          await deleteProject({_id})
          _this.getProject()
          notify('success','删除成功')
        },
      });
    },
    handleCancel(){
      setTimeout(() => {
        this.form ={ name:'', title:'', imgSrc:'', href:''}
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
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }
  .new-btn{
    border-radius: 2px;
    width: 100%;
    height: 187px;
  }
  .meta-content{
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

</style>
