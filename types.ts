export interface FontItemMeta {
  id: string
  name: {
    zh: string
    en: string
    ja: string
  }
  files: {
    type: string
    variant: string
    cssClass: string
  }[]
  description: {
    zh: string
    en: string
    ja: string
  }
  game: 'GI' | 'HSR' | 'ZZZ'
  /**
   * 是否包含大小写变体 Is it included in the case variant
   */
  includeVariants: boolean
  /**
   * 是否包含数字变体 Is it included in the number variant
   */
  includeNumbers: boolean
  /**
   * 支持的字符集 Supported character set
   */
  supportedCharacter: string[]
}

export type FontMeta = Array<FontItemMeta>
