## 概述

微信小程序页面、组件增强方法。提供 computed，watch，mixins 等功能。

## 安装

clone 项目，将`mp-plus.js`放到你的小程序项目里。使用 mp-plus 提供的 api 代替原生页面、组件注册方法。

注册 Page

```js
import { createPage } from "path/to/mp-plus";

createPage({
  // ...
});
```

注册 Component

```js
import { createComponent } from "path/to/mp-plus";

createComponent({
  // ...
});
```

## 特性

### 计算属性和侦听器

仿照`vue`的风格实现的`computed`和`watch`

#### 示例

```js
import { createPage } from "path/to/mp-plus";

createPage({
  data: {
    a: 1
  },
  computed: {
    b() {
      return this.data.a + 1;
    }
  },
  watch: {
    b(n) {
      console.log(n);
    }
  }
});
```

### 方法合并

小程序原生`Page`的方法放在配置项的根层级下，和页面事件方法混在一起难以阅读。`mp-plus`仿照`vue`的风格将方法全部收集到了`methods`字段里。

#### 示例

```js
import { createPage } from "path/to/mp-plus";

createPage({
  data: {
    a: 1
  },
  methods: {
    test() {
      console.log("hehe");
    }
  }
});
```

### 混入 `mixin`

参考`vue`的`mixin`机制，在`Page`和`Component`之间实现复用的方式。

> 为什么不使用`Component`原生的`behaviors`？`behaviors`只能给组件使用，且不能复用自定义的`computed`和`watch`。

#### 示例

```js
// myMixin.js
export default {
  data: {
    a: 1
  },
  computed: {
    b() {
      return this.data.a + 1;
    }
  }
};

// index.js
import { createPage } from "path/to/mp-plus";
import myMixin from "./myMixin.js";
createPage({
  mixins: [myMixin]
});

// componentA.js
import { createComponent } from "path/to/mp-plus";
import myMixin from "./myMixin.js";
createComponent({
  mixins: [myMixin]
});
```
