var mpPlus = require('../../../../packages/mp-plus/mp-plus');
var testMixin = require('../../../../mixins/test.mixin')
mpPlus.createComponent({
  mixins: [testMixin],
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
      console.log(n);
    }
  },
  methods: {
    add: function () {
      this.setData({
        a: this.data.a + 1
      });
    }
  },
  attached: function () {
    console.log('child attached')
    console.log(this)
  }
});
