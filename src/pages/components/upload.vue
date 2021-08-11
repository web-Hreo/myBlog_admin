<template>
  <a-upload
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="max-width:200px" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">
        Upload
      </div>
    </div>
  </a-upload>
</template>
<script>
import {getToken, uploadImg} from '@/api/public'
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }
export default {
  data() {
    return {
      loading: false,
    };
  },
  props:{
    imageUrl:{type:String,default:''}
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, imageUrl => {
        //   this.imageUrl = imageUrl;
        //   this.loading = false;
        // });
      }
    },
    async beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      const {data} = await getToken()
      var formData = new FormData();
      const date = Date.now()
      formData.append("file", file);
      formData.append("token", data.uploadToken);
      formData.append("key", date+'_'+file.name);
      const res = await uploadImg(formData)
      this.$emit('upload', 'http://cdn.heblogs.cn/' +res.key)
      // const token = data.uploadToken
      // return isJpgOrPng && isLt2M;
      return false
    },
  },
  watch:{
    imageUrl(val){
      this.imageUrl = val
    }
  }
};
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>