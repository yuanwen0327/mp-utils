'use strict';

function measureText(ctx, text) {
  return ctx.measureText(text.toString());
}

//绘制文本
module.exports.drawTextarea = function (ctx, text, opts) {
  if (!text) text = '';
  var options = {};
  Object.assign(options, {
    x: 0,
    y: 0,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'normal',
    column: false,
    maxWidth: false, // false为不做限制
    color: '#333333',
    textDecoration: false // line-through  underline
  }, opts);

  ctx.font = options.fontWeight + ' ' + options.fontSize + 'px sans-serif';
  ctx.setTextBaseline('middle');
  ctx.setFillStyle(options.color);

  var textArr = text.toString().split('');
  var renderArr = [];
  if (options.maxWidth) {
    var line = '';
    for (var i = 0; i < textArr.length; i++) {
      var word = textArr[i];
      var testLine = line + word;
      var testLineWidth = measureText(ctx, testLine).width;
      if (testLineWidth >= options.maxWidth) {

        if (options.column && renderArr.length + 1 >= options.column) {
          renderArr.push(line.slice(0, -1) + '...');
          break;
        } else {
          renderArr.push(line);
          line = word;
        }
      } else {
        if (i === textArr.length - 1) {
          renderArr.push(testLine);
        } else {
          line = testLine;
        }
      }
    }
  } else {
    renderArr.push(text);
  }


  renderArr.forEach(function (line, index) {
    var startY = options.y + options.fontSize / 2 + (options.lineHeight - options.fontSize) / 2 + options.lineHeight * index;
    ctx.fillText(line, options.x, startY);

    if (options.textDecoration) {
      ctx.beginPath();
      var lineStartX = options.x - 2;
      var lineEndX = options.x + measureText(ctx, line).width + 2;
      ctx.setStrokeStyle(options.color);
      switch (options.textDecoration) {
        case 'line-through':
          ctx.moveTo(lineStartX, startY + 2);
          ctx.lineTo(lineEndX, startY + 2);
          break;
        case 'underline':
          var underlineY = startY + 2 + options.fontSize / 2;
          ctx.moveTo(lineStartX, underlineY);
          ctx.lineTo(lineEndX, underlineY);
          break;
      }
      ctx.closePath();
      ctx.stroke();
    }
  });

  return {
    width: options.maxWidth || measureText(ctx, renderArr[0]).width
  };
};

// 画圆角矩形
module.exports.drawRoundRect = function (ctx, opts) {
  var options = {};
  Object.assign(options, {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: '#333333',
    backgroundColor: '#fff'
  }, opts);

  ctx.beginPath();
  ctx.setLineWidth(options.borderWidth);
  ctx.setStrokeStyle(options.borderColor);
  ctx.setFillStyle(options.backgroundColor);
  ctx.arc(options.x + options.borderRadius, options.y + options.borderRadius, options.borderRadius, Math.PI, Math.PI * 3 / 2);
  ctx.lineTo(options.width - options.borderRadius + options.x, options.y);
  ctx.arc(options.width - options.borderRadius + options.x, options.borderRadius + options.y, options.borderRadius, Math.PI * 3 / 2, Math.PI * 2);
  ctx.lineTo(options.width + options.x, options.height + options.y - options.borderRadius);
  ctx.arc(options.width - options.borderRadius + options.x, options.height - options.borderRadius + options.y, options.borderRadius, 0, Math.PI * 1 / 2);
  ctx.lineTo(options.borderRadius + options.x, options.height + options.y);
  ctx.arc(options.borderRadius + options.x, options.height - options.borderRadius + options.y, options.borderRadius, Math.PI * 1 / 2, Math.PI);
  ctx.closePath();
  if (options.borderWidth) {
    ctx.stroke();
  }
  ctx.fill();
};

// 圆框图片
module.exports.circleImg = function (ctx, img, x, y, d) {
  ctx.save();
  var r = d / 2;
  var cx = x + r;
  var cy = y + r;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(img, x, y, d, d);
  ctx.restore();
};
