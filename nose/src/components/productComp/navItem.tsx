import React, { useState } from 'react'
import './navItem.less';
import { Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
interface MyPrors {
    title: string
    tags: any[]
    select: string
    onChange: (item: string) => void
}
const navItem: React.FC<MyPrors> = (props) => {
    const [className, setClassName] = useState(false);
    const tagDoms = props.tags.map((item: any) => {
        return (<Tag className={'tag-item ' + (props.select === item.name ? "active" : '')} key={item.name} onClick={() => {
            props.onChange(item.name);
        }}>{item.name}</Tag>)
    })
    return (
        <div className={"nav-item-wrapper " + (className ? "active" : "")}>
            <div className="nav-item-container">
                <div className="left-title">
                    <div><span>{props.title}</span></div>
                </div>
                <div className="tags">
                    {tagDoms}
                </div>
                <div className="controller-box" onClick={() => {
                    setClassName(!className)
                }}>
                    更多<DownOutlined />
                </div>
            </div>
        </div>
    )
}

export default navItem