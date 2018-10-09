'use strict';

var mpPlus = require('../../packages/mp-plus/mp-plus');
var mpCanvas = require('../../packages/mp-canvas/mp-canvas')

mpPlus.createPage({
  data: {},
  methods: {
    renderCanvas: function () {
      var ctx = wx.createCanvasContext('myCanvas', this)
      ctx.setFillStyle('#ffffff')
      ctx.fillRect(0, 0, 520, 760)

      ctx.setLineWidth(2)
      ctx.setStrokeStyle('#E3B4B6')
      ctx.strokeRect(15, 15, 490, 730)
      ctx.strokeRect(20, 20, 480, 720)

      ctx.drawImage('/assets/images/logo.png', 170, 75, 78, 24)

      ctx.setStrokeStyle('#dddddd')
      ctx.moveTo(259, 70)
      ctx.lineTo(259, 103)
      ctx.stroke()

      mpCanvas.drawTextarea(
        ctx,
        '邀请拼团', {
          x: 270,
          y: 70,
          fontSize: 24,
          lineHeight: 33
        }
      )

      mpCanvas.drawTextarea(
        ctx,
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit tempora, quis doloremque iste quasi eligendi atque nam, temporibus aut aliquam libero. Id iure laudantium delectus. Id porro aspernatur blanditiis iusto.', {
          x: 50,
          y: 133,
          maxWidth: 420,
          fontSize: 28,
          color: '#333333',
          lineHeight: 40,
          fontWeight: 'bold',
          column: 2
        }
      )

      ctx.drawImage('/assets/images/goods.jpg', 50, 233, 240, 240)

      mpCanvas.drawTextarea(
        ctx,
        '仅剩', {
          x: 310,
          y: 263,
          fontSize: 28,
          color: '#333333',
          lineHeight: 40,
        }
      )
      var numInfo = mpCanvas.drawTextarea(
        ctx,
        '4', {
          x: 367,
          y: 263,
          fontSize: 28,
          color: '#F21A21',
          lineHeight: 40,
        }
      )
      console.log('数字宽度：' + numInfo.width + '=============')
      mpCanvas.drawTextarea(
        ctx,
        '个名额', {
          x: 367 + numInfo.width,
          y: 263,
          fontSize: 28,
          color: '#333333',
          lineHeight: 40,
        }
      )


      mpCanvas.drawTextarea(
        ctx,
        '￥' + (10 / 100).toFixed(2), {
          x: 310,
          y: 313,
          fontSize: 32,
          color: '#F21A21',
          lineHeight: 45,
          fontWeight: 'bold',
        }
      )

      mpCanvas.drawRoundRect(
        ctx, {
          x: 310,
          y: 388,
          width: 110,
          height: 40,
          borderRadios: 4,
          borderColor: '#F21A21',
          borderWidth: 2
        }
      )
      mpCanvas.drawTextarea(
        ctx,
        '限时抢购', {
          x: 321,
          y: 393,
          fontSize: 22,
          color: '#F21A21',
          lineHeight: 30
        }
      )

      var picWidth = 50
      var picSpacing = 15
      var renderCollages = ['/assets/images/user.png']
      renderCollages = renderCollages.concat(new Array(4).fill(null))
      var totalNum = renderCollages.length
      var TotalWidth = (picWidth + picSpacing) * totalNum - picSpacing
      var startX = (520 - TotalWidth) / 2
      renderCollages.forEach((item, index) => {
        var X = startX + (picWidth + picSpacing) * index
        if (item) {
          mpCanvas.circleImg(ctx, item, X, 493, picWidth)
          ctx.beginPath();
          ctx.setLineWidth(2)
          var r = picWidth / 2
          ctx.arc(X + r, 493 + r, r, 0, 2 * Math.PI)
          ctx.strokeStyle = "#F21A21"
          ctx.stroke()
          mpCanvas.drawRoundRect(
            ctx, {
              x: X + r - 38 / 2,
              y: 532,
              width: 38,
              height: 16,
              borderRadios: 8,
              backgroundColor: '#F21A21'
            }
          )
          mpCanvas.drawTextarea(
            ctx,
            '拼主', {
              x: X + r - 24 / 2,
              y: 532,
              fontSize: 11,
              color: '#ffffff',
              lineHeight: 16
            }
          )
        } else {
          ctx.drawImage('/assets/images/icon_nobody.png', X, 493, picWidth, picWidth)
        }
      });



      ctx.drawImage('/assets/images/code.png', 155, 599, 120, 120)

      mpCanvas.drawTextarea(
        ctx,
        '长按扫码加入拼团', {
          x: 295,
          y: 626,
          maxWidth: 88,
          fontSize: 20,
          color: '#E3B4B6',
          lineHeight: 28,
        }
      )

      ctx.draw()
    }
  },
  onLoad: function (query) {
    this.renderCanvas()
  }
});
