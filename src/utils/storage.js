class Storage {
  set(key, value) {
    // 存入本地 判断数据是否为复杂数据类型，如果是，则要序列化
    if (typeof value === 'object' && typeof value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get(key) {
    // 获取数据 判断数据是否为序列化对象，如果是，则反序列化
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()

export default storage
