/**
 * @Author: Sun Rising 
 * @Date: 2019-01-22 16:12:31 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 19:01:26
 * @Description: 服务器自身出现异常
 */
<template>
  <div class="page-500">
    <div class="page-500-img"><img src="@/assets/500_images/500.gif"></div>
    <div class="page-500-info">
      <p>500</p>
      <p>服务器累了，小憩一会.......</p>
      <p>服务器受未知原因无法返回可识别信息，服务器目前可能已经死机，请联系管理员或等待服务器修复!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page500"
};
</script>

<style lang="scss">
.page-500 {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  & .page-500-img {
    display: flex;
    justify-content: center;
    margin-top: 5%;
  }
  & .page-500-info {
    text-align: center;
    margin: 1% 10% 0 10%;
    & p:nth-child(1) {
      font-size: 80px;
      font-weight: bold;
      color: #409eff;
      letter-spacing: 5px;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    & p:nth-child(2) {
      font-size: 20px;
      line-height: 24px;
      color: #303133;
      font-weight: bold;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    & p:nth-child(3) {
      margin-top: 1%;
      font-size: 14px;
      line-height: 21px;
      color: #606266;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>

 
