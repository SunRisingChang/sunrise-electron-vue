import Vue from "vue";
import VueI18n from "vue-i18n";
import elementEnLocale from "element-ui/lib/locale/lang/en";
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN";
import enLocale from "./en";
import zhLocale from "./zh";
import dataStorage from "@/lib/dataStorage";
import config from "../resources/appConfig";

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
};

const i18n = new VueI18n({
  locale: dataStorage.getCookie().get("language") || config.currLanguage,
  messages
});

export default i18n;
