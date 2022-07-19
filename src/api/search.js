import request from '@/utils/request'

// 获取联想建议（自动补全）
export const getSearchRuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
