/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 12:10:57 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-25 12:09:45
 * @Description: 登陆页面
 */
<template>
  <div v-if="$store.state.base.defaultLayout==='defaultLayout'" class="login-page">
    <div class="msg-layer">
      <div class="info-block">
        <p>
          <span class="log"></span>
          <span>SUNRISE</span>
        </p>
        <p>{{$t('login.infoH1')}}</p>
        <p>{{$t('login.infoH2')}}</p>
        <p>{{$t('login.infoH3')}}</p>
        <p>
          <a target="_blank" href="https://gitee.com/sunrise-chang">{{$t('login.infoButton')}}</a>
        </p>
      </div>
    </div>
    <div class="login-layer">
      <div class="login-bg" />
      <div class="i18-icon">
        <el-dropdown trigger="click" placement="bottom" @command="handleSetLanguage">
          <span class="el-dropdown-link">
            <span>
              <i class="icon-ali ali-yuyanqiehuan" :title="$t('navbar.language')"></i>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in $store.state.base.sysConfig.language" :disabled="$store.state.base.sysConfig.currLanguage===item.code" :command="item.code" :key="item.code">{{item.title}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="login-form">
        <div class="logo-icon"></div>
        <p class="login-title">{{$t('login.title')}}</p>
        <ul class="login-body">
          <li>
            <input :placeholder="$t('login.userName')" v-model="loginForm.userName" maxlength="10" />
          </li>
          <li>
            <input :placeholder="$t('login.passWord')" :type="showPw?'':'password'" v-model="loginForm.passWd" maxlength="50" @keyup.enter="submitLoginForm" />
            <i @click="showPw=!showPw" :class="showPw?'icon-ali ali-chakanmima1':'icon-ali ali-chakanmima'"></i>
          </li>
          <li class="captcha" v-if="$store.state.base.isShowCaptcha">
            <span @click="updateCaptcha">
              <img :src="captchaURL" alt="验证码" />
            </span>
            <input :placeholder="$t('login.kaptchaCode')" v-model="loginForm.captcha" maxlength="4" @keyup.enter="submitLoginForm" />
          </li>
          <li class="button">
            <button :disabled="subButton" @click="submitLoginForm">{{$t('login.button')}}</button>
          </li>
        </ul>
      </div>
      <div class="copyright">{{pageInfo.copyright}}</div>
    </div>
  </div>
  <div v-else class="login-page-mini">
    <div class="login-layer">
      <div class="login-bg" />
      <div class="i18-icon">
        <el-dropdown trigger="click" placement="bottom" @command="handleSetLanguage">
          <span class="el-dropdown-link">
            <span>
              <i class="icon-ali ali-yuyanqiehuan" :title="$t('navbar.language')"></i>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in $store.state.base.sysConfig.language" :disabled="$store.state.base.sysConfig.currLanguage===item.code" :command="item.code" :key="item.code">{{item.title}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="login-form">
        <div class="logo-icon"></div>
        <p class="login-title">{{$t('login.title')}}</p>
        <ul class="login-body">
          <li>
            <input :placeholder="$t('login.userName')" v-model="loginForm.userName" maxlength="50" />
          </li>
          <li>
            <input :placeholder="$t('login.passWord')" :type="showPw?'':'password'" v-model="loginForm.passWd" maxlength="50" @keyup.enter="submitLoginForm" />
            <i @click="showPw=!showPw" :class="showPw?'icon-ali ali-chakanmima1':'icon-ali ali-chakanmima'"></i>
          </li>
          <li class="captcha" v-if="$store.state.base.isShowCaptcha">
            <span @click="updateCaptcha">
              <img :src="captchaURL" alt="验证码" />
            </span>
            <input :placeholder="$t('login.kaptchaCode')" v-model="loginForm.captcha" maxlength="4" @keyup.enter="submitLoginForm" />
          </li>
          <li class="button">
            <button :disabled="subButton" @click="submitLoginForm">{{$t('login.button')}}</button>
          </li>
        </ul>
      </div>
      <div class="copyright">{{pageInfo.copyright}}</div>
    </div>
  </div>
</template>
<script>
import VuexApi from "@/api/vuexApi";

