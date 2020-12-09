import React from 'react'
import { Link, NavLink } from 'umi';
import { Row, Col, Input } from 'antd';
const { Search } = Input;
import './index.less';
export default function index() {
    let logSrc = require('../../../public/1.webp')
    return (
        <>
            <Row className="inner-header-wrapper">
                <Col className="log">
                    <NavLink to='/' className="log-img-box">
                        <img className="log-img" src={logSrc} alt="" />
                    </NavLink>
                </Col>
                <Col className="nav-list-box" push={5}>
                    <Row>
                        <Col>
                            <ul className="nav-box">
                                <li className="nav-item"><NavLink exact activeClassName="nav-action" to='/'><p>首页</p><p>HOME</p></NavLink></li>
                                <li className="nav-item"><NavLink exact activeClassName="nav-action" to='/product'><p>产品</p><p>PRODUCT</p></NavLink></li>
                                <li className="nav-item"><NavLink exact activeClassName="nav-action" to='/news'><p>新闻</p><p>NEWS</p></NavLink></li>
                                <li className="nav-item"><NavLink exact activeClassName="nav-action" to='/about'><p>关于</p><p>ABOUT</p></NavLink></li>
                                <li className="nav-item"><NavLink exact activeClassName="nav-action" to='/contact'><p>联系</p><p>CONTACT</p></NavLink></li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
                <Col push={6}>
                    <div className="userinfo-box">

                    </div>
                    <div className="search-box">
                        <Search placeholder="请输入要搜索的文字"/>
                    </div>
                </Col>
            </Row>
        </>
    )
}