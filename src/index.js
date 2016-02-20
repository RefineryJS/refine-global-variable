export default function plugin ({types: t}) {
  return {
    priority: 90,
    visitor: {
      Program: {
        enter (path, getState, mutateState) {
          const {scope} = path
          mutateState('globalVariable', state => {
            if (typeof state === 'number') {
              state = Array(Math.floor(state)).fill('global')
            } else if (!Array.isArray(state)) {
              state = [state]
            }

            return state.map(name => {
              const uid = scope.generateUid(name)
              return {
                assign: t.nullLiteral(),
                identifier () {
                  return t.identifier(uid)
                },
              }
            })
          })
        },
        exit (path, getState, mutateState) {
          const variables = []
          mutateState('globalVariable', state => {
            for (let el of state) {
              variables.push(t.variableDeclarator(el.identifier(), el.assign))
            }
            return state
          })
          path.node.body.unshift(t.variableDeclaration('let', variables))
        },
      },
    },
  }
}
