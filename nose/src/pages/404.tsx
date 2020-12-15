import React from 'react'
import { Result, Button } from 'antd';
import { NavLink } from 'umi';
export default function index() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="404 您找的资源不存在"
            extra={<Button type="primary"><NavLink to="/">返回首页</NavLink></Button>}
        ></Result>
    )
}
