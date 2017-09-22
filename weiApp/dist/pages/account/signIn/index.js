'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./../../../lib/utils/index.js');

var _user = require('./../../../lib/apis/user.js');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('./../../../lib/services/user.js');

var _user4 = _interopRequireDefault(_user3);

var _index2 = require('./../../../components/toast/index.js');

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignIn = function (_wepy$page) {
  _inherits(SignIn, _wepy$page);

  function SignIn() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SignIn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      account: '',
      password: ''
    }, _this.components = {
      toast: _index3.default
    }, _this.methods = {
      jumpTo: function jumpTo(e) {
        var url = e.target.dataset.url;

        _wepy2.default.navigateTo({
          url: url
        });
      },
      redirectTo: function redirectTo(e) {
        var url = e.target.dataset.url;

        _wepy2.default.redirectTo({
          url: url
        });
      },
      ontextChange: function ontextChange(e) {
        this[e.target.dataset.name] = e.detail.value;
        this.$apply();
      },
      onSignIn: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _data, account, password, params, _ref3, data;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _data = this.data, account = _data.account, password = _data.password;
                  _context.prev = 1;

                  console.log({ account: account, password: password });
                  params = _index.Validate.check({ account: account, password: password }, [['account', 'tel', '手机号格式错误', _index.Validate.MUST_VALIDATE], ['password', 'require', '密码不能为空', _index.Validate.MUST_VALIDATE]]);

                  this.$invoke('toast', 'showToast', {
                    title: '登录中',
                    icon: 'loading',
                    mask: true
                  });

                  _context.next = 7;
                  return _user2.default.SignIn(params);

                case 7:
                  _ref3 = _context.sent;
                  data = _ref3.data;

                  if (data) {
                    _wepy2.default.setStorage({
                      key: 'remember',
                      data: {
                        account: account,
                        password: password
                      }
                    });
                    this.$invoke('toast', 'showToast', {
                      title: '登录成功',
                      icon: 'success',
                      mask: true
                    });
                    _user4.default.saveUserInfo(data, this);
                    setTimeout(function () {
                      _wepy2.default.switchTab({
                        url: '/pages/mine/index'
                      });
                    }, 1000);
                  }
                  _context.next = 15;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context['catch'](1);

                  this.$invoke('toast', 'showToast', {
                    title: _context.t0.message,
                    icon: 'error',
                    mask: true
                  });

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 12]]);
        }));

        function onSignIn() {
          return _ref2.apply(this, arguments);
        }

        return onSignIn;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return SignIn;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(SignIn , 'pages/account/signIn/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlNpZ25JbiIsImRhdGEiLCJhY2NvdW50IiwicGFzc3dvcmQiLCJjb21wb25lbnRzIiwidG9hc3QiLCJtZXRob2RzIiwianVtcFRvIiwiZSIsInVybCIsInRhcmdldCIsImRhdGFzZXQiLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RUbyIsIm9udGV4dENoYW5nZSIsIm5hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsIm9uU2lnbkluIiwiY29uc29sZSIsImxvZyIsInBhcmFtcyIsImNoZWNrIiwiTVVTVF9WQUxJREFURSIsIiRpbnZva2UiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwic2V0U3RvcmFnZSIsImtleSIsInNhdmVVc2VySW5mbyIsInNldFRpbWVvdXQiLCJzd2l0Y2hUYWIiLCJtZXNzYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLGdCQUFVO0FBRkwsSyxRQUlQQyxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBR2JDLE8sR0FBVTtBQUNSQyxjQUFRLGdCQUFTQyxDQUFULEVBQVk7QUFBQSxZQUNaQyxHQURZLEdBQ0pELEVBQUVFLE1BQUYsQ0FBU0MsT0FETCxDQUNaRixHQURZOztBQUVsQix1QkFBS0csVUFBTCxDQUFnQjtBQUNkSDtBQURjLFNBQWhCO0FBR0QsT0FOTztBQU9SSSxrQkFBWSxvQkFBU0wsQ0FBVCxFQUFZO0FBQUEsWUFDaEJDLEdBRGdCLEdBQ1JELEVBQUVFLE1BQUYsQ0FBU0MsT0FERCxDQUNoQkYsR0FEZ0I7O0FBRXRCLHVCQUFLSSxVQUFMLENBQWdCO0FBQ2RKO0FBRGMsU0FBaEI7QUFHRCxPQVpPO0FBYVJLLG9CQUFjLHNCQUFTTixDQUFULEVBQVk7QUFDeEIsYUFBS0EsRUFBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCSSxJQUF0QixJQUE4QlAsRUFBRVEsTUFBRixDQUFTQyxLQUF2QztBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQWhCTztBQWlCUkM7QUFBQSw0RUFBVTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQ29CLEtBQUtsQixJQUR6QixFQUNGQyxPQURFLFNBQ0ZBLE9BREUsRUFDT0MsUUFEUCxTQUNPQSxRQURQO0FBQUE7O0FBR05pQiwwQkFBUUMsR0FBUixDQUFZLEVBQUVuQixnQkFBRixFQUFXQyxrQkFBWCxFQUFaO0FBQ0ltQix3QkFKRSxHQUlPLGdCQUFTQyxLQUFULENBQWUsRUFBRXJCLGdCQUFGLEVBQVdDLGtCQUFYLEVBQWYsRUFBc0MsQ0FDakQsQ0FBQyxTQUFELEVBQVksS0FBWixFQUFtQixTQUFuQixFQUE4QixnQkFBU3FCLGFBQXZDLENBRGlELEVBRWpELENBQUMsVUFBRCxFQUFhLFNBQWIsRUFBd0IsUUFBeEIsRUFBa0MsZ0JBQVNBLGFBQTNDLENBRmlELENBQXRDLENBSlA7O0FBUU4sdUJBQUtDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DO0FBQ2pDQywyQkFBTyxLQUQwQjtBQUVqQ0MsMEJBQU0sU0FGMkI7QUFHakNDLDBCQUFNO0FBSDJCLG1CQUFuQzs7QUFSTTtBQUFBLHlCQWNlLGVBQVE1QixNQUFSLENBQWVzQixNQUFmLENBZGY7O0FBQUE7QUFBQTtBQWNBckIsc0JBZEEsU0FjQUEsSUFkQTs7QUFlTixzQkFBSUEsSUFBSixFQUFVO0FBQ1IsbUNBQUs0QixVQUFMLENBQWdCO0FBQ2RDLDJCQUFLLFVBRFM7QUFFZDdCLDRCQUFNO0FBQ0pDLHdDQURJO0FBRUpDO0FBRkk7QUFGUSxxQkFBaEI7QUFPQSx5QkFBS3NCLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DO0FBQ2pDQyw2QkFBTyxNQUQwQjtBQUVqQ0MsNEJBQU0sU0FGMkI7QUFHakNDLDRCQUFNO0FBSDJCLHFCQUFuQztBQUtBLG1DQUFLRyxZQUFMLENBQWtCOUIsSUFBbEIsRUFBd0IsSUFBeEI7QUFDQStCLCtCQUFXLFlBQU07QUFDZixxQ0FBS0MsU0FBTCxDQUFlO0FBQ2J4Qiw2QkFBSztBQURRLHVCQUFmO0FBR0QscUJBSkQsRUFJRyxJQUpIO0FBS0Q7QUFsQ0s7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBb0NOLHVCQUFLZ0IsT0FBTCxDQUFhLE9BQWIsRUFBc0IsV0FBdEIsRUFBbUM7QUFDakNDLDJCQUFPLFlBQUVRLE9BRHdCO0FBRWpDUCwwQkFBTSxPQUYyQjtBQUdqQ0MsMEJBQU07QUFIMkIsbUJBQW5DOztBQXBDTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFWOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBakJRLEs7Ozs7RUFSd0IsZUFBS08sSTs7a0JBQXBCbkMsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBWYWxpZGF0ZSB9IGZyb20gJy4uLy4uLy4uL2xpYi91dGlscy9pbmRleCdcclxuaW1wb3J0IFVzZXJBcGkgZnJvbSAnLi4vLi4vLi4vbGliL2FwaXMvdXNlcidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vLi4vLi4vbGliL3NlcnZpY2VzL3VzZXInXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RvYXN0L2luZGV4J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduSW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGRhdGEgPSB7XHJcbiAgICBhY2NvdW50OiAnJyxcclxuICAgIHBhc3N3b3JkOiAnJ1xyXG4gIH1cclxuICBjb21wb25lbnRzID0ge1xyXG4gICAgdG9hc3Q6IFRvYXN0XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBqdW1wVG86IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgbGV0IHsgdXJsIH0gPSBlLnRhcmdldC5kYXRhc2V0XHJcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmVkaXJlY3RUbzogZnVuY3Rpb24oZSkge1xyXG4gICAgICBsZXQgeyB1cmwgfSA9IGUudGFyZ2V0LmRhdGFzZXRcclxuICAgICAgd2VweS5yZWRpcmVjdFRvKHtcclxuICAgICAgICB1cmxcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvbnRleHRDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdGhpc1tlLnRhcmdldC5kYXRhc2V0Lm5hbWVdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIG9uU2lnbkluOiBhc3luYyBmdW5jdGlvbigpIHtcclxuICAgICAgbGV0IHsgYWNjb3VudCwgcGFzc3dvcmQgfSA9IHRoaXMuZGF0YVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHsgYWNjb3VudCwgcGFzc3dvcmQgfSlcclxuICAgICAgICBsZXQgcGFyYW1zID0gVmFsaWRhdGUuY2hlY2soeyBhY2NvdW50LCBwYXNzd29yZCB9LCBbXHJcbiAgICAgICAgICBbJ2FjY291bnQnLCAndGVsJywgJ+aJi+acuuWPt+agvOW8j+mUmeivrycsIFZhbGlkYXRlLk1VU1RfVkFMSURBVEVdLFxyXG4gICAgICAgICAgWydwYXNzd29yZCcsICdyZXF1aXJlJywgJ+WvhueggeS4jeiDveS4uuepuicsIFZhbGlkYXRlLk1VU1RfVkFMSURBVEVdXHJcbiAgICAgICAgXSlcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIHtcclxuICAgICAgICAgIHRpdGxlOiAn55m75b2V5LitJyxcclxuICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcclxuICAgICAgICAgIG1hc2s6IHRydWVcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCBVc2VyQXBpLlNpZ25JbihwYXJhbXMpXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7XHJcbiAgICAgICAgICAgIGtleTogJ3JlbWVtYmVyJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIGFjY291bnQsXHJcbiAgICAgICAgICAgICAgcGFzc3dvcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0Jywge1xyXG4gICAgICAgICAgICB0aXRsZTogJ+eZu+W9leaIkOWKnycsXHJcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgbWFzazogdHJ1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIFVzZXIuc2F2ZVVzZXJJbmZvKGRhdGEsIHRoaXMpXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgIHVybDogJy9wYWdlcy9taW5lL2luZGV4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIHtcclxuICAgICAgICAgIHRpdGxlOiBlLm1lc3NhZ2UsXHJcbiAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgbWFzazogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19