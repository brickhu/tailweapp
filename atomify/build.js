const fs = require('fs')
const { resolve } = require('path')
const postcss = require('postcss')
const postcssJs = require('postcss-js')
const tailwindcss = require('tailwindcss')
const atImport = require("postcss-import")

const tansCssToJSON = function (arr) {
  for (const { dir,input, output } of arr) {
    const file = fs.readFileSync(resolve(dir, input), 'utf8')
    postcss([atImport({path: [dir]}),tailwindcss])
      .process(file, { from: input })
      .then(({ css, map }) => {
        const cssJs = postcssJs.objectify(postcss.parse(css))
        fs.writeFile(resolve(dir, output), JSON.stringify(cssJs), () => true)
        console.log(`√ - ${input} > ${output}`)
      })
  }
}

tansCssToJSON([
  {
    dir: resolve(__dirname,'components'),
    input: 'index.css',
    output: 'index.json',
  },
])

tansCssToJSON([
  {
    dir: resolve(__dirname,'base'),
    input: 'index.css',
    output: 'index.json',
  },
])


