import request from './request'

const baseUrl = 'project'

//查询所有文章
export function getProject(params) {
  return request({
    url: `${baseUrl}/all`,
    method: 'get',
    params,
  })
}
//新增文章
export function addProject(params) {
  return request({
    url: `${baseUrl}/add`,
    method: 'post',
    data:params,
  })
}
//编辑文章
export function updateProject(params) {
  return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data:params,
  })
}
//删除文章
export function deleteProject(params) {
  return request({
    url: `${baseUrl}/delete`,
    method: 'post',
    data:params,
  })
}