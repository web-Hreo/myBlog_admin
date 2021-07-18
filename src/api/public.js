import request from './request'

const baseUrl = 'file'

//查询所有标签
export function getToken(params) {
  return request({
    url: `${baseUrl}/token`,
    method: 'get',
    params,
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