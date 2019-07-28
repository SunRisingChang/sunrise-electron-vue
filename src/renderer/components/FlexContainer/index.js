/**
 * @Author: Sun Rising
 * @Date: 2019-05-30 20:16:51
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-06-02 12:11:12
 * @Description: Flex布局容器
 */
import XEUtils from "xe-utils";

export default {
  name: "FlexContainer",
  componentName: "FlexContainer",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    width: {
      type: String | Number,
      default: "100%"
    },
    height: {
      type: String | Number,
      default: "auto"
    },
    direction: {
      type: String,
      default: "row"
    },
    wrap: {
      type: String,
      default: "wrap"
    },
    justifyContent: {
      type: String,
      default: "flex-start"
    },
    alignItems: {
      type: String,
      default: "stretch"
    },
    alignContent: {
      type: String,
      default: "stretch"
    },
    grow: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      let widthAttr = XEUtils.isNumber(this.width)
        ? this.width + "px"
        : this.width;
      let heightAttr = XEUtils.isNumber(this.height)
        ? this.height + "px"
        : this.height;
      return {
        display: "flex",
        width: widthAttr,
        height: heightAttr,
        flexDirection: this.direction,
        flexWrap: this.wrap,
        justifyContent: this.justifyContent,
        alignItems: this.alignItems,
        alignContent: this.alignContent,
        flexGrow: this.grow
      };
    }
  },
  render(h) {
    return h(this.tag, { style: this.style }, this.$slots.default);
  }
};
