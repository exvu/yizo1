import {Validate, request, md5} from '../../../lib/tools'
import {getUserInfo, setUserInfo} from "../../../lib/user"

var P = require('../../../lib/wxpage');
P('changeTel/index', {
    comps: [],
    data: {
        step: 1,
        oldtel: '',
        oldtelCode: '',
        tel: '',
        telCode: '',
        unbindTel: null,
        bindTel: null
    },
    onShow: function () {

        let data = getUserInfo();
        if (data && 'tel' in data) {
            this.setData({
                oldtel: data['tel']
            })
        }
    },
    count_down: function (seconds, type) {

        let data = this.data;
        data[type]['nextReq'] = seconds;
        this.setData(data);
        if (seconds <= 0) {
            return;
        }
        setTimeout(() => {
            this.count_down(seconds - 1, type);
        }, 1000)

    },
    sendCode: function (e) {

        //获取验证码
        let params = [];
        params['type'] = e.target.dataset.type;
        //获取不同的手机号
        if (params['type'] == 'unbindTel') {
            params['tel'] = this.data.oldtel;
        } else {
            params['tel'] = this.data.tel;
        }
        try {

            params = Validate.check(params, [
                ['type', 'require', '短信类型错误', Validate.MUST_VALIDATE],
                ['tel', 'tel', '手机号格式错误', Validate.MUST_VALIDATE]
            ]);
            this.$showToast({
                title: '发送中...',
                icon: 'loading'
            });
            request('sendCode', params).then(data => {


                let d = this.data;
                let type = e.target.dataset.type;

                d[type] = data.data;
                let nextReq = d[type]['nextReq'];
                let currentDate = new Date();
                let seconds = parseInt((nextReq - currentDate.getTime()) / 1000);
                this.setData(d)
                setTimeout(()=>{
                    this.count_down(seconds,type);
                },500);

                this.$showToast({
                    title: '发送成功',
                    icon: 'success'
                });

            }, reson => {

                this.$showToast({
                    title: reson,
                    icon: 'error'
                });
            })
        } catch (e) {
            this.$showToast({
                title: e.message,
                icon: 'error'
            });
        }

    },
    ontextChange: function (e) {
        let data = this.data;
        data[e.target.dataset.name] = e.detail.value;
        this.setData(data);
    },
    // onBack: function () {
    //     this.setData({
    //         step: this.data.step - 1
    //     })
    // },
    onNext: function () {

        let {step} = this.data;


        if (step == 1) {
            try {
                let {oldtel, oldtelCode, unbindTel} = this.data
                let params = Validate.check({oldtel, oldtelCode}, [
                    ['oldtelCode', 'require', '短信验证码错误', Validate.MUST_VALIDATE],
                    ['oldtel', 'tel', '手机号格式错误', Validate.MUST_VALIDATE]
                ]);
                if (!unbindTel || (md5(params['oldtelCode']) != unbindTel['code'])) {

                    this.$showToast({
                        title: '短信验证码错误',
                        icon: 'error'
                    });
                    return;
                }
                this.setData({
                    step: 2
                })
            } catch (e) {
                this.$showToast({
                    title: e.message,
                    icon: 'error'
                });
            }
        } else if (step == 2) {
            try {
                let {oldtel, oldtelCode, tel, telCode, bindTel} = this.data
                let params = Validate.check({oldtel, oldtelCode, tel, telCode}, [
                    ['telCode', 'require', '短信验证码错误', Validate.MUST_VALIDATE],
                    ['tel', 'tel', '新手机号格式错误', Validate.MUST_VALIDATE]
                ]);
                if (!bindTel || (md5(params['telCode']) != bindTel['code'])) {
                    this.$showToast({
                        title: '短信验证码错误',
                        icon: 'error'
                    });
                    return;
                }
                this.$showToast({
                    title: '修改中...',
                    icon: 'loading'
                });
                //修改手机号
                request('changeTel', params).then(data => {

                    this.$showToast({
                        title: '修改成功',
                        icon: 'success'
                    });
                    setUserInfo({
                        tel
                    })
                    this.$back();
                }, reson => {
                    wx.showToast({
                        title: reson
                    })
                    this.$showToast({
                        title: reson,
                        icon: 'error'
                    });
                })
            } catch (e) {

                this.$showToast({
                    title: e.message,
                    icon: 'error'
                });
            }
        }
    }
});