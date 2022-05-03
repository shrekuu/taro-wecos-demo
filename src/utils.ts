import environment from "./environment";

class Helpers {

  getTimestamp() {
    return +new Date()
  }

  /**
   * 把指向本地的图片指向腾讯对象存储
   * 如: /cos/static/images/testing/avatar.png
   * 会变为 https://example-1304087913.cos.ap-nanjing.myqcloud.com/taro-wecos-demo/static/images/testing/avatar.png#1.0.0
   */
  cos(path: string): string {
    return `${environment.cos_endpoint}${path.slice(4)}#${this.getTimestamp()}`;
  }
}

const helpers = new Helpers();

export default helpers;
