'use strict';

/**
 * 为mp添加增强功能
 *  - computed watch
 *  - 将page级的方法收到methods里
 *  - page和component支持mixin
 *  x 在组件里使用当前page的事件函数
 */
var noop = function noop() {};
var isFunction = function (v) {
  return typeof v === 'function'
};
var PAGE_EVENT = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onPageScroll', 'onTabItemTap'];
var COMPONENT_EVENT = ['created', 'attached', 'ready', 'moved', 'detached']

module.exports.createPage = function (mpOptions) {
  // 将事件函数转换成队列
  eventMethodToQueue(mpOptions, PAGE_EVENT)
  supportMixins(mpOptions, 'page');
  bindWatch(mpOptions, 'page');
  expandMethods(mpOptions);
  eventQueueToMethod(mpOptions, PAGE_EVENT)
  Page(mpOptions);
};
module.exports.createComponent = function (mpOptions) {
  eventMethodToQueue(mpOptions, COMPONENT_EVENT)
  supportMixins(mpOptions, 'component');
  bindWatch(mpOptions, 'component');
  eventQueueToMethod(mpOptions, COMPONENT_EVENT)
  Component(mpOptions);
};

function eventMethodToQueue(obj, events) {
  obj = obj || {}
  events.forEach(function (event) {
    var queue = []
    var func = obj[event]
    if (func) {
      queue.push(func)
    }
    obj[event] = queue
  })
}

function eventQueueToMethod(obj, events) {
  events.forEach(function (event) {
    var queue = obj[event]
    if (queue.length) {
      obj[event] = function () {
        return function () {
          var vm = this;
          compose(queue.map(function (f) {
            return f.bind(vm);
          })).apply(undefined, arguments);
        };
      }();
    } else {
      delete obj[event]
    }
  })
}


function expandMethods(mpOptions) {
  Object.assign(mpOptions, mpOptions.methods);
  delete mpOptions.methods;
}

function bindWatch(mpOptions, type) {
  var lifecycles = {
    page: 'onLoad',
    component: 'attached'
  };
  var queue = mpOptions[lifecycles[type]];

  if (mpOptions.computed) {
    Object.keys(mpOptions.computed).forEach(function (x) {
      mpOptions.data[x] = null;
    });
    queue.unshift(function () {
      computed(this, mpOptions.computed);
    });
  }
  if (mpOptions.watch) {
    queue.unshift(function () {
      watch(this, mpOptions.watch);
    });
  }

  function watch(ctx, obj) {
    Object.keys(obj).forEach(function (key) {
      defineReactive(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value);
      });
    });
  }

  function computed(ctx, obj) {
    var keys = Object.keys(obj);
    var dataKeys = Object.keys(ctx.data);
    dataKeys.forEach(function (dataKey) {
      defineReactive(ctx.data, dataKey, ctx.data[dataKey]);
    });

    var firstComputedObj = keys.reduce(function (prev, next) {
      ctx.data.$target = function () {
        var data = {};
        data[next] = obj[next].call(ctx);
        ctx.setData(data);
      };
      prev[next] = obj[next].call(ctx);
      ctx.data.$target = null;
      return prev;
    }, {});
    ctx.setData(firstComputedObj);
  }

  function defineReactive(data, key, val, fn) {
    var subs = data['$' + key] || [];
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function get() {
        if (data.$target) {
          subs.push(data.$target);
          data['$' + key] = subs;
        }
        return val;
      },
      set: function set(newVal) {
        if (newVal === val) return;
        fn && fn(newVal);
        if (subs.length) {
          // 用 setTimeout 因为此时 this.data 还没更新
          setTimeout(function () {
            subs.forEach(function (sub) {
              sub();
            });
          }, 0);
        }
        val = newVal;
      }
    });
  }
}


function supportMixins(mpOptions, type) {
  if (!mpOptions.mixins) return
  mpOptions.mixins.forEach(function (mixin) {
    // 合并data computed watch methods
    var options = ['properties', 'data', 'computed', 'watch', 'methods']
    options.forEach(function (attribute) {
      if (mpOptions[attribute] && mixin[attribute]) {
        Object.assign(mpOptions[attribute], mixin[attribute])
      }
    })
  })
  // 遵循vue mixins 执行逻辑
  mpOptions.mixins.reverse().forEach(function (mixin) {
    if (type === 'page') {
      addToEventQueue(PAGE_EVENT, mixin)
    } else {
      addToEventQueue(COMPONENT_EVENT, mixin)
    }
  })

  function addToEventQueue(events, mixin) {
    events.forEach(function (event) {
      if (mixin[event]) {
        mpOptions[event].push(mixin[event])
      }
    })
  }
}




function compose(funcs) {
  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return function () {
    var args = arguments;
    funcs.reverse().forEach(function (f) {
      f.apply(undefined, args);
    });
  };
}
