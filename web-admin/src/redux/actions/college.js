import college from '../../api/college'
export const COL_SAVE_TO_CACHE = "COL_SAVE_TO_CACHE";
export const COL_SAVE_TO_MEMORY = "COL_SAVE_TO_MEMORY";
import React, { Component } from 'react';

import { message ,notification,Icon} from 'antd';
export function get_list(data) {
    return async (dispatch, getState) => {
        //获取默认数据
        if (!data) {
            let { college: { memory: { pagination } } } = getState();
            data = {
                pagination
            }
        }
        let { pageSize, current } = data.pagination;
        try {
            dispatch({
                type: COL_SAVE_TO_MEMORY,
                payload: {
                    loading: true
                }
            })
            let { list, pagination } = await college.list({ pageSize, page: current });
            list = list.map(item => ({ ...item, key:   item.cid }))
            dispatch({
                type: COL_SAVE_TO_MEMORY,
                payload: {
                    list,
                    pagination: {
                        current: current,
                        ...pagination
                    },
                    loading: false
                }
            })
            message.success('共' + pagination.total + '条数据，本次查询到' + list.length + "条数据");
        } catch (e) {
            dispatch({
                type: COL_SAVE_TO_MEMORY,
                payload: {
                    loading: false
                }
            })
            message.error(e.message);
        }
    }
}

export function trigger_editor(data) {
    return {
        type: COL_SAVE_TO_MEMORY,
        payload: {
            editorData: data
        }
    }
}

export function del_items({ ids, del = 0 }) {
    return async (dispatch) => {

        if(ids.length==0){
            return  message.warning('请选择需要删除的数据');
        }
        try {
            let result = await college.del({ ids, del });
            notification.open({
                message: "操作成功",
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            })
            dispatch(get_list())
        } catch (e) {
            notification.open({
                message: "操作失败",
                description: e.message,
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            })
        }
    }
}
export function use_items({ ids, use = 1 }) {
    return async (dispatch) => {

        if(ids.length==0){
            return  message.warning('请选择需要操作的数据');
        }
        try {
            let result = await college.use({ ids, use });
            notification.open({
                message: "操作成功",
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            })
            dispatch(get_list())
        } catch (e) {
            notification.open({
                message: "操作失败",
                description: e.message,
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            })
        }
    }
}

export function select_row(selectedRowKeys){
    return {
        type: COL_SAVE_TO_MEMORY,
        payload: {
            selectedRowKeys
        }
    }
}