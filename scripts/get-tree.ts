import path from 'node:path'
const dirname = import.meta.dirname as string
const filename = import.meta.filename as string

import * as fontkit from 'npm:fontkit'

const root = path.resolve(dirname, '../HoYo-Glyphs/')

const Games = {
  'Genshin-Impact': 'GI',
  'Honkai-Star-Rail': 'HSR',
  'Zenless-Zone-Zero': 'ZZZ'
}

interface Data {
  id: string
  game: string
  supportedCharacters: string
  supportedFormat: string[]
  supportedVariant: string[]
  cssClass: string
  files: any[]
}

const result: Data[] = []

function checkFontSupportedCharacter(font: any): string {
  const Font = fontkit.openSync(font)
  const set = Font.characterSet
  let supportedCharacterString = ''
  for (const character of set) {
    if (character > 0x7f) {
      continue
    }
    supportedCharacterString += String.fromCharCode(character)
  }
  return supportedCharacterString
}

export default function () {
  for (const game in Games) {
    const GamePath = path.resolve(root, game)
    const GameDir = Deno.readDirSync(GamePath)
    for (const FontFolder of GameDir) {
      // 字体文件夹
      const data: Data = {
        id: FontFolder.name.toLocaleLowerCase(),
        game: Games[game as keyof typeof Games],
        supportedCharacters: '',
        supportedFormat: [] as string[],
        supportedVariant: [] as string[],
        cssClass: 'font-' + FontFolder.name.toLocaleLowerCase(),
        files: [] as any[]
      }
      const FormatPath = path.resolve(GamePath, FontFolder.name)
      const FormatDir = Deno.readDirSync(FormatPath)
      for (const FormatFolder of FormatDir) {
        if (['ttf', 'otf', 'woff2'].includes(FormatFolder.name)) {
          data.supportedFormat.push(FormatFolder.name)
          const Fonts = Deno.readDirSync(
            path.resolve(FormatPath, FormatFolder.name)
          )
          for (const Font of Fonts) {
            if (Font.isFile) {
              const reg = /^(.*?)-([^-.]+)\.[^.]+$/
              const variant = Font.name.match(reg)?.[2] as string
              if (!new Set(data.supportedVariant).has(variant)) {
                data.supportedVariant.push(variant)
              }
              Deno.copyFileSync(
                path.resolve(FormatPath, FormatFolder.name, Font.name),
                path.resolve(dirname, '../dist/fonts', Font.name)
              )
              data.files.push({
                filename: Font.name,
                type: FormatFolder.name,
                variant: variant
              })
            }
            if (data.supportedCharacters === undefined) {
              const FontPath = path.resolve(
                FormatPath,
                FormatFolder.name,
                Font.name
              )
              data.supportedCharacters = checkFontSupportedCharacter(FontPath)
            }
          }
        }
      }
      result.push(data)
    }
  }
  return result
}
