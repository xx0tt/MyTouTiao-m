import request from '@/utils/request'

/**
 *
 * @param {String} mobile 手机号
 * @param {String} code  验证码
 * @returns Promise
 */

// 登录
export const loginApi = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

//  发送验证码
export const sendCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户数据

export const getUSerInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}
