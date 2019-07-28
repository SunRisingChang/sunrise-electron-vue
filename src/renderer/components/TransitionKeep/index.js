/**
 * @Author: Sun Rising
 * @Date: 2019-07-12 12:56:43
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 12:59:03
 * @Description: 重写该组件的placeholder方法，解决在其下使用keep-views时，keep-views会销毁导致缓存路由丢失的问题
 */

import VNode from "./vnode";
import { remove, isDef, isUndef, isTrue } from "./util.js";

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

function createFnInvoker(fns) {
  function invoker() {
    const fns = invoker.fns;
    if (Array.isArray(fns)) {
      const cloned = fns.slice();
      for (let i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  let invoker;
  const oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    // $flow-disable-line
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}

function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const camelizeRE = /-(\w)/g;
const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

export const transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  const compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

export function extractTransitionData(comp) {
  const data = {};
  const options = comp.$options;
  // props
  for (const key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  const listeners = options._parentListeners;
  for (const key in listeners) {
    data[camelize(key)] = listeners[key];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h("keep-alive", {
      props: rawChild.componentOptions.propsData
    });
  }
  if (/\d-keep-views$/.test(rawChild.tag)) {
    return h("keep-views", {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

export default {
  name: "transition",
  props: transitionProps,
  abstract: true,

  render(h) {
    let children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(c => c.tag || isAsyncPlaceholder(c));
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== "production" && children.length > 1) {
      let warn =
        "<transition> can only be used on a single element. Use " +
        "<transition-group> for lists.";
      console.error(`[Vue warn]: ${warn}`);
    }

    const mode = this.mode;

    // warn invalid mode
    if (
      process.env.NODE_ENV !== "production" &&
      mode &&
      mode !== "in-out" &&
      mode !== "out-in"
    ) {
      let warn = "invalid <transition> mode: " + mode;
      console.error(`[Vue warn]: ${warn}`);
    }

    const rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    const child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    const id = `__transition-${this._uid}-`;
    child.key =
      child.key == null
        ? child.isComment
          ? id + "comment"
          : id + child.tag
        : isPrimitive(child.key)
        ? String(child.key).indexOf(id) === 0
          ? child.key
          : id + child.key
        : child.key;

    const data = ((
      child.data || (child.data = {})
    ).transition = extractTransitionData(this));
    const oldRawChild = this._vnode;
    const oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (
      child.data.directives &&
      child.data.directives.some(d => d.name === "show")
    ) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(
        oldChild.componentInstance &&
        oldChild.componentInstance._vnode.isComment
      )
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      const oldData = (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === "out-in") {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, "afterLeave", () => {
          this._leaving = false;
          this.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === "in-out") {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        let delayedLeave;
        const performLeave = () => {
          delayedLeave();
        };
        mergeVNodeHook(data, "afterEnter", performLeave);
        mergeVNodeHook(data, "enterCancelled", performLeave);
        mergeVNodeHook(oldData, "delayLeave", leave => {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
