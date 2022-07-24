<template>
  <div>
    <!-- 表头 -->
    <div class="head">
      <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    </div>
    <input type="file" ref="file" hidden accept=".png,.jpg" />
    <!-- 头像 -->
    <van-cell-group>
      <van-cell title="头像" is-link center @click="$refs.file.click()">
        <van-image
          width="35"
          height="35"
          fit="cover"
          round
          :src="userInfo.photo"
        />
      </van-cell>
    </van-cell-group>
    <!-- 昵称 -->
    <van-cell-group>
      <van-cell
        title="昵称"
        :value="userInfo.name"
        is-link
        @click="nickNameShow = true"
      />
    </van-cell-group>
    <!-- 性别 -->
    <van-cell-group>
      <van-cell
        title="性别"
        :value="['男', '女'][userInfo.gender]"
        is-link
        @click="SexShow = true"
      />
    </van-cell-group>
    <!-- 生日 -->
    <van-cell-group>
      <van-cell
        title="生日"
        :value="userInfo.birthday"
        is-link
        @click="birthDayShow = true"
      />
    </van-cell-group>

    <!-- 头像弹出层 -->
    <div class="touxiangBox">
      <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
        <Mypop v-if="show" :photo="photo"></Mypop>
      </van-popup>
    </div>

    <!-- 昵称弹出层 -->
    <van-popup
      v-model="nickNameShow"
      position="bottom"
      :style="{ height: '100%' }"
      ><Nickname :userInfo="userInfo"></Nickname>
    </van-popup>

    <!-- 性别弹出层 -->
    <van-popup v-model="SexShow" position="bottom" :style="{ height: '50%' }">
      <Sexpop></Sexpop>
    </van-popup>

    <!-- 生日弹出层 -->
    <van-popup
      v-model="birthDayShow"
      position="bottom"
      :style="{ height: '50%' }"
      ><BirthDay></BirthDay>
    </van-popup>
  </div>
</template>

<script>
import Mypop from './components/Mypop.vue'
import Nickname from './components/Nickname.vue'
import Sexpop from './components/Sexpop.vue'
import BirthDay from './components/BirthDay.vue'
import { myInfo } from '@/api'
export default {
  data() {
    return {
      show: false,
      userInfo: {},
      photo: '',
      nickNameShow: false,
      SexShow: false,
      birthDayShow: false
    }
  },
  components: { Mypop, Nickname, Sexpop, BirthDay },
  created() {
    this.getuserInfo()
  },
  methods: {
    async getuserInfo() {
      const { data } = await myInfo()
      this.userInfo = data.data
    }
  },

  mounted() {
    this.$refs.file.addEventListener('change', (e) => {
      const file = e.target.files[0]
      //  file = URL.createObjectURL(file) // 将file对象转换成图片可识别的url
      const fr = new FileReader() // 文件阅读器
      fr.readAsDataURL(file) // 转 base64
      fr.onload = (e) => {
        // onload 读取完成后触发
        this.photo = e.target.result // 转base64后的结果
        this.show = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
.head {
  .van-nav-bar {
    background-color: #3296fa;
    /deep/.van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
}
.touxiangBox {
  /deep/.van-popup {
    background-color: #000;
  }
}
</style>
