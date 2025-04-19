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

const result: any = []

function checkFontSupportedCharacter(font: any): string {
  const Font = fontkit.openSync(font)
  const set = Font.characterSet
  let supportedCharacterString = ''
  for (const character of set) {
    if( character > 0x7f){
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
      const data: any = {
        id: FontFolder.name.toLocaleLowerCase(),
        game: Games[game as keyof typeof Games],
        supportedCharacters: undefined,
        supportedFormat: new Set(),
        supportedVariant: new Set(),
        cssClass: 'font-'+FontFolder.name.toLocaleLowerCase(),
        files: [],
      }
      const FormatPath = path.resolve(GamePath, FontFolder.name)
      const FormatDir = Deno.readDirSync(FormatPath)
      for (const FormatFolder of FormatDir) {
        if (['ttf', 'otf', 'woff2'].includes(FormatFolder.name)) {
          data.supportedFormat.add(FormatFolder.name)
          const Fonts = Deno.readDirSync(
            path.resolve(FormatPath, FormatFolder.name)
          )
          for (const Font of Fonts) {
            if (Font.isFile) {
              const reg = /^(.*?)-([^-.]+)\.[^.]+$/
              const variant = Font.name.match(reg)?.[2] as string
              data.supportedVariant.add(variant)
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
      data.supportedFormat = Array.from(data.supportedFormat)
      data.supportedVariant = Array.from(data.supportedVariant)
      result.push(data)
    }
  }
  return result
}
