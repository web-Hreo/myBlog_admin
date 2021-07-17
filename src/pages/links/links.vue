<template>
  <div>
    <a-card :bordered="false">
      <div style="display: flex; flex-wrap: wrap">
          <head-info title="我的全部友链" content="8个" :bordered="true"/>
          <head-info title="本周新增友链" content="32个" :bordered="true"/>
          <head-info title="目前失联友链" style="color:red" content="24个"/>
      </div>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
    >
      <div slot="extra">
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      <a-button type="dashed" style="width: 100%" icon="plus">添加</a-button>
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
  </div>
</template>

<script>
import HeadInfo from '../../components/tool/HeadInfo'
export default {
  name: 'StandardList',
  components: {HeadInfo}
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
