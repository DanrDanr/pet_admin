import request from '@/utils/request'

export function tableData(query) {
  return request({
    url: '/api/employee/list',
    method: 'get',
    params: query
  })
}
export function addEmployee(data) {
  return request({
    url: '/api/employee/add',
    method: 'post',
    data
  })
}
