export default {
  install: (app, options) => {
    app.config.globalProperties.$randomBooleanResult = function () {
      const success = Math.random() < 0.5
      return success
    }

    app.config.globalProperties.$compareNamesDesc = function (a, b) {
      if (b.name < a.name) {
        return -1
      }
      if (b.name > a.name) {
        return 1
      }
      return 0
    }

    app.config.globalProperties.$compareNamesAsc = function (a, b) {
      if (b.name > a.name) {
        return -1
      }
      if (b.name < a.name) {
        return 1
      }
      return 0
    }

    app.config.globalProperties.$orderByCalendarSplitting = function (a, b) {
      const as = a.date.split('/')
      const ad = new Date(as[2], as[1] - 1, as[0])
      const bs = b.date.split('/')
      const bd = new Date(bs[2], bs[1] - 1, bs[0])
      return ad - bd
    }

    app.config.globalProperties.$orderByCalendar = function (a, b) {
      if (a.date < b.date) {
        return -1
      }
      if (a.date > b.date) {
        return 1
      }
      return 0
    }

    app.config.globalProperties.$validateUrl = function (url) {
      const pattern = new RegExp('^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(url)
    }

    app.config.globalProperties.$validateIsBlank = function (value) {
      if (value.match(/^ *$/) !== null) {
        return true
      }
      return false
    }

    app.config.globalProperties.$agentType = Object.freeze(
      {
        TARGET: 1,
        ROOTDOMAIN: 2,
        SUBDOMAIN: 3
      }
    )

    app.config.globalProperties.$agentStatus = Object.freeze(
      {
        RUNNING: 1,
        PAUSED: 2,
        FINISHED: 3
      }
    )
  }
}
