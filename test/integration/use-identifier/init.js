export const dependencies = [[
  'transform-magic',
  function tranformMagic ({types: t}) {
    return {
      priority: 80,
      globalVariable: ['someBlackMagic'],
      visitor: {
        Program (path, getState) {
          const [blackMagic] = getState('globalVariable')
          blackMagic.assign = t.numericLiteral(42)
        },
        Identifier (path, getState) {
          const {node: {name}} = path
          const [blackMagic] = getState('globalVariable')

          if (name === 'MAGIC') {
            path.replaceWith(blackMagic.identifier())
          }
        },
      },
    }
  },
]]
