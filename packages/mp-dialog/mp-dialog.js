module.exports = {
  data: {
    $$showDialog: '',
    $$top: 0,
    $$nowTop: 0,
    scrollFix: false
  },
  methods: {
    openDialog: function (dialog, cb) {
      let obj = {}
      if (this.data.$$showDialog) {
        obj[this.data.$$showDialog] = false
      } else {
        this.data.$$top = this.data.$$nowTop
      }
      this.data.$$showDialog = dialog
      obj[dialog] = true
      obj.scrollFix = true


      this.setData(obj, () => {
        cb && cb
      })
    },
    closeDialog(dialog, cb) {
      let obj = {}
      this.data.$$showDialog = ''
      obj[dialog] = false
      obj.scrollFix = false

      this.setData(obj, () => {
        wx.pageScrollTo({
          scrollTop: this.data.$$top,
          duration: 0
        })
        cb && cb()
      })

    }
  },
  onPageScroll(e) {
    this.data.$$nowTop = e.scrollTop
  }
}
