// 生产服务器
const production = {
  version: "1.0.0",
  production: true,

  // TODO: api 地址
  api_endpoint: "http://api.example.com",

  // TODO: 图片对象存储, 就是 wecos.config.json 里那个地址, 注意这是生产环境, 开发与生产环境共用一个桶
  // 若你开发过程会影响到生产环境的图片等资源, 你就折腾一下, 把生产环境的跟测试环境的桶分开
  cos_endpoint: "https://example-1304087913.cos.ap-nanjing.myqcloud.com/taro-wecos-demo",
};

// 线上测试服务器
const staging = Object.assign({}, production, {
  production: false,

  // TODO: api 地址
  // api_endpoint: 'http://api.staging.example.com',
});

// 环境切换, production 或 staging
// 打包时修改为 production, 仓库始始终保持为 staging
const environment = staging

export default environment
