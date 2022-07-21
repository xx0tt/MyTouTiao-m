<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="20"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in ResultList"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getResultApi } from '@/api'
export default {
  name: 'SearchResult',
  data() {
    return {
      page: 0,
      ResultList: [],
      loading: false,
      finished: false,
      error: false
    }
  },
  created() {
    this.getResult()

    // 把搜索记录添加到父组件 去重
    if (
      this.$parent.keywords.trim() !== '' &&
      !this.$parent.Historylist.includes(this.$parent.keywords)
    ) {
      this.$parent.Historylist.unshift(this.$parent.keywords)
    }
  },
  methods: {
    // 获取搜索结果
    async getResult() {
      try {
        // if (Math.random() > 0.5) throw new Error('出错')

        const { data } = await getResultApi(this.$parent.keywords, this.page)

        if (data.data.results.length === 0) {
          this.finished = true
        }

        if (data.data.results.length === 0 && this.page === 1) {
          // this.finished = true
          return this.$toast.fail('无搜索结果！')
        }

        this.ResultList.push(...data.data.results)
        console.log(this.ResultList)
      } catch (error) {
        if (this.page !== 1) this.error = true
      }
    },

    // 加载事件
    async onLoad() {
      this.page++
      console.log(this.page)
      await this.getResult()
      this.loading = false
    }
  }
}
</script>

<style></style>
