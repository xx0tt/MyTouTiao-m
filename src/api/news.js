import request from '@/utils/request'

// 获取文章新闻推荐
export const getAtricListApi = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId, // 频道ID
      timestamp // 时间戳
    }
  })
}
