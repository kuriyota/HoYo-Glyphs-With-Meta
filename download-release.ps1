# 获取 https://api.github.com/repos/SpeedyOrc-C/HoYo-Glyphs 最新的 release 版本

# 获取最新的 release 信息
$releaseMeta = Invoke-RestMethod -Uri 'https://api.github.com/repos/SpeedyOrc-C/HoYo-Glyphs/releases'

# 获取第一个 asset 的下载 URL
$fileUrl = $releaseMeta[0].assets[0].browser_download_url

# 输出下载链接
Write-Host "Downloading from: $fileUrl"

# 下载文件
Invoke-WebRequest -Uri $fileUrl -OutFile "HoYo-Glyphs.zip"

# 解压文件
Expand-Archive -Path "HoYo-Glyphs.zip" -DestinationPath "HoYo-Glyphs" -Force