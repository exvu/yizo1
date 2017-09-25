import wepy from 'wepy'
import Code from '../../config/code';
import Detail from '../../config/detail.js';

let code = {};
for (let key in Code) {
  code[Code[key]] = Detail[key];
}
async function doFetch(url, method = 'GET', data = {}, header = {}) {

  let token = wepy.getStorageSync("access-token")
  header['content-type'] = 'application/json'
  if (token) {
    header['access-token'] = token;
  }
  //替换url参数
  let arr = url.match(/\/:[a-zA-Z][0-9a-zA-Z]+/g);
  if (data && arr != null) {
    for (let k in arr) {
      if (arr[k].substring(2) in data) {
        url = url.replace(arr[k], '/' + data[value.substring(2)]);
        delete data[arr[k].substring(2)];
      }
    }
  }
  if (method == 'GET') {
    let urlData = [];
    for (let item in data) {
      urlData.push(item + '=' + encodeURIComponent(data[item]));
    }
    url += '?' + urlData.join('&')
    data = {}
  }
  //发起请求
  let res = await wepy.request({
    url,
    data,
    header,
    method
  })
  if (res.data.code != 0) {
    throw new Error(code[res.data.code])
  }
  //保存token
  let keys = Object.keys(res.header);
  if (keys.indexOf("access-token") !== -1) {

    console.log('保存token')
    let newtoken = res.header['access-token'];
    wx.setStorage({
      key: "access-token",
      data: newtoken
    })
  }
  if (keys.indexOf("user-info") !== -1) {
    console.log('保存用户信息')
    wx.setStorage({
      key: "userInfo",
      data: res.data.data.info
    })
  }
  return res.data;
}

const Api = {
  get: url => async (data) => await doFetch(url, 'GET', data),
  post: url => async (data) => await doFetch(url, 'POST', data),
  put: url => async (data) => await doFetch(url, 'PUT', data),
  delete: url => async (data) => await doFetch(url, 'DELETE', data),
}
export default Api;