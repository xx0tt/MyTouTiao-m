<template>
  <div>
    <van-cell
      v-for="(item, index) in heightligthData"
      :key="index"
      @click="clickFn(item)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchRuggestion } from '@/api'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      Ruggestion: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    // 监视属性绑定的函数，如果是method里面的函数，支持字符串写法
    // keywords: 'getSearchRuggestion'
    keywords: {
      immediate: true,
      handler() {
        this.getSearchRuggestion()
      }
    }
  },
  methods: {
    // 获取搜索建议
    async getSearchRuggestion() {
      try {
        const { data } = await getSearchRuggestion(this.keywords)
        // if (!data.data.options[0]) return this.$toast.fail('暂无数据')
        this.Ruggestion = data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    // 点击搜索建议
    clickFn(item) {
      this.$parent.keywords = item.replace(
        /<span style="color:red">|<\/span>/g,
        ''
      )

      this.$parent.isShowSearchResult = true
    }
  },
  computed: {
    heightligthData() {
      const reg = new RegExp(this.keywords, 'gi')

      return this.Ruggestion.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
