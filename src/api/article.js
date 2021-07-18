import request from './request'

const baseUrl = 'article'

//查询所有文章
export function getArticle(params) {
  return request({
    url: `${baseUrl}/all`,
    method: 'get',
    params,
  })
}
//根据id查找文章
export function getArticleById(params) {
  return request({
    url: `${baseUrl}/byId`,
    method: 'get',
    params,
  })
}
//新增文章
export function addArticle(params) {
  return request({
    url: `${baseUrl}/add`,
    method: 'post',
    data:params,
  })
}
//编辑文章
export function updateArticle(params) {
  return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data:params,
  })
}
//删除文章
export function deleteArticle(params) {
  return request({
    url: `${baseUrl}/delete`,
    method: 'post',
    data:params,
  })
}