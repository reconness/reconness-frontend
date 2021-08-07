const ProgressBarMixin = {
  data: function () {
    return {
      progressValue: 0,
      time: '00:00:00',
      now: 0,
      timer: null,
      hours: 0,
      mins: 0,
      secs: 0
    }
  },
  methods: {
    tick () {
      this.now++
      let remain = this.now
      this.hours = Math.floor(remain / 3600)
      this.mins = Math.floor(remain / 60)
      remain -= this.mins * 60
      this.secs = remain
      this.time = this.$getStringTimeFormat(this.hours, this.mins, this.secs)
      this.executeProgressBar()
    },
    playClock () {
      if (!this.timer) {
        this.timer = setInterval(this.tick, 1000)
      }
    },
    stopClock () {
      clearInterval(this.timer)
      this.now = -1
      this.progressValue = 0
      this.timer = null
    },
    executeProgressBar () {
      if (this.progressValue <= 100) {
        this.progressValue += 5
      } else {
        this.progressValue = 0
      }
    }
  }
}
export { ProgressBarMixin }
