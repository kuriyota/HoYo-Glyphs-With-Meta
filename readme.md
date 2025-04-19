# HoYo-Glyphs-with-meta

这个仓库包含了一份手动维护 HoYo-Glyphs 的字体元信息。

This repo contains a manually maintained metadata for HoYo-Glyphs.

[![SpeedyOrc-C/HoYo-Glyphs](https://github-readme-stats.vercel.app/api/pin/?username=SpeedyOrc-C&repo=HoYo-Glyphs)](https://github.com/SpeedyOrc-C/HoYo-Glyphs)

本项目的初衷是为我的一个项目[「试作·云翰」](https://github.com/SharpDotNUT/Prototype-YunHan) 使用。

The original purpose of this project is to use it for my project [Prototype·YunHan](https://github.com/SharpDotNUT/Prototype-YunHan).

[![SharpDotNUT/Prototype-YunHan](https://github-readme-stats.vercel.app/api/pin/?username=SharpDotNUT&repo=Prototype-YunHan)](https://github.com/SharpDotNUT/Prototype-YunHan)

仓库**仅包含生成数据的代码**，请**到 Release 下载元数据**。

Repo **only contains the code to generate the data**, please **download the metadata from Release**.

- 扁平排列的所有字体文件 / All font files in flat structure
- CSS 文件 / CSS file
- JSON 文件 / JSON file
  - 字体名称（中，英，日） / Font name (zh, en, ja)
  - 字体文件名&文件类型&字体变体 / Font file names & file types & font variants
  - CSS 类名 / CSS class name
  - 字体描述（中，英，日） / Font description (zh, en, ja)
  - 属于哪款游戏 / Belong to which game


### Release 目录结构 / Release directory structure

```
- hoyo-glyphs.css
- meta.json
- /fonts
  - DeshretInscription-Regular.otf
  - ...
```

### JSON 数据结构 / JSON data structure

```js
[
  // 每个字体 / Each font
  {
    id: string,
    name: {
      zh: string
      en: string
      ja: string
    },
    description: {
      zh: string
      en: string
      ja: string
    },
    files: {
      type: 'ttf' | 'otf' | 'woff' | 'woff2'
      variant: string // 比如 `Regular` / For example `Regular`
      cssClass: string
    },
    // 属于哪款游戏 / Belong to which game
    game: 'GI' | 'HSR' | 'ZZZ'
    // 支持的字符集 Supported character set
    supportCharacter: string
  }
]

```

### 运行构建 / Run build

```bash


# 下载原始仓库的最新 Release / Download the latest release of the original repo
powershell './download-release.ps1'

# 运行构建 / Run build
deno run --allow-read --allow-write ./scripts/reduce.ts

```
