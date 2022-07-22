import request from '@/utils/request'

// 获取评论或评论回复
/**
 *
 * @param {String} type 评论类型，a 对文章的评论，c 对评论的回复
 * @param {String} source 源id，文章id或评论id
 * @param {*} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @returns Promise
 */
export const getcommentsApi = (type, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit: 10
    }
  })
}

// 对文章或者评论进行评论
/**
 *
 * @param {String} target 评论的目标id（文章id/评论id）
 * @param {String} content 评论内容
 * @param {String} artId 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns Promise
 */
export const partFiveApi = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}

// 对评论或评论回复点赞
export const comGiveLikeApi = (comId) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: { target: comId } // 点赞的评论id
  })
}

// 取消对评论或评论回复点赞
export const unComGiveLikeApi = (comId) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE' // 点赞的评论id
  })
}
