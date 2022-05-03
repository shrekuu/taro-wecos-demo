import cosConfig  from '../wecos.config'

let cosBaseUrl = cosConfig.baseUrl

// 生成一个随机字符串, 用于清除图片缓存
function getTimestamp () {
  return +new Date()
}

const config = {
  projectName: 'taro-wecos-demo',
  date: '2022-5-3',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    webpackChain (chain) {
      chain.merge({
        module: {
          rule: {
            // 替换指向对象存储的资源的链接
            // 将样式里指向 /cos/static/images 的背景图片地址指向对象存储里文件地址并加上随机字符串
            // 将 /static/images 本地图片一地址加上随机字符串
            // 修改这里正则时注意前后行断言
            style: {
              test: /\.scss$/,
              use: [{
                loader: 'string-replace-loader2',
                options: {
                  find: /(?<=background-image:\s*url\()[^)]+(?=\))/g, // 不支持多背景, 请不使用多背景, 其伪元素绕过去
                  replace: function (match) {

                    // 去掉引号
                    if (/^('|")[^'"]+('|")$/.test(match)) {
                      match = match.slice(1, -1)
                    }

                    // 本地图片, 图片放在了 src/static 目录
                    if (/^\/static\/images\/.*\.(png|jpg|jpeg|svg|gif)$/.test(match)) {
                      return match + '#' + getTimestamp()
                    }

                    // cos 图片
                    if (cosBaseUrl && /^\/cos\/static\/images\/.*\.(png|jpg|jpeg|svg|gif)$/.test(match)) {
                      return cosBaseUrl + match.substr(4) + '#' + getTimestamp()
                    }

                    return match
                  }
                }
              }]
            }
          }
        }
      })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
