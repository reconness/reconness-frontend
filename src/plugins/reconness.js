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

    app.config.globalProperties.$validateUrlWithoutProtocol = function (url) {
      const pattern = new RegExp('^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$', 'i')
      return !!pattern.test(url)
    }

    app.config.globalProperties.$validateUrlWithProtocol = function (url) {
      const pattern = new RegExp('^(https?:\\/\\/)' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(url)
    }

    app.config.globalProperties.$validateUrl = function (url) {
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
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

    app.config.globalProperties.$entityStatus = Object.freeze(
      {
        RUNNING: 1,
        FINISHED: 2,
        WAITING: 3,
        FAILED: 4,
        SUCCESS: 5
      }
    )

    app.config.globalProperties.$isOddNumber = function (value) {
      return (value % 2) === 1
    }

    app.config.globalProperties.$getWeekDay = function (value) {
      const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      if (weekday[value]) {
        return weekday[value]
      }
      return weekday[0]
    }

    app.config.globalProperties.$entityTypeData = Object.freeze(
      {
        TARGET: { id: 1, description: 'Target' },
        ROOTDOMAIN: { id: 1, description: 'RootDomain' },
        SUBDOMAIN: { id: 1, description: 'SubDomain' }
      }
    )

    app.config.globalProperties.$compilationResponse = Object.freeze(
      {
        success: { description: 'Compiled successfully' },
        error: { description: 'Failed to compile with errors' }
      }
    )

    app.config.globalProperties.$getEntityTypeById = function (idEntity) {
      switch (idEntity) {
        case 1:
          return this.$entityTypeData.TARGET
        case 2:
          return this.$entityTypeData.ROOTDOMAIN
        case 3:
          return this.$entityTypeData.SUBDOMAIN
        default:
          return null
      }
    }

    app.config.globalProperties.$isObjectEmpty = function (item) {
      return Object.keys(item).length === 0
    }

    app.config.globalProperties.$getEmptyCircularProgressBarColor = function (color) {
      switch (color) {
        case '#03DCED': return '#75e1f1'
        case '#737be5': return '#b1aded'
        case '#F96767': return '#ff959e'
        case '#ff8650': return '#ffbc9d'
        default: return '#abdcc3'
      }
    }

    app.config.globalProperties.$getStringTimeFormat = function (hours, minutes, seconds) {
      let hoursTemp = ''
      let minutesTemp = ''
      let secondsTemp = ''
      if (hours < 10) {
        hoursTemp = '0' + hours
      } else {
        hoursTemp = hours
      }
      if (minutes < 10) {
        minutesTemp = '0' + minutes
      } else {
        minutesTemp = minutes
      }
      if (seconds < 10) {
        secondsTemp = '0' + seconds
      } else {
        secondsTemp = seconds
      }
      return hoursTemp + ':' + minutesTemp + ':' + secondsTemp
    }

    app.config.globalProperties.$defaultPipelineName = function () {
      return 'My pipeline'
    }

    app.config.globalProperties.$getGravatarUrlByEmail = function (hashedEmail) {
      return 'https://www.gravatar.com/avatar/' + hashedEmail
    }

    app.config.globalProperties.$isItemOnList = function (idItem, listItems) {
      setTimeout(
        function () {
          return listItems.find(item => item.id === idItem)
        },
        1000
      )
    }

    app.config.globalProperties.$message = Object.freeze(
      {
        errorSummary: 'Error',
        successSumary: 'Success',
        errorMessageForAllPurpose: 'An error occured during the removal process',
        successMessageForTargetDeletion: 'The target has been deleted successfully',
        successMessageForSubDomainDeletion: 'The subdomain has been deleted successfully',
        successMessageForRootDomainDeletion: 'The rootdomain has been deleted successfully',
        successMessageForRootDomainInsertion: 'The rootdomains has been inserted successfully',
        successMessageForTargetInsertion: 'The target has been inserted successfully',
        successMessageForTargetEdition: 'The target has been edited successfully'
      }
    )

    app.config.globalProperties.$convertSpacesToHyphensByString = function (text) {
      return text.trim().replace(/\s+/g, '-')
    }
  }
}
