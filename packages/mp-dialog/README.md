## 概述

微信小程序弹窗管理工具。快速解决滚动穿透和嵌套弹窗的问题。

## 原理
打开一个弹窗时会记录当前page的`scrollTop`，并写入`scroll-fix`解决滚动穿透。当打开一个新的弹窗时会关掉其它正在显示的弹窗。关闭弹窗后会将page的`scrollTop`恢复为第一个弹窗打开时记录的值并移除`scroll-fix`。

## 预览

## 安装

> 本工具依赖 mp-plus，使用前请先安装[mp-plus](https://github.com/vuejs/vue-router)。

clone 项目，将`mp-dialog.js`放到你的小程序项目里。

全局写入样式

```scss
.scroll-fix {
  height: 100%;
  overflow: hidden;
}
```

加入 page 样式

```scss
page {
  height: 100%; //这是解决滚动穿透的关键
}
```

在 page 中注册 mp-dialog

```js
import { createPage } from "path/to/mp-plus";
import mpDialog from "path/to/mp-dialog";

createPage({
  mixins: [mpDialog]
});
```

在 wxml 的根元素上加入判断逻辑

```html
<view class="{{scrollFix?'scroll-fix':''}}">
</view>
```

## 使用

新建一个 Dialog 组件，使用`isDialogShow`控制 Dialog 的显隐

```html
<Dialog show="{{isDialogShow}}"></Dialog>
```

```js
// ...

createPage({
  mixins: [mpDialog],
  data: {
    isDialogShow: false
  },
  methods: {
    open() {
      // 打开Dialog
      this.openDialog("isDialogShow", () => {
        // do something...
      });
    },
    close() {
      // 关闭Dialog
      this.closeDialog("isDialogShow", () => {
        // do something...
      });
    }
  }
});
```
