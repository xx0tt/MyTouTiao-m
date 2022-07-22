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

// 获取新闻详情
export const getAtricInfo = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}

// 关注用户
export const followedApi = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: { target }
  })
}

// 取关用户
export const unfollowedApi = (autId) => {
  return request({
    url: `/v1_0/user/followings/${autId}`,
    method: 'DELETE'
  })
}

// 收藏文章
export const collectedApi = (artId) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: { target: artId }
  })
}

// 取消收藏文章
export const uncollectedApi = (artId) => {
  return request({
    url: `/v1_0/article/collections/${artId}}`,
    method: 'DELETE'
  })
}

// 对文章点赞
export const giveLikeApi = (artId) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: { target: artId }
  })
}

// 取消对文章点赞
export const ungiveLikeApi = (artId) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}
