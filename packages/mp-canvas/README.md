## 概述

微信小程序 canvas 绘图封装方法

## 安装

clone 本项目，将 mp-canvas.js 放到你的小程序项目里。

在小程序中使用 mp-canvas

```js
import { drawTextarea } from "path/to/mp-canvas";

const ctx = wx.createCanvasContext("myCanvas");

drawTextarea(ctx, "测试", {
  x: 270,
  y: 70,
  fontSize: 24,
  lineHeight: 33
});

ctx.draw();
```

## 方法

### drawTextarea(context, text, options)

文本绘制，支持超出`...`，删除线和下划线

#### 用法

```js
import { drawTextarea } from "path/to/mp-canvas";

const ctx = wx.createCanvasContext("myCanvas");

drawTextarea(ctx, "测试", {
  x: 20,
  y: 20,
  textDecoration: "line-through"
});

ctx.draw();
```

#### 参数

- context：canvas 上下文，通过`wx.createCanvasContext`获得
- text：文本内容
- options：配置项，见下表

#### 配置

| 配置名         | 类型           | 默认值  | 描述                                      |
| -------------- | -------------- | ------- | ----------------------------------------- |
| x              | number         | 0       | 文字在画布 x 轴上的位置，px               |
| y              | number         | 0       | 文字在画布 y 轴上的位置，px               |
| fontSize       | number         | 20      | 文字大小，px                              |
| lineHeight     | number         | 20      | 行高，px                                  |
| fontWeight     | String         | normal  | 文字粗细，支持 css 里`font-weight`的配置  |
| color          | string         | #333333 | 文字颜色                                  |
| textDecoration | string/boolean | false   | 文本修饰，支持`line-through`，`underline` |
| maxWidth       | number/boolean | false   | 最大宽度，超过此宽度会换行显示，px        |
| column         | number/boolean | false   | 最大行数，超过此行数会以`...`显示         |

### drawRoundRect(context, options)

绘制圆角矩形

#### 用法

```js
import { drawRoundRect } from "path/to/mp-canvas";

const ctx = wx.createCanvasContext("myCanvas");

drawRoundRect(ctx, {
  x: 310,
  y: 391,
  width: 110,
  height: 40,
  borderRadius: 4,
  borderColor: "#F21A21",
  borderWidth: 2
});

ctx.draw();
```

#### 参数

- context：canvas 上下文，通过`wx.createCanvasContext`获得
- options：配置项，见下表

#### 配置

| 配置名         | 类型           | 默认值  | 描述                                      |
| -------------- | -------------- | ------- | ---------------------------- |
| x              | number         | 0       | 矩形在画布 x 轴上的位置，px               |
| y              | number         | 0       | 矩形在画布 y 轴上的位置，px               |
| width          | number         | 0       | 矩形宽度，px               |
| height         | number         | 0       | 矩形高度，px               |
| borderRadius   | number         | 4       | 矩形圆角，px               |
| borderWidth    | number         | 0       | 边框宽度，px               |
| borderColor    | string         | #333    | 边框颜色              |
| backgroundColor | string         | #fff    | 背景颜色              |

### circleImg(context, imgUrl, x, y, d)
绘制圆框图片

#### 用法

```js
import { circleImg } from "path/to/mp-canvas";

const ctx = wx.createCanvasContext("myCanvas");

circleImg(ctx, localImageUrl, 20, 493, 20)

ctx.draw();
```

#### 参数

- context：canvas 上下文，通过`wx.createCanvasContext`获得
- imgUrl：本地图片地址
- x：圆框图片在x轴上位置，px
- y：圆框图片在y轴上位置，px
- d：圆框图片直径，px
