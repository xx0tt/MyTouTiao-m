import request from '@/utils/request'
import Storage from '@/utils/storage'

// 获取我的频道
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道列表
export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 删除用户指定频道
export const delChannel = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

// 添加用户频道
export const AddChannelApi = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// loc里频道列表名称
const MyChannelLoc = 'TOUTIAO_CHANNEL'

// 本地获取频道列表
export const getMyChannelOnLoc = () => {
  return Storage.get(MyChannelLoc)
}

// 添加到本地频道列表
export const setMyChannelToLoc = (val) => {
  return Storage.set(MyChannelLoc, val)
}
