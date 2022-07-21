<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template v-if="!isExit" #right-icon>
          <van-icon name="delete-o" @click="isExit = true" />
        </template>

        <template v-if="isExit" #default>
          <span @click="delAll">全部删除</span>
          <span @click="isExit = false" style="margin-left: 10px">完成</span>
        </template>
      </van-cell>

      <!-- 显示历史列表 -->
      <van-cell-group
        v-for="(item, index) in Historylist"
        :key="index"
        @click="clickFn(item)"
      >
        <van-cell :title="item">
          <!-- 删除按钮 -->
          <template v-if="isExit" #right-icon>
            <van-icon name="close" @click="delFn(item)" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data() {
    return {
      Historylist: this.$parent.Historylist,
      isExit: false
    }
  },
  methods: {
    // 删除
    delFn(item) {
      // 激活父级的事件
      this.$parent.delHistory(item)
    },

    // 删除全部
    delAll() {
      this.Historylist = []
      this.$parent.delHistoryAll()
    },

    // 点击历史跳转搜索
    clickFn(item) {
      this.$parent.keywords = item

      this.$parent.isShowSearchResult = true
    }
  }
}
</script>

<style></style>
