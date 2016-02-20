import template from 'babel-template'

const globalGetter = template(`
  ((function () {
    return this
  })())
`)

export const dependencies = [[
  'request-global-object',
  function requestGlobalObject () {
    return {
      priority: 80,
      globalVariable: ['globalObj'],
      visitor: {
        Program (path, getState) {
          const [globalObj] = getState('globalVariable')
          globalObj.assign = globalGetter().expression
        },
      },
    }
  },
]]
