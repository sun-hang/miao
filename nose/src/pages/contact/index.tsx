import React from 'react'
import './index.less'
import { WechatOutlined, PhoneOutlined, MailOutlined, ClockCircleFilled } from '@ant-design/icons';
export default function index() {
    return (
        <div className="contact-wrapper">
            <div className="contact-container">
                <div className="contact-inner-wrapper">
                    <h1>联系我们</h1>
                    <p className="mintitle">温柔小方的杂货小铺</p>
                    <div className="items">
                        <div className="item">
                            <div className="icon-wrapper"><WechatOutlined className="icon" /></div>
                            <div className="text-wrapper">Y836560138</div>
                        </div>
                        <div className="item">
                            <div className="icon-wrapper"><PhoneOutlined className="icon" /></div>
                            <div className="text-wrapper">18603712713</div>
                        </div>
                        <div className="item">
                            <div className="icon-wrapper"><MailOutlined className="icon" /></div>
                            <div className="text-wrapper">836560138@qq.com</div>
                        </div>
                        <div className="item">
                            <div className="icon-wrapper"><ClockCircleFilled className="icon"/></div>
                            <div className="text-wrapper">周一~周日（8:30~20:00）</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
