module.exports = {
  computed: {
    c: function () {
      return this.data.b + 1;
    }
  },
  onLoad: function () {
    console.log('test2 onload')
  },
}
