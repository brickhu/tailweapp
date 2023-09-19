const plugin = require('tailwindcss/plugin')
const { addDynamicIconSelectors } = require('@iconify/tailwind');
const themeMaker = require('./theming/themes-maker')
// const components = require('./components/index.json')
// const base = require('./base/index.json')


const LIGHT = {
  primary: "#5edbd7",
  secondary: "#7f49bc",
  neutral: "#1c222b",
  ink: '#111828',
}

const DARK = {
  primary: "#bff8ff",
  secondary: "#84af03",
  neutral: "#232f3e",
  ink: '#f3f4f6',
}

const appTypeMapping = {
  wx: {
    root: './weapp',
  }
}

// 组件
const brandPlugin = function(options){
  const {variables,appType} = options
  const {root} = appTypeMapping[appType]
  const components = require(`${root}/components/index.json`)
  const base = require(`${root}/base/index.json`)
  return plugin(function ({ addComponents, theme, addBase }) {
    addBase(Object.assign(base,variables))
    addComponents(components)
  })
}




// 导出
module.exports = (options)=>{

  const { themes,appType } = options
  const { colors,variables} = themeMaker({themes:themes||null})
  

  return {
    theme: {
      extend: {
        colors: Object.assign(colors,{
          haha: options.haha,
          dede: {
            100: {
              DEFAULT: '#dddddd',
              on: '#000000',
              bg: '#cccccc'
            }
          }
        }),
        spacing: {
          rpx: '1rpx'
        }
      }
    },
    plugins: [brandPlugin({variables,appType}),addDynamicIconSelectors()]
  }
}

