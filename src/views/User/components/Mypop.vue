<template>
  <div class="pop-box">
    <img :src="photo" alt="" ref="img" />

    <button class="qx" @click="$parent.$parent.show = false">取消</button>
    <button class="wc" @click="photoOk">完成</button>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { userPhoto } from '@/api'
export default {
  data() {
    return {
      myCropper: ''
    }
  },
  props: ['photo'],
  mounted() {
    this.myCropper = new Cropper(this.$refs.img, {})
  },
  methods: {
    async photoOk() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        fm.append('photo', blob)
        // 发请求
        try {
          await userPhoto(fm)
          this.$toast.fail('上传成功')
          this.$parent.$parent.getuserInfo()
          this.$parent.$parent.show = false
        } catch (error) {
          this.$toast.fail('上传失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pop-box {
  img {
    width: 100%;
  }
  /deep/.cropper-bg {
    background-image: unset;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  button {
    background-color: #000;
    border: none;
    color: #fff;
    font-size: 30px;
  }
  .qx {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .wc {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
