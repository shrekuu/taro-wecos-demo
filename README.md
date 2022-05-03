# 在 Taro 项目里使用 WeCOS 将 "所有" 图片放在腾讯对象存储里

> [WeCOS](https://github.com/tencentyun/wecos)工具 \
> 这个仓库类似 [wepy-wecos](https://github.com/shrekuu/wepy-wecos-demo), 是 Taro 版而已. \
> 由于小程序限制, `tabbar` 里的图片只能放在本地. \
> 先准备好对象存储 `bucket`, 然后克隆此项目开始.

---

## 如何使用

1. 全局安装 [WeCOS](https://github.com/tencentyun/wecos): `npm install -g wecos`
2. 复制 `wecos.config.json.example` 为 `wecos.config.json` 然后在里面填写对象存储的 `secret_id`, `secret_key`. `wecos.config.json` 文件加入了 `.gitignore`, 不推入仓库.

## 功能

- 跟 WeCOS [文档](https://github.com/tencentyun/wecos)里说的一样, `cos/upload` 里的文件上传后会备份到 `cos/static` 里, 项目根目录里有个 `cos` 目录:

    ```
    cos
    ├── static 
    │   └── images // 例如上传后的图片会被移动到这里
    │       └── jugaogao.jpg
    └── upload
        └── images // 要上传的时候把图放在这里
    ```

- 其它类型文件一样, 放到 `cos/upload` 上传即可, 会自动在 `cos/static` 里备份.
- 在 txs 里的效果:
    
    ```tsx
    // 输入
    <Image src={helpers.cos('/cos/static/images/jugaogao.jpg')}></Image>

    // 输出
    <image src="https://example-1304087913.cos.ap-nanjing.myqcloud.com/taro-wecos-demo/static/images/jugaogao.jpg#1651577717516"></image>
    ```

    ```scss
    // 输入
    background-image: url("/cos/static/images/jugaogao.jpg");

    // 输出
    background-image: url(https://example-1304087913.cos.ap-nanjing.myqcloud.com/taro-wecos-demo/static/images/jugaogao.jpg#1651577568164)
    ```

- **你会发现写地址时编辑器会有地址自动提示, 这当然是极好的. 🥳🎉 酥服~**