export default {
  data() {
    return {
      pageInfo: {
        copyright: "Copyright © 2094 SUNRISE. All rights reserved."
      },
      subButton: false,
      loginForm: {
        userName: null,
        passWd: null,
        captcha: null
      },
      captchaURL: VuexApi.getCaptcha(),
      showPw: false
    };
  },
  mounted: function() {
    //通知vuex注册窗口改变事件
    this.$store.dispatch("base/monitorWinSize");
  },
  methods: {
    //国际化切换
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("base/changeI18n", lang);
    },
    //进行登陆
    async submitLoginForm() {
      let loading;
      try {
        if (this.formVerify()) {
          loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          await this.$utils.sleep(3000);
          await this.$store.dispatch("base/login", this.loginForm);
        }
      } catch (error) {
      } finally {
        if (loading) loading.close();
      }
    },
    //表单验证
    formVerify() {
      try {
        this.subButton = true;
        //用户
        if (!this.loginForm.userName) {
          throw new Error(this.$t("verify.userNotNull"));
        }
        if (this.loginForm.userName.length < 4 || this.loginForm.userName.length > 20) {
          throw new Error(this.$t("verify.userLength"));
        }
        //密码
        if (!this.loginForm.passWd) {
          throw new Error(this.$t("verify.pawdNotNull"));
        }
        if (this.loginForm.passWd.length < 8 || this.loginForm.passWd.length > 30) {
          throw new Error(this.$t("verify.pawdLength"));
        }
        //验证码
        if (this.$store.state.base.isShowCaptcha) {
          if (!this.loginForm.captcha) {
            throw new Error(this.$t("verify.captchaNotNull"));
          }
          if (this.loginForm.captcha.length !== 4) {
            throw new Error(this.$t("verify.captchaLength"));
          }
        }
      } catch (error) {
        this.$utils.sayOpWarn(error.message);
        return false;
      } finally {
        this.subButton = false;
      }
      return true;
    },
    //刷新验证码
    updateCaptcha() {
      this.captchaURL = VuexApi.getCaptcha();
    }
  }
};
</script>
<style lang='scss'>
.login-page {
  width: 100%;
  height: 100%;
  background-color: #1f66dc;
  overflow: hidden;
  position: relative;
  .msg-layer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .info-block {
      width: 80%;
      height: 70%;
      display: flex;
      background-color: #093359;
      box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.6);
      flex-direction: column;
      padding: 25px;
      opacity: 0;
      animation-name: slideRight;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
      p {
        height: 20%;
        flex-grow: 1;
        display: flex;
        align-items: center;
      }
      p:nth-child(1) {
        padding: 0px;
        font-size: 34px;
        letter-spacing: 2px;
        color: #fff;
        font-weight: bold;
        .log {
          background-image: url("../assets/logo.png");
          height: 100%;
          width: 50px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 90%;
        }
      }
      p:nth-child(2) {
        align-items: flex-end;
        margin-bottom: 20px;
        font-size: 34px;
        color: #fff;
      }
      p:nth-child(3) {
        align-items: flex-start;
        font-size: 34px;
        color: #fff;
        font-weight: bold;
      }
      p:nth-child(4) {
        width: 30%;
        color: #47d1f5;
        font-size: 16px;
      }
      p:nth-child(5) {
        align-items: flex-start;
        a {
          display: block;
          height: 50px;
          line-height: 50px;
          text-align: center;
          letter-spacing: 1px;
          width: 100px;
          color: #fff;
          font-size: 18px;
          background-color: transparent;
          border: 1px solid #53a5ee;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }
  @keyframes slideRight {
    0% {
      transform: translateX(50%);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .login-layer {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: 60%;
    overflow: hidden;
    min-width: 472px;
    .login-bg {
      position: absolute;
      bottom: 0px;
      right: -10px;
      height: 150%;
      min-height: 768px;
      width: 100%;
      /* autoprefixer: ignore next */
      background: -webkit-gradient(linear, left, #437ce6 1%, #3bc3fb 99%);
      /* autoprefixer: ignore next */
      background: -webkit-linear-gradient(left, #437ce6 1%, #3bc3fb 99%);
      /* autoprefixer: ignore next */
      background: -moz-linear-gradient(left, #437ce6 1%, #3bc3fb 99%);
      /* autoprefixer: ignore next */
      background: -o-linear-gradient(left, #437ce6 1%, #3bc3fb 99%);
      /* autoprefixer: ignore next */
      background: linear-gradient(left, #437ce6 1%, #3bc3fb 99%);
      transform-origin: left bottom;
      transform: rotate(15deg);
      box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.6);
    }
    .i18-icon {
      position: absolute;
      top: 20px;
      right: 40px;
      cursor: pointer;
      i {
        color: #00162f;
        font-size: 18px;
      }
    }
    .login-form {
      position: absolute;
      top: 16%;
      right: 5%;
      width: 64%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
      .logo-icon {
        height: 150px;
        width: 100%;
        background-image: url("../assets/logo.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 18%;
        margin-bottom: 10%;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background-size: 20%;
        }
      }
      .login-title {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 55px;
        color: #fff;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        letter-spacing: 5px;
        margin-bottom: 20px;
      }
      .login-body {
        width: 100%;
        max-width: 400px;
        margin: 0px auto;
        margin-bottom: 2%;
        list-style: none;
        input {
          width: 100%;
          border-width: 0px;
          border-bottom: 1px solid #fff;
          height: 30px;
          background-color: transparent;
          font-size: 14px;
          color: #fff;
          transition: all 0.3s;
          text-indent: 4px;
          &::-webkit-input-placeholder {
            color: #fff;
          }
          &:focus {
            outline: none;
            border-width: 0px;
            border-bottom: 1px solid red;
          }
        }
        li {
          margin-bottom: 20px;
        }
        li:nth-child(2) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          i {
            position: absolute;
            text-align: center;
            width: 25px;
            right: 0;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
          }
          input {
            padding-right: 25px;
          }
        }
        .captcha {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            width: 150px;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &::after {
              transition: all 0.3s;
              cursor: pointer;
              content: "\27F3 刷新";
              position: absolute;
              top: 0px;
              left: 0px;
              bottom: 0px;
              right: 0px;
              background-color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: 0;
              font-size: 14px;
            }
            &:hover::after {
              opacity: 0.8;
            }
            img {
              width: 100%;
              height: 100%;
              color: #fff;
            }
          }
        }
        .button {
          text-align: center;
          button {
            display: block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            background-color: #3bf0cf;
            color: #00163c;
            letter-spacing: 5px;
            border-width: 0px;
            font-size: 14px;
            transition: all 0.3s;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
            }
          }
        }
      }
    }
    .copyright {
      position: absolute;
      bottom: 20px;
      right: 40px;
      font-size: 12px;
      color: #303133;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
    }
  }
}
.login-page-mini {
  width: 100%;
  height: 100%;
  /* autoprefixer: ignore next */
  background: -webkit-gradient(linear, 45deg, #437ce6 50%, #3bc3fb);
  /* autoprefixer: ignore next */
  background: -webkit-linear-gradient(45deg, #437ce6 50%, #3bc3fb);
  /* autoprefixer: ignore next */
  background: -moz-linear-gradient(45deg, #437ce6 50%, #3bc3fb);
  /* autoprefixer: ignore next */
  background: -o-linear-gradient(45deg, #437ce6 50%, #3bc3fb);
  /* autoprefixer: ignore next */
  background: linear-gradient(45deg, #437ce6 50%, #3bc3fb);
  .login-layer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .login-bg {
      display: none;
    }
    .i18-icon {
      position: absolute;
      top: 20px;
      right: 40px;
      cursor: pointer;
      z-index: 1;
      i {
        color: #00162f;
        font-size: 18px;
      }
    }
    .login-form {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
      .logo-icon {
        height: 15%;
        width: 300px;
        margin: 0 auto;
        background-image: url("../assets/logo.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        margin-bottom: 5%;
      }
      .login-title {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 50px;
        color: #fff;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        letter-spacing: 5px;
        margin-bottom: 20px;
      }
      .login-body {
        width: 90%;
        max-width: 400px;
        margin: 0px auto;
        margin-bottom: 2%;
        list-style: none;
        input {
          width: 100%;
          border-width: 0px;
          border-bottom: 1px solid #fff;
          height: 30px;
          background-color: transparent;
          font-size: 14px;
          color: #fff;
          transition: all 0.3s;
          text-indent: 4px;
          &::-webkit-input-placeholder {
            color: #fff;
          }
          &:focus {
            outline: none;
            border-width: 0px;
            border-bottom: 1px solid red;
          }
        }
        li {
          margin-bottom: 20px;
        }
        li:nth-child(2) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          i {
            position: absolute;
            text-align: center;
            width: 25px;
            right: 0;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
          }
          input {
            padding-right: 25px;
          }
        }
        .captcha {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            width: 150px;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &::after {
              transition: all 0.3s;
              cursor: pointer;
              content: "\27F3 刷新";
              position: absolute;
              top: 0px;
              left: 0px;
              bottom: 0px;
              right: 0px;
              background-color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: 0;
              font-size: 14px;
            }
            &:hover::after {
              opacity: 0.8;
            }
            img {
              width: 100%;
              height: 100%;
              color: #fff;
            }
          }
        }
        .button {
          text-align: center;
          button {
            display: block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            background-color: #3bf0cf;
            color: #00163c;
            letter-spacing: 5px;
            border-width: 0px;
            font-size: 14px;
            transition: all 0.3s;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
            }
          }
        }
      }
    }
    .copyright {
      position: absolute;
      bottom: 20px;
      right: 40px;
      font-size: 12px;
      color: #303133;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
