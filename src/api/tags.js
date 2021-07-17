import request from './request'

const baseUrl = 'tags'

//查询所有标签
export function getTags(params) {
  return request({
    url: `${baseUrl}/all`,
    method: 'get',
    params,
  })
}
//新增标签
export function setTag(params) {
  return request({
    url: `${baseUrl}/set`,
    method: 'post',
    data:params,
  })
}
//编辑标签
export function updateTag(params) {
  return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data:params,
  })
}
//删除标签
export function deleteTag(params) {
  return request({
    url: `${baseUrl}/delete`,
    method: 'post',
    data:params,
  })
}