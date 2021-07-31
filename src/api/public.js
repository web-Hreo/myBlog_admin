import request from './request'

const baseUrl = 'file'

export function getToken(params) {
  return request({
    url: `${baseUrl}/token`,
    method: 'get',
    params,
  })
}
//查询所有留言
export function getCommentList(params) {
  return request({
    url: `comment/all`,
    method: 'get',
    params,
  })
}
//根据_id删除留言
export function delComment(params) {
  return request({
    url: `comment/delete`,
    method: 'post',
    data:params,
  })
}

//上传图片
export function uploadImg(params) {
  return request({
    url: 'http://up-z2.qiniup.com',
    method: 'post',
    data:params,
  })
}