// 自定义配置，参考 ./default/setting.config.js，需要自定义的属性在这里配置即可
module.exports = {
  theme: {
    color: '#1890ff',
    mode: 'light',//设置你的默认主题模式，可选 light、dark 和 night
  },
  multiPage: false,//多页签模式，true:开启，false:不开启
  animate: {
    disabled: true, //禁用动画，true:禁用，false:启用
    name: 'lightSpeed',//动画效果，支持的动画效果可参考 src/config/default/animate.config.js
    direction: 'left'//动画方向，切换页面时动画的方向，参考 src/config/default/animate.config.js
  }
}
