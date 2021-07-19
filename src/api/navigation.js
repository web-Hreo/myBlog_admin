import request from './request'

const baseUrl = 'navigation'

//查询所有学习资源标签
export function getTag(params) {
  return request({
    url: `${baseUrl}/getTag`,
    method: 'get',
    params,
  })
}
//新增学习资源标签 name
export function addTag(params) {
  return request({
    url: `${baseUrl}/addTag`,
    method: 'post',
    data:params,
  })
}
//编辑学习资源标签 _id name
export function updateTag(params) {
  return request({
    url: `${baseUrl}/updateTag`,
    method: 'post',
    data:params,
  })
}
//删除学习资源标签 _id
export function deleteTag(params) {
  return request({
    url: `${baseUrl}/deleteTag`,
    method: 'post',
    data:params,
  })
}
//根据类型获取学习资源 navigationTag
export function ByTag(params) {
  return request({
    url: `${baseUrl}/ByTag`,
    method: 'get',
    params,
  })
}
//根据类型获取学习资源 navigationTag,title,desc,imgSrc,url
export function setByTag(params) {
  return request({
    url: `${baseUrl}/ByTag`,
    method: 'post',
    data:params,
  })
}
//编辑学习资源 navigationTag,title,desc,imgSrc,url
export function updateByTag(params) {
  return request({
    url: `${baseUrl}/updateByTag`,
    method: 'post',
    data:params,
  })
}
//删除学习资源 _id
export function deleteByTag(params) {
  return request({
    url: `${baseUrl}/deleteByTag`,
    method: 'post',
    data:params,
  })
}