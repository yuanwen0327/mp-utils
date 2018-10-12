'use strict';

module.exports = {
  data: {
    $$showDialog: '',
    $$top: 0,
    $$nowTop: 0,
    scrollFix: false
  },
  methods: {
    openDialog: function (dialog, cb) {
      var obj = {};
      if (this.data.$$showDialog) {
        obj[this.data.$$showDialog] = false;
      } else {
        this.data.$$top = this.data.$$nowTop;
      }
      this.data.$$showDialog = dialog;
      obj[dialog] = true;
      obj.scrollFix = true;

      this.setData(obj, function () {
        cb && cb;
      });
    },
    closeDialog: function (dialog, cb) {
      var _this = this;

      var obj = {};
      this.data.$$showDialog = '';
      obj[dialog] = false;
      obj.scrollFix = false;

      this.setData(obj, function () {
        wx.pageScrollTo({
          scrollTop: _this.data.$$top,
          duration: 0
        });
        cb && cb();
      });
    }
  },
  onPageScroll: function (e) {
    this.data.$$nowTop = e.scrollTop;
  }
};
