<template>
  <div>
    <van-pull-refresh
      v-model="refreshIsLoading"
      @refresh="LoadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="LoadNextPage"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticItem
          v-for="item in aiticel"
          :key="item.art_id"
          :aritcel="item"
        ></ArticItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAtricListApi } from '@/api'
import ArticItem from './ArticItem.vue'
export default {
  name: 'ArticList',
  data() {
    return {
      aiticel: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshIsLoading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: { ArticItem },
  created() {
    this.atricList()
  },
  methods: {
    // 获取文章推荐列表
    async atricList() {
      try {
        const { data } = await getAtricListApi(this.id, +new Date())
        this.aiticel = data.data.results // 获取到的文章数组
        this.pre_timestamp = data.data.pre_timestamp // 时间戳
      } catch (error) {
        if (error.response.status === 400) {
          throw new Error(error.response.data.message) // 抛出错误信息
        } else {
          this.$toast.fail('获取文章列表失败，请稍后重试')
        }
      }
    },

    // 加载下一页
    async LoadNextPage() {
      try {
        // if (Math.random() < 0.7) throw new Error('出错了') // 模拟随机出错

        const { data } = await getAtricListApi(this.id, this.pre_timestamp)

        if (!data.data.pre_timestamp) this.finished = true // 加载到最后一页后端不返回时间戳

        if (this.refreshIsLoading) {
          // 如果是下拉刷新
          this.aiticel.unshift(...data.data.results) // 头部追加文章
        } else {
          this.aiticel.push(...data.data.results) // 尾部追加文章
        }

        this.pre_timestamp = data.data.pre_timestamp // 更新时间戳
      } catch (error) {
        this.error = true // 如果出错，则显示点击刷新
      } finally {
        // 不管正确错误，都会执行
        this.loading = false // 修改状态，能继续刷新
        this.refreshIsLoading = false // 修改状态，能继续下拉刷新
      }
    }
  }
}
</script>

<style></style>
