import path from 'node:path'
const dirname = import.meta.dirname as string
const filename = import.meta.filename as string

import getTree from './get-tree.ts'

Deno.mkdirSync(path.resolve(dirname, '../dist/fonts'), { recursive: true })

const Tree = getTree()

const Info = JSON.parse(
  Deno.readTextFileSync(path.resolve(dirname, './info.json'))
)

for (const font of Tree) {
  if (Info?.[font.id]) {
    font.name = Info[font.id].name
    font.description = Info[font.id].description
  } else {
    Info[font.id] = {
      name: {
        zh: '',
        en: '',
        ja: ''
      },
      description: {
        zh: '',
        en: '',
        ja: ''
      }
    }
  }
}

let css = ''

for (const font of Tree) {
  for (const file of font.files) {
    if (file.type === 'woff2' && file.variant === 'Regular') {
      css += `
@font-face {
  font-family: '${font.id}';
  src: url('./fonts/${file.filename}') format('woff2');
}
.${font.cssClass}{
  font-family: '${font.id}';
}
        `
    }
  }
}

Deno.writeTextFileSync(
  path.resolve(dirname, './info.json'),
  JSON.stringify(Info, null, 2)
)
Deno.writeTextFileSync(
  path.resolve(dirname, '../dist/meta.json'),
  JSON.stringify(Tree, null, 2)
)
Deno.writeTextFileSync(path.resolve(dirname, '../dist/hoyo-glyphs.css'), css)
