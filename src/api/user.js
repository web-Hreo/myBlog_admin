import request from './request'

const baseUrl = 'user'

//获取个人中心
export function getDesc(params) {
  return request({
    url: `${baseUrl}/desc`,
    method: 'get',
    params,
  })
}
//获取个人中心
export function login(params) {
  return request({
    url: `${baseUrl}/login`,
    method: 'post',
    data:params,
  })
}
//编辑信息
export function setDesc(params) {
  return request({
    url: `${baseUrl}/desc`,
    method: 'post',
    data:params,
  })
}
