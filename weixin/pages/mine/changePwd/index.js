import {request, Validate, md5} from "../../../lib/tools"
import {setUserInfo} from "../../../lib/user"
var P = require('../../../lib/wxpage');
P('changePwd/index', {
    comps: [],
    data: {
        id: '',
        password: '',
        oldpassword: ''
    },
    onLoad: function (opts) {
        this.setData(opts);
    },
    ontextChange: function (e) {
        let data = this.data;
        data[e.target.dataset.name] = e.detail.value;
        this.setData(data);
    },
    changPwd: function () {
        let {id,password, oldpassword} = this.data;

        try {

            let params = Validate.check({id, password, oldpassword}, [
                ['oldpassword', 'require', '原密码不能为空', Validate.MUST_VALIDATE],
                ['password', 'require', '新密码不能为空', Validate.MUST_VALIDATE]
            ]);
            let remember = wx.getStorageSync('remember');
            params['oldpassword'] = md5(params['oldpassword']);
            if (remember &&(remember['pwd'] != params['oldpassword'])) {
                this.$showToast({
                    title: '原密码不正确',
                    icon: 'error'
                })
                return;
            }
            params['password'] = md5(params['password']);
            params['id'] = id;
            this.$showToast({
                title: '修改密码中...',
                icon: 'loading',
            })

            request("changePwd", params).then(
                data => {

                    //保存数据
                    this.$showToast({
                        title: '修改成功',
                        icon: 'success',
                    });
                    setUserInfo({
                        pwd:params['password']
                    })
                    setTimeout(()=>{
                        this.$back()
                    },1000);
                },
                reason => {

                    this.$showToast({
                        title: reason,
                        icon: 'error'
                    });
                }
            );
        } catch (e) {
            this.$showToast({
                title: e.message,
                icon: 'error'
            });
        }

    }
});