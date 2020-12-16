import React, { useEffect, useState } from 'react'
import './index.less';

import { Tag, Empty, Spin, Pagination } from 'antd';
import NavItem from '../../components/productComp/navItem';

import ProductItemDmo from '../../components/productComp/productItem';

/**
 * 获取标签的钩子函数
 */
const useTags = () => {
    let arr: any[] = [];
    const [tags, setTags] = useState(arr);
    useEffect(() => {
        fetch('/api/tags').then(res => res.json()).then(res => {
            if (res.data) {
                setTags(res.data);
            }
        })
    }, [""])
    return [tags, setTags]
}


export default function index() {

    const [isLoading, setIsLoading] = useState(false);

    // 定义标签dom数组
    let tagDoms: any[] = [];

    // 筛选条件的状态
    const [select, setSelect] = useState(tagDoms);

    // 定义产品列表
    const [productList, setProductList] = useState(tagDoms);

    let productListDom = productList.map((item, index) => {
        return (<ProductItemDmo key={index} item={item}></ProductItemDmo>)
    })

    // 获取产品数据
    useEffect(() => {
        setIsLoading(true);
        fetch('/api/product', {
            credentials: 'include'
        }).then(res => res.json()).then(res => {
            if (res.data) {
                setProductList(res.data);
            }
            setIsLoading(false);
        })
    }, [select[0], select[1], select[2], select[3]])

    // 使用自定义获取标签钩子函数
    const [tags, setTags] = useTags();

    // 标签映射dom
    if (Array.isArray(tags)) {
        tagDoms = tags.map((item, index) => {
            return (<NavItem title={item.name} tags={item.tags} key={item.name} select={select[index]} onChange={(item) => {
                select[index] = item;
                setSelect([...select]);
            }}></NavItem>)
        })
    }

    // 映射选中dom
    let selectDom = select.map((item, index) => {
        if (!item) {
            return ''
        }
        return (<Tag key={index} closable onClose={() => {
            select[index] = '';
            setSelect([...select]);
        }}>{item}</Tag>)
    })

    const onShowSizeChange = (current: number, pageSize: number) => {

    }

    return (
        <div className="product-wrapper">
            <div className="product-filter">
                <div className="title">
                    <h1>所有产品</h1>
                    <p className="mintitle">
                        温柔小方的杂货小铺
                    </p>
                </div>
                <div className="filter-wrapper">
                    {tagDoms}
                    <NavItem select={select[3]} title="价格" tags={[{ name: '0-50' }, { name: '50-100' }, { name: '100-200' }, { name: '200-500' }, { name: '500-1000' }, { name: '1000-2000' }, { name: '2000+' }]} onChange={(item) => {
                        select[3] = item;
                        setSelect([...select])
                    }} />
                    <div className="select-box">
                        <div className="left-title"><div><span>选中条件：</span></div></div>
                        <div style={{ width: '84%', lineHeight: '41px' }}>{selectDom}</div>
                    </div>
                </div>
            </div>
            <div className="product-list-wrapper">
                <div className="list-container">
                    <Spin size='large' spinning={isLoading} className="loading" />
                    <div className="list-inner-container">
                        {productListDom.length > 0 ? productListDom : (<Empty />)}
                    </div>
                    <div className="find-page">
                        <Pagination
                            
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={3}
                            total={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
