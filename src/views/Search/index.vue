<template>
  <div>
    <!-- 头部搜索框 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowSearchResult = false"
      />

      <!-- 显示区域 历史 建议 结果-->
      <component :is="conName" :keywords="keywords"></component>
    </form>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'
export default {
  name: 'Search',
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch() {
      console.log(this.keywords)
      this.isShowSearchResult = true
    },
    onCancel() {
      this.$router.go(-1)
    }
  },
  computed: {
    conName() {
      if (this.keywords.trim() === '') return 'SearchHistory'

      if (this.isShowSearchResult) return 'SearchResult'

      return 'SearchSuggestion'
    }
  }
}
</script>

<style lang="less" scoped>
.van-search {
  background-color: #3296fa;
  .van-search__action {
    color: #fff;
  }
}
</style>
