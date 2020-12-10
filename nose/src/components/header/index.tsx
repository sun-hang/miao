import React from 'react'
import { Link, NavLink, history, connect } from 'umi';
import { Row, Col, Input, Button, Badge, Popover } from 'antd';
import { ShoppingCartOutlined, DownOutlined, UserOutlined, PoweroffOutlined, AccountBookOutlined } from '@ant-design/icons';
const { Search } = Input;
import './index.less';

const UserList = (<>
    <div className="user-item">
        <NavLink to="/userpage">
            <UserOutlined />个人资料
        </NavLink>
    </div>
    <div className="user-item">
        <NavLink to="/shoppingcart">
            <AccountBookOutlined />我的订单
        </NavLink>
    </div>
    <div className="user-item"><NavLink to="/">
        <PoweroffOutlined />安全退出
    </NavLink></div>
</>)

const header = function (props: any) {
    let logSrc = require('../../../public/1.webp');
    let userinfo: any = props.userinfo;
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
                        {(userinfo == null ? (<>
                            <Button type="text" onClick={() => {
                                history.push('/login')
                            }}>登录</Button>
                            <Button type="text" onClick={() => {
                                history.push('/logon')
                            }}>注册</Button>
                        </>) : (<Popover className="userinfo-popover" content={UserList} trigger="click">
                            <Button type="text">{userinfo.loginUser} <DownOutlined style={{ fontSize: '10px' }} /></Button>
                        </Popover>))}
                        <Popover placement="bottomRight" trigger="hover" title={"购物车"}>
                            <Badge count={2}>
                                <ShoppingCartOutlined style={{ fontSize: '18px' }} />
                            </Badge>
                        </Popover>
                    </div>
                    <div className="search-box">
                        <Search bordered={false} placeholder="请输入要搜索的文字" />
                    </div>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        userinfo: state.userinfo.userinfo
    }
}

export default connect(mapStateToProps)(header);