import { notification } from 'ant-design-vue'
export function notify(type,description) {
  notification[type]({
    message: '提示',
    description
  });
}