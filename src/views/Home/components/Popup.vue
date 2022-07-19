<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '90%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <!-- 我的频道 -->
        <div class="my-channel">
          <!-- 标题 -->
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="exit-btn"
              @click="isExit = !isExit"
              >{{ isExit ? '完成' : '编辑' }}</van-button
            >
          </van-cell>
          <!-- 我的频道内容 -->
          <van-grid :border="false" gutter="10">
            <van-grid-item
              :class="{ 'active-channel': index === $parent.active }"
              v-for="(item, index) in mychannel"
              :key="item.id"
              :text="item.name"
              @click="onClickMyChannel(item, index)"
              ><template #icon>
                <van-icon
                  v-show="isExit && item.name !== '推荐'"
                  name="cross"
                /> </template
            ></van-grid-item>
          </van-grid>
        </div>

        <!-- 推荐频道 -->
        <div class="recommend-channel">
          <van-cell title="推荐频道" />
          <!-- 推荐频道 -->
          <van-grid :border="false" gutter="10">
            <van-grid-item
              v-for="item in recommendChannel"
              :key="item.id"
              icon="plus"
              :text="item.name"
              @click="addChannel(item)"
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannel } from '@/api'
export default {
  data() {
    return {
      show: false,
      allChannel: [],
      isExit: false
    }
  },
  created() {
    this.getAllChannel()
  },
  props: {
    mychannel: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 获取所有频道
    async getAllChannel() {
      const { data } = await getAllChannel()
      this.allChannel = data.data.channels
    },
    // 删除频道
    onClickMyChannel(channel, index) {
      if (this.isExit && channel.name !== '推荐') {
        return this.$emit('delChannel', channel.id)
      }

      // 如果不在编辑状态，点击跳转
      if (!this.isExit) {
        this.show = false // 关闭pop
        this.$emit('Mychange', index)
      }
    },
    // 添加频道
    addChannel(channel) {
      // 对象传递给父级克隆数据
      this.$emit('AddChannel', JSON.parse(JSON.stringify(channel)))
    }
  },
  computed: {
    recommendChannel() {
      return this.allChannel.filter((item) => {
        // find方法 ：遍历寻找，符合条件返回该项并终止遍历，全部遍历完仍未找到返回undifind
        return !this.mychannel.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}

.popupMain {
  padding-top: 100px;

  /deep/.van-grid-item__content {
    background-color: #eee;
  }

  // 按钮的样式
  .exit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }

  // 我的频道样式
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          font-size: 30px;
          //   line-height: 0.32rem;
        }
      }
    }
  }

  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
