import React from 'react'
import { useHistory } from 'umi';
let whiteList = ['/news', '/productdetails'];

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

    if ((!r || getPathIsTrue(whiteList, pathname)) && !pathname.startsWith('/news')  && pathname !== '/404') {
        history.push('/404')
    }
}


const index = (props: any) => {

    jumpPage(props);

    return (
        <div>
            <h1>这是布局添加的</h1>
            {props.children}
        </div>
    )
}
export default index;