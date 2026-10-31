// 极简 npm 风格打包：把 files 白名单打成 <name>-<version>.tgz（tar + gzip），零外部依赖。
import zlib from 'node:zlib'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

// npm 总是包含 package.json；再加 files 白名单内容（README/LICENSE 也按 npm 惯例附带）。
const files = [
  'package.json',
  'index.js',
  'cordis.patch.yml',
  'icon.svg',
  'locale/zh.json',
  'locale/en.json',
  'components/pseudo-need/index.js',
  'components/pseudo-need/package.json',
  'components/pseudo-need/icon.svg',
  'components/pseudo-need/locale/zh.json',
  'components/pseudo-need/locale/en.json',
  'LICENSE',
  'CHANGELOG.md',
  'ROADMAP.md',
  'README.md',
  'README-zh.md',
  'README.en.md',
  'README-es.md',
  'README-pt.md',
  'README-hi.md',
]

function header(name, size, type = '0') {
  const h = Buffer.alloc(512)
  h.write(name, 0, 100, 'utf8')
  h.write('0000644\0', 100, 8, 'utf8') // mode
  h.write('0000000\0', 108, 8, 'utf8') // uid
  h.write('0000000\0', 116, 8, 'utf8') // gid
  h.write(size.toString(8).padStart(11, '0') + '\0', 124, 12, 'utf8') // size
  h.write('00000000000\0', 136, 12, 'utf8') // mtime
  h.write('        ', 148, 8, 'utf8') // checksum placeholder
  h.write(type, 156, 1, 'utf8') // typeflag
  h.write('', 157, 100, 'utf8') // linkname
  h.write('ustar\0', 257, 6, 'utf8') // magic
  h.write('00', 263, 2, 'utf8') // version
  // checksum = 全部 512 字节求和
  let sum = 0
  for (let i = 0; i < 512; i++) sum += h[i]
  h.write(sum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'utf8')
  return h
}

const chunks = []
for (const f of files) {
  if (!fs.existsSync(f)) continue
  const data = fs.readFileSync(f)
  const p = 'package/' + f.replace(/\\/g, '/')
  chunks.push(header(p, data.length))
  chunks.push(data)
  const pad = 512 - (data.length % 512)
  if (pad !== 512) chunks.push(Buffer.alloc(pad))
}
chunks.push(Buffer.alloc(512), Buffer.alloc(512)) // tar 结尾两个零块

const tar = Buffer.concat(chunks)
const gz = zlib.gzipSync(tar, { level: 9 })
const out = `${pkg.name}-${pkg.version}.tgz`
fs.writeFileSync(out, gz)
console.log(`wrote ${out} (${gz.length} bytes, ${files.length} files)`)
