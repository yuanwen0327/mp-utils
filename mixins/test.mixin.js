module.exports = {
  data: {
    testBehavior: false
  },
  methods: {
    initTestBehavior: function () {
      this.setData({
        testBehavior: true
      })
    }
  },
  attached: function () {
    this.initTestBehavior()
  },
  onLoad: function () {
    console.log('test1 onload')
    this.initTestBehavior()
  },
}
