'use strict';

var mpPlus = require('../../packages/mp-plus/mp-plus');
var testMixin = require('../../mixins/test.mixin')
var test2Mixin = require('../../mixins/test2.mixin')

mpPlus.createPage({
  mixins: [testMixin, test2Mixin],
  data: {
    a: 1
  },
  computed: {
    b: function () {
      return this.data.a + 1;
    }
  },
  watch: {
    a: function (n) {
      console.log('watch a:', n);
    },
    b: function (n) {
      console.log('watch b:', n);
    }
  },
  methods: {
    add: function () {
      this.setData({
        a: this.data.a + 1
      });
    }
  },
  onLoad: function (query) {
    console.log('page onload');
    console.log(this, query)
  }
});
