import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Modal, Form, Input, Button, notification, Icon } from 'antd';
import good from '../../api/good';
class GoodTypeEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            cache: this.props.data,
        }
    }
    static defaultProps = {
        onCancel: () => { },
        onOk: () => { }
    }
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
        },
    }
    handleSubmit = (e) => {
        const { data: { type } } = this.props;
        this.props.form.validateFieldsAndScroll(async (err, { name }) => {
            if (!err) {
                try {

                    let result;
                    if (type == "add") {
                        result = await good.addType({
                            name
                        });
                    } else {
                        result = await good.updateType({
                            name,
                            id: this.props.data.tid
                        });
                    }
                    if (!result) {
                        throw new Error("修改失败")
                    }
                    notification.open({
                        message: (type == "add" ? "添加" : "修改") + "成功",
                        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                    })
                    this.props.onOk();
                } catch (e) {
                    notification.open({
                        message: (type == "add" ? "添加" : "修改") + "失败",
                        description: e.message,
                        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                    })
                }
            }
        });
    }
    render() {
        const { data: { type, tname } } = this.props;
        const { getFieldDecorator, getFieldProps } = this.props.form;
        return (
            <Modal
                title={type == "add" ? "添加物品类型" : "修改物品类型信息"}
                visible={true}
                maskStyle={{ background: "rgba(0,0,0,.1)" }}
                okText="添加"
                cancelText="取消"
                onCancel={this.props.onCancel}
                footer={[
                    <Button type="primary" htmlType="submit" key="submit" onClick={this.handleSubmit}>{type == "add" ? "添加" : "修改"}</Button>
                ]}
            >
                <Form >
                    <Form.Item
                        {...this.formItemLayout}
                        label="类型名"
                    >{getFieldDecorator('name', {
                        rules: [{ required: true, message: '请填写类型名' }],
                        initialValue: tname
                    })(
                        <Input placeholder="必填" />
                    )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(GoodTypeEditor);