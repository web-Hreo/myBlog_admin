<template>
  <page-layout >
    <div slot="headerContent" style="display:flex;align-items: center;">
      <a-input placeholder="请输入标签名称" />
      <a-button style="margin-left:20px" @click="visible = true" type="primary">新建</a-button>
    </div>
    <template slot="extra">
      <head-info class="split-right" title="我的全部友链" content="56"/>
      <head-info class="split-right" title="亲友友链" content="24"/>
      <head-info class="split-right" title="常客友链" content="2223"/>
      <head-info class="split-right" title="目前失联友链" content="2223"/>
    </template>
    <a-card style="margin-top: 24px" :bordered="false">
      <!-- <a-form layout="horizontal">
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
      </a-form> -->
      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="i" v-for="i in 5">
          <a-list-item-meta
            description="我的博客审美来源，哲学/简约美/细节美"
          >
            <a-avatar slot="avatar" size="large" shape="square" src="https://site-1258928558.cos.ap-guangzhou.myqcloud.com/javadoop.png"/>
            <a slot="title">reuixiy</a>
          </a-list-item-meta>
          <div slot="actions">
            <a>编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>所属卡片</span>
              <p>常客</p>
            </div>
            <div class="list-content-item">
              <span>添加时间</span>
              <p>2018-07-26 22:44</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="80" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import HeadInfo from '../../components/tool/HeadInfo'
export default {
  name: 'StandardList',
  components: {HeadInfo,PageLayout}
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
