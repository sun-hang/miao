import React from 'react'
import { useHistory } from 'umi';
import { Layout, BackTop, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN'
const { Header, Footer, Sider, Content } = Layout;
import MyHeader from '../components/header/index';
import MyFooter from '../components/footer/index';
let whiteList = ['/news', '/productdetails', '/about', '/contact', '/login', '/logon', '/product', '/userpage', '/shoppingcart'];
import './index.less';
/**
 * 用于判断当前路径是否是白名单
 * @param items 
 * @param target 
 */
function getPathIsTrue(items: string[], target: string) {
    let len = items.filter(item => {
        return target.startsWith(item)
    })
    return len.length === 0 && target !== '/'
}

/**
 * 用于页面是不存在时进行跳转
 * @param props 
 */
function jumpPage(props: any) {
    let history = useHistory();
    let pathname: string = props.location.pathname;
    // 用于跳转错误页
    let r = props.route.routes.find((item: any) => {
        return item.path === pathname;
    })

    if ((!r || getPathIsTrue(whiteList, pathname)) && pathname !== '/404') {
        history.push('/404')
    }
}




const index = (props: any) => {
    // 如果路径不存在进行跳转404页面
    jumpPage(props);

    // 腾讯地图加载
    // tMapInit();

    return (
        <ConfigProvider locale={zhCN}>
            <Layout className="page" >
                <Header className="out-header-wrapper">
                    <MyHeader />
                </Header>
                <Content className="container-wrapper" >
                    {props.children}
                    <BackTop visibilityHeight={200} style={{ right: "0", top: '0', bottom: "0", margin: "auto" }}><div style={{
                        height: 40,
                        width: 40,
                        lineHeight: '40px',
                        borderRadius: 4,
                        backgroundColor: '#1088e9',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 14,
                    }}>UP</div></BackTop>
                </Content>
                <Footer style={{ background: 'rgba(255,255,255,.6)' }}>
                    <MyFooter />
                </Footer>
            </Layout>
        </ConfigProvider>
    )
}
export default index;