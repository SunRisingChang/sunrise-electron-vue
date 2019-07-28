/**
 * 动态添加的路由信息
 */
import UsrmRouter from "@/router/modules/UsrmRouter";
import SysmRouter from "@/router/modules/SysmRouter";
import LogsRouter from "@/router/modules/LogsRouter";
import PluginRouter from "@/router/modules/PluginRouter";
import OtherRouter from "@/router/modules/OtherRouter";

export default []
  .concat(UsrmRouter)
  .concat(SysmRouter)
  .concat(LogsRouter)
  .concat(PluginRouter)
  .concat(OtherRouter);
