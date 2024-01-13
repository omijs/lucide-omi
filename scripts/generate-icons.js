const fs = require('fs')
const path = require('path')
const { JSDOM } = require("jsdom")

const folderPath = 'dist'
if (!fs.existsSync(folderPath)) {
  // 文件夹不存在，创建文件夹
  fs.mkdirSync(folderPath)
}

const svgDir = 'icons'
const iconDir = 'dist/icons'
const indexFile = 'dist/index.js'
const iconIndexFile = 'dist/icons/index.js'

fs.writeFileSync('dist/createLucideIcon.js', fs.readFileSync('src/createLucideIcon.js', 'utf8'), 'utf8')
fs.writeFileSync('dist/defaultAttributes.js', fs.readFileSync('src/defaultAttributes.js', 'utf8'), 'utf8')


const jsonData = fs.readFileSync('package.json', 'utf8')
fs.writeFileSync('dist/package.json', jsonData, 'utf8')

const readmeData = fs.readFileSync('README.md', 'utf8')
fs.writeFileSync('dist/README.md', readmeData, 'utf8')

// 读取 SVG 目录
fs.readdir(svgDir, (err, files) => {
  if (err) {
    console.error('Error reading SVG directory:', err)
    return
  }

  let exports = ''
  let iconExports = ''

  // 遍历 SVG 文件
  files.forEach((file) => {
    if (path.extname(file) === '.svg') {
      const iconName = path.basename(file, '.svg')
      exports += `export { default as ${removeDashAndCapitalize(iconName)}, default as ${removeDashAndCapitalize(iconName)}Icon, default as Lucide${removeDashAndCapitalize(iconName)} } from './icons/${iconName}.js'\n`
      iconExports += `export { default as ${removeDashAndCapitalize(iconName)} } from './${iconName}.js'\n`
    }
  })

  // 将所有 SVG 内容写入 index.ts 文件
  fs.writeFileSync(indexFile,
    `import * as index from './icons/index.js';
export { index as icons };
    
${exports}

export { default as createLucideIcon } from './createLucideIcon.js';
`
  )

  fs.writeFileSync(iconIndexFile, iconExports)
})

// 确保 icons 目录存在
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir)
}

// 读取 SVG 目录
fs.readdir(svgDir, (err, files) => {
  if (err) {
    console.error('Error reading SVG directory:', err)
    return
  }

  let html = ''

  // 遍历 SVG 文件
  files.forEach((file) => {
    if (path.extname(file) === '.svg') {
      const iconName = path.basename(file, '.svg')
      const iconPath = path.join(iconDir, `${iconName}.js`)

      // 读取 SVG 文件内容
      const svgContent = fs.readFileSync(path.join(svgDir, file), 'utf-8')

      // 创建 Omi icon 元素
      const iconComponent = `import createLucideIcon from '../createLucideIcon.js';
 
const ${removeDashAndCapitalize(iconName)} = createLucideIcon("${removeDashAndCapitalize(iconName)}", ${svgToArray(svgContent)});

export { ${removeDashAndCapitalize(iconName)} as default };
`
      // 将 Omi icon 元素写入文件
      fs.writeFileSync(iconPath, iconComponent)

      html += `
<li class="t-icons-view__wrapper">
  ${svgContent}
  <div class="t-icons-view__name">${iconName}</div>
  <div class="t-icons-view__actions"><svg width="1em" height="1em"
      style="font-size: 20px; color: var(--text-secondary);">
      <use href="#t-icon-file-copy"></use>
    </svg>
    <div class="t-icons-view__actions-divider"></div><svg width="1em" height="1em"
      style="font-size: 20px; color: var(--text-secondary);">
      <use href="#t-icon-file-icon"></use>
    </svg>
  </div>
</li>`
    }
  })

  fs.writeFileSync('index.html', html)
})



function removeDashAndCapitalize(str) {
  const words = str.split('-')
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase()
    const restOfWord = word.slice(1)
    return firstLetter + restOfWord
  })
  return capitalizedWords.join('')
}


function svgToArray(svgString) {
  const dom = new JSDOM(svgString)
  const svgDoc = dom.window.document.querySelector("svg")
  const elements = svgDoc.querySelectorAll("*")
  const result = []

  elements.forEach((element) => {
    const tagName = element.tagName
    const attributes = {}

    for (const attr of element.attributes) {
      attributes[attr.name] = attr.value
    }

    result.push([tagName, attributes])
  })
  return JSON.stringify(result)
}
