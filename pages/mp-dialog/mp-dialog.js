'use strict';

var mpPlus = require('../../packages/mp-plus/mp-plus')
var dialogMixin = require('../../packages/mp-dialog/mp-dialog')
mpPlus.createPage({
  mixins: [dialogMixin],
  data: {
    isDialogOneShow: false,
    isDialogTwoShow: false,
  },
  methods: {
    openOne: function () {
      this.openDialog('isDialogOneShow')
    },
    openTwo: function () {
      this.openDialog('isDialogTwoShow')
    },
    closeOne: function () {
      this.closeDialog('isDialogOneShow')
    },
    closeTwo: function () {
      this.closeDialog('isDialogTwoShow')
    }
  },
  onLoad: function (query) {}
});
