/*
 * @Author: Sun Rising
 * @Date: 2018-12-08 13:00:30
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 13:21:46
 */
/**
 * 编写理由：因使用tabs来实现路由分页显示并保存路由页面的状态，使用vue官方提供的<keep-alive>来实现，但是该组件的
 * 属性要求传入的是页面的name属性，但是这个 name 在 vue 页面中并不是必须存在的并且name不能重复，为此重写了<keep-alive>属性以key缓存组件，
 * key(手动生成的，组件外自己维护是否重复)，目前 key 的生成方式为路由对象 name + path 的MD5算法；
 * 适用场景：tabs路由分页
 * 备注：不用在 vue 页面写 name 属性了。。。！
 */
////////////////////////////
import { getRouterUniqueKey } from "@/lib/util";

function isDef(v) {
  return v !== undefined && v !== null;
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

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
////////////////////////////

///////////////////////////////////
const _toString = Object.prototype.toString;

function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/////////////////////////////////////

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === "string") {
    return pattern.split(",").indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance;
  for (const key in cache) {
    const cachedNode = cache[key];
    if (cachedNode) {
      const name = cachedNode.data.routeKey;
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  const cached = cache[key];
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

const patternTypes = [String, RegExp, Array];

export default {
  name: "keep-views",
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    this.$watch("include", val => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch("exclude", val => {
      pruneCache(this, name => !matches(val, name));
    });
  },

  render() {
    //获取元素内的对象数组
    const slot = this.$slots.default;
    //获取数组中符合要求的组件
    const vnode = getFirstComponentChild(slot);
    //获取组件配置
    const componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // 获取路由的唯一标识[MD5( router.name + router.path )]
      const routeKey = getRouterUniqueKey(this.$route);
      const { include, exclude } = this;
      if (
        // 如果不在 include 内或者在排除的 exclude 内
        (include && (!routeKey || !matches(include, routeKey))) ||
        (exclude && routeKey && matches(exclude, routeKey))
      ) {
        return vnode;
      }

      /**
       * this.cache = Object.create(null);
       * this.keys = [];
       */
      const { cache, keys } = this;

      if (cache[routeKey]) {
        vnode.componentInstance = cache[routeKey].componentInstance;
        //修复路由热刷新时导致的组件找不到的问题，官方没有该语句，该语句可能会导致问题。
        vnode.tag = cache[routeKey].tag;
        remove(keys, routeKey);
        keys.push(routeKey);
      } else {
        cache[routeKey] = vnode;
        keys.push(routeKey);
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
      vnode.data.routeKey = routeKey;
    }
    return vnode || (slot && slot[0]);
  }
};
