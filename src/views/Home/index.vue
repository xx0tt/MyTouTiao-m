<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search" />搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!-- tab选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in mychannel" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <ArticList :id="item.id"></ArticList>
      </van-tab>

      <!-- 更多的按钮 -->
      <span class="toutiao toutiao-gengduo" @click="clickFn"></span>
    </van-tabs>

    <!-- 弹出层 -->
    <Popup
      :mychannel="mychannel"
      @delChannel="delChannel"
      @Mychange="Mychange"
      @AddChannel="AddChannel"
    />
  </div>
</template>

<script>
import {
  getMyChannel,
  getMyChannelOnLoc,
  setMyChannelToLoc,
  delChannel,
  AddChannelApi
} from '@/api'
import Popup from './components/Popup.vue'
import ArticList from './components/ArticList.vue'

export default {
  data() {
    return {
      active: 0,
      mychannel: []
    }
  },
  created() {
    this.getMyChannelList()
  },
  components: { ArticList, Popup },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 获取我的列表
    async getMyChannelList() {
      try {
        // 如果未登录，从本地拿数据
        if (!this.isLogin) {
          const mychannel = getMyChannelOnLoc()
          this.mychannel = mychannel
          // 如果本地没数据，则发起请求从服务器拿数据
          if (!mychannel) {
            const { data } = await getMyChannel()
            this.mychannel = data.data.channels
          }
        } else {
          // 如果登陆了，发请求从服务器拿数据
          const { data } = await getMyChannel()
          this.mychannel = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    clickFn() {
      this.$children[2].show = true // 修改子级的值，也可以使用$refs
    },
    // 删除频道
    async delChannel(id) {
      this.mychannel = this.mychannel.filter((item) => item.id !== id)

      // 如果未登录，从本地修改数据
      if (!this.isLogin) {
        setMyChannelToLoc(this.mychannel)
      } else {
        // 如果登录，从服务器删除
        try {
          await delChannel(id)
        } catch (error) {
          return this.$toast.fail('删除频道失败')
        }
      }
      this.$toast.success('删除频道成功')
    },
    // 切换active
    Mychange(index) {
      this.active = index
    },
    // 添加频道
    async AddChannel(channel) {
      this.mychannel.push(channel)

      // 如果未登录，从本地修改数据
      if (!this.isLogin) {
        setMyChannelToLoc(this.mychannel)
      } else {
        // 如果已登录，从服务器修改数据
        try {
          await AddChannelApi(channel.id, this.mychannel.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  z-index: 666; // 提高层级
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

// 固定头部
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
