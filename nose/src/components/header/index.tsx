import React from 'react'
import { Link, NavLink } from 'umi';
import { Row, Col } from 'antd';

import './index.less';
export default function index() {
    let logSrc = require('../../../public/1.webp')
    return (
        <>
            <Row className="inner-header-wrapper">
                <Col className="log"><NavLink to='/'>
                    <img className="log-img" src={logSrc} alt="" />
                </NavLink></Col>
                <Col>
                    <Row>



                        <Col>
                            <ul className="nav-box">
                                <li className="nav-item"><NavLink to='/'><p>首页</p></NavLink></li>
                                <li className="nav-item"><NavLink to='/'>产品</NavLink></li>
                                <li className="nav-item"><NavLink to='/'>新闻</NavLink></li>
                                <li className="nav-item"><NavLink to='/'>关于</NavLink></li>
                                <li className="nav-item"><NavLink to='/'>联系</NavLink></li>
                            </ul>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}