<template>
  <div>
    <!-- 无图片 -->
    <van-cell
      v-if="aritcel.cover.type === 0"
      :title="aritcel.title"
      :label="aritcelDesc"
    />

    <!-- 一张图片 -->
    <van-cell
      v-if="aritcel.cover.type === 1"
      :title="aritcel.title"
      :label="aritcelDesc"
    >
      <van-image width="3rem" height="2rem" :src="aritcel.cover.images[0]" />
    </van-cell>

    <!-- 三张图片 -->
    <van-cell v-if="aritcel.cover.type === 3" :title="aritcel.title">
      <template #label>
        <!-- 图片 -->
        <div>
          <van-image
            v-for="(item, index) in aritcel.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <!-- 文章描述 -->
        <div>{{ aritcelDesc }}</div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    aritcel: {
      type: Object,
      required: true
    }
  },
  computed: {
    aritcelDesc() {
      const arc = this.aritcel
      const time = dayjs(arc.pubdate).fromNow() // 格式化时间
      return `${arc.aut_name} ${arc.comm_count}评论 ${time}`
    }
  }
}
</script>

<style></style>
