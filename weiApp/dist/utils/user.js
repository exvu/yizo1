"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfo = getUserInfo;
exports.setUserInfo = setUserInfo;
exports.saveUserInfo = saveUserInfo;
exports.signOut = signOut;
exports.isUserInfoFull = isUserInfoFull;
function getUserInfo() {
  return wx.getStorageSync("userinfo");
}

function setUserInfo(data) {

  var userinfo = wx.getStorageSync("userinfo");
  var remember = wx.getStorageSync("remember");
  if (userinfo) {
    userinfo = replace(userinfo, data);
    wx.setStorage({
      key: "userinfo",
      data: userinfo
    });
  }
  if (remember) {
    remember = replace(remember, data);
    wx.setStorage({
      key: "remember",
      data: remember
    });
  }
}
function saveUserInfo(data) {
  wx.removeStorageSync("userinfo");
  wx.setStorage({
    key: "userinfo",
    data: data
  });
}
function signOut() {
  //移除token
  wx.removeStorage({ key: 'access-token' });
  wx.removeStorage({ key: 'remember' });
  wx.removeStorage({ key: 'userinfo' });
}

function replace(source, target) {

  for (var item in target) {

    if (item in source) {
      source[item] = target[item];
    }
  }
  return source;
}
function isUserInfoFull() {

  var userinfo = getUserInfo();
  if (!userinfo['college'] || userinfo['gender'] == null) {
    return false;
  }
  return true;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiZ2V0VXNlckluZm8iLCJzZXRVc2VySW5mbyIsInNhdmVVc2VySW5mbyIsInNpZ25PdXQiLCJpc1VzZXJJbmZvRnVsbCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJkYXRhIiwidXNlcmluZm8iLCJyZW1lbWJlciIsInJlcGxhY2UiLCJzZXRTdG9yYWdlIiwia2V5IiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJyZW1vdmVTdG9yYWdlIiwic291cmNlIiwidGFyZ2V0IiwiaXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFBZ0JBLFcsR0FBQUEsVztRQUlBQyxXLEdBQUFBLFc7UUFvQkFDLFksR0FBQUEsWTtRQVFBQyxPLEdBQUFBLE87UUFpQkFDLGMsR0FBQUEsYztBQWpEVCxTQUFTSixXQUFULEdBQXVCO0FBQzVCLFNBQU9LLEdBQUdDLGNBQUgsQ0FBa0IsVUFBbEIsQ0FBUDtBQUNEOztBQUVNLFNBQVNMLFdBQVQsQ0FBcUJNLElBQXJCLEVBQTJCOztBQUVoQyxNQUFJQyxXQUFXSCxHQUFHQyxjQUFILENBQWtCLFVBQWxCLENBQWY7QUFDQSxNQUFJRyxXQUFXSixHQUFHQyxjQUFILENBQWtCLFVBQWxCLENBQWY7QUFDQSxNQUFJRSxRQUFKLEVBQWM7QUFDWkEsZUFBV0UsUUFBUUYsUUFBUixFQUFrQkQsSUFBbEIsQ0FBWDtBQUNBRixPQUFHTSxVQUFILENBQWM7QUFDWkMsV0FBSyxVQURPO0FBRVpMLFlBQU1DO0FBRk0sS0FBZDtBQUlEO0FBQ0QsTUFBSUMsUUFBSixFQUFjO0FBQ1pBLGVBQVdDLFFBQVFELFFBQVIsRUFBa0JGLElBQWxCLENBQVg7QUFDQUYsT0FBR00sVUFBSCxDQUFjO0FBQ1pDLFdBQUssVUFETztBQUVaTCxZQUFNRTtBQUZNLEtBQWQ7QUFJRDtBQUVGO0FBQ00sU0FBU1AsWUFBVCxDQUFzQkssSUFBdEIsRUFBNEI7QUFDakNGLEtBQUdRLGlCQUFILENBQXFCLFVBQXJCO0FBQ0FSLEtBQUdNLFVBQUgsQ0FBYztBQUNaQyxTQUFLLFVBRE87QUFFWkw7QUFGWSxHQUFkO0FBS0Q7QUFDTSxTQUFTSixPQUFULEdBQW1CO0FBQ3hCO0FBQ0FFLEtBQUdTLGFBQUgsQ0FBaUIsRUFBRUYsS0FBSyxjQUFQLEVBQWpCO0FBQ0FQLEtBQUdTLGFBQUgsQ0FBaUIsRUFBRUYsS0FBSyxVQUFQLEVBQWpCO0FBQ0FQLEtBQUdTLGFBQUgsQ0FBaUIsRUFBRUYsS0FBSyxVQUFQLEVBQWpCO0FBQ0Q7O0FBRUQsU0FBU0YsT0FBVCxDQUFpQkssTUFBakIsRUFBeUJDLE1BQXpCLEVBQWlDOztBQUUvQixPQUFLLElBQUlDLElBQVQsSUFBaUJELE1BQWpCLEVBQXlCOztBQUV2QixRQUFJQyxRQUFRRixNQUFaLEVBQW9CO0FBQ2xCQSxhQUFPRSxJQUFQLElBQWVELE9BQU9DLElBQVAsQ0FBZjtBQUNEO0FBQ0Y7QUFDRCxTQUFPRixNQUFQO0FBQ0Q7QUFDTSxTQUFTWCxjQUFULEdBQTBCOztBQUUvQixNQUFJSSxXQUFXUixhQUFmO0FBQ0EsTUFBSSxDQUFDUSxTQUFTLFNBQVQsQ0FBRCxJQUF3QkEsU0FBUyxRQUFULEtBQXNCLElBQWxELEVBQXdEO0FBQ3RELFdBQU8sS0FBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0QiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySW5mbygpIHtcclxuICByZXR1cm4gd3guZ2V0U3RvcmFnZVN5bmMoXCJ1c2VyaW5mb1wiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFVzZXJJbmZvKGRhdGEpIHtcclxuXHJcbiAgbGV0IHVzZXJpbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ1c2VyaW5mb1wiKTtcclxuICBsZXQgcmVtZW1iZXIgPSB3eC5nZXRTdG9yYWdlU3luYyhcInJlbWVtYmVyXCIpO1xyXG4gIGlmICh1c2VyaW5mbykge1xyXG4gICAgdXNlcmluZm8gPSByZXBsYWNlKHVzZXJpbmZvLCBkYXRhKTtcclxuICAgIHd4LnNldFN0b3JhZ2Uoe1xyXG4gICAgICBrZXk6IFwidXNlcmluZm9cIixcclxuICAgICAgZGF0YTogdXNlcmluZm9cclxuICAgIH0pO1xyXG4gIH1cclxuICBpZiAocmVtZW1iZXIpIHtcclxuICAgIHJlbWVtYmVyID0gcmVwbGFjZShyZW1lbWJlciwgZGF0YSk7XHJcbiAgICB3eC5zZXRTdG9yYWdlKHtcclxuICAgICAga2V5OiBcInJlbWVtYmVyXCIsXHJcbiAgICAgIGRhdGE6IHJlbWVtYmVyXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlVXNlckluZm8oZGF0YSkge1xyXG4gIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKFwidXNlcmluZm9cIilcclxuICB3eC5zZXRTdG9yYWdlKHtcclxuICAgIGtleTogXCJ1c2VyaW5mb1wiLFxyXG4gICAgZGF0YVxyXG4gIH0pO1xyXG5cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2lnbk91dCgpIHtcclxuICAvL+enu+mZpHRva2VuXHJcbiAgd3gucmVtb3ZlU3RvcmFnZSh7IGtleTogJ2FjY2Vzcy10b2tlbicgfSk7XHJcbiAgd3gucmVtb3ZlU3RvcmFnZSh7IGtleTogJ3JlbWVtYmVyJyB9KTtcclxuICB3eC5yZW1vdmVTdG9yYWdlKHsga2V5OiAndXNlcmluZm8nIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBsYWNlKHNvdXJjZSwgdGFyZ2V0KSB7XHJcblxyXG4gIGZvciAobGV0IGl0ZW0gaW4gdGFyZ2V0KSB7XHJcblxyXG4gICAgaWYgKGl0ZW0gaW4gc291cmNlKSB7XHJcbiAgICAgIHNvdXJjZVtpdGVtXSA9IHRhcmdldFtpdGVtXTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHNvdXJjZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNVc2VySW5mb0Z1bGwoKSB7XHJcblxyXG4gIGxldCB1c2VyaW5mbyA9IGdldFVzZXJJbmZvKCk7XHJcbiAgaWYgKCF1c2VyaW5mb1snY29sbGVnZSddIHx8IHVzZXJpbmZvWydnZW5kZXInXSA9PSBudWxsKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59Il19