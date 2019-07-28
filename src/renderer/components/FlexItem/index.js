/**
 * @Author: Sun Rising
 * @Date: 2019-05-30 20:33:12
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-06-12 12:29:40
 * @Description:Flex布局辅助组件
 */
import XEUtils from "xe-utils";

export default {
  name: "FlexItem",
  componentName: "FlexItem",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    width: {
      type: String | Number,
      default: "auto"
    },
    height: {
      type: String | Number,
      default: "auto"
    },
    order: {
      type: Number,
      default: 0
    },
    grow: {
      type: Number,
      default: 0
    },
    shrink: {
      type: Number,
      default: 0
    },
    basis: {
      type: String | Number,
      default: "auto"
    },
    alignSelf: {
      type: String,
      default: "auto"
    },
    justifyContent: {
      type: String,
      default: "flex-start"
    },
    alignItems: {
      type: String,
      default: "stretch"
    },
    direction: {
      type: String,
      default: "row"
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
      let basisAttr = XEUtils.isNumber(this.basis)
        ? this.basis + "px"
        : this.basis;
      return {
        display: "flex",
        width: widthAttr,
        height: heightAttr,
        order: this.order,
        flexDirection: this.direction,
        flexGrow: this.grow,
        flexShrink: this.shrink,
        flexBasis: basisAttr,
        alignSelf: this.alignSelf,
        justifyContent: this.justifyContent,
        alignItems: this.alignItems
      };
    }
  },
  render(h) {
    return h(this.tag, { style: this.style }, this.$slots.default);
  }
};
