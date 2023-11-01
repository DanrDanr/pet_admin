import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function tableData(query) {
  return request({
    url: '/api/employee/list',
    method: 'get',
    params: query
  })
}
