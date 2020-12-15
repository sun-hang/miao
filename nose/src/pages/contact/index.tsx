import React, { useEffect } from 'react'
import { showMap,remove } from '../../utils/tmapUtil'
import './index.less'
import { WechatOutlined, PhoneOutlined, MailOutlined, ClockCircleFilled } from '@ant-design/icons';
export default function index() {
    // showMap();
    useEffect(() => {
        showMap();
        return () => {
            remove();
        }
    }, [""])
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
                            <div className="icon-wrapper"><ClockCircleFilled className="icon" /></div>
                            <div className="text-wrapper">周一~周日（8:30~20:00）</div>
                        </div>
                    </div>
                    <div className="map-wrapper">
                        <div id="tmap-box">
                            {/* <iframe src="https://apis.map.qq.com/uri/v1/geocoder?coord=34.61505750245571,112.46432933729551&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77" frameBorder='0' height="100%" width="100%"></iframe> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
