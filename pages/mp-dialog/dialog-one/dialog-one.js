var mpPlus = require('../../../packages/mp-plus/mp-plus');

mpPlus.createComponent({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    close: function () {
      this.triggerEvent('close')
    },
    openTwo: function () {
      this.triggerEvent('opentwo')
    }
  }
})
