import dayjs from 'dayjs'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime) // 配置距今时间

require('dayjs/locale/zh-cn') // 配置中文包
dayjs.locale('zh-cn') // 全局使用简体中文

export default dayjs
