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

// 获取搜索结果
export const getResultApi = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page: 10
    }
  })
}
