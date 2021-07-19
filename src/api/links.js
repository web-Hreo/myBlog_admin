import request from './request'

const baseUrl = 'links'

//查询所有标签
export function getLink(params) {
  return request({
    url: `${baseUrl}/all`,
    method: 'get',
    params,
  })
}
//新增标签
export function setLink(params) {
  return request({
    url: `${baseUrl}/set`,
    method: 'post',
    data:params,
  })
}
//编辑标签
export function updateLink(params) {
  return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data:params,
  })
}
//删除标签
export function deleteLink(params) {
  return request({
    url: `${baseUrl}/delete`,
    method: 'post',
    data:params,
  })
}