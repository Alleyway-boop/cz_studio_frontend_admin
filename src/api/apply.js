import request from '@/utils/request'

// 查询Team列表
export function listApply(query) {
  return request({
    url: '/team/apply/list',
    method: 'get',
    params: query
  })
}

// 查询Team详细
export function getApply(id) {
  return request({
    url: '/team/apply/' + id,
    method: 'get'
  })
}

// 新增Team
export function addApply(data) {
  return request({
    url: '/team/apply',
    method: 'post',
    data: data
  })
}

// 修改Team
export function updateApply(data) {
  return request({
    url: '/team/apply',
    method: 'put',
    data: data
  })
}

// 删除Team
export function delApply(id) {
  return request({
    url: '/team/apply/' + id,
    method: 'delete'
  })
}
