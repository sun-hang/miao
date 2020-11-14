// 链表练习
function Node(value) {
    this.value = value;
    this.next = null;
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');

a.next = b;
b.next = c;

/**
 * 打印链表
 * @param {*} root 
 */
function print(root) {
    if (!root) { return; }
    console.log(root.value)
    print(root.next);
}

/**
 * 获取链表长度
 */
function getLength(root) {
    if (!root) { return 0; }
    return 1 + getLength(root.next);
}

/**
 * 从下标获取值
 */
function getIndexValue(root, index) {
    if (!root) { return null }
    function _getIndexValue(node, i) {
        if (!node) { return null };
        if (i === index) {
            return node.value
        }
        return _getIndexValue(node.next, i + 1);
    }
    return _getIndexValue(root, 0);
}

/**
 * 删除指定位置的值
 */
function removeNode(root, index) {
    if (!root || !root.next) { return; }
    function _removeNode(node, i) {
        if (!node.next) { return }
        if ((i + 1) === index) {
            node.next = node.next.next;
        } else {
            _removeNode(node.next, i + 1);
        }
    }
    _removeNode(root, 0);
}

/**
 * 删除指定值的节点
 */
function removeValue(root, value) {

}
/**
 * 末尾添加值
 */

/**
 * 设置指定位置的值
 */

/**
 * 指定位置添加值
 */

/**
 * 链表倒置
 */
// print(a);
// console.log(getLength(a));
// console.log(getIndexValue(a, 0))

const fs = require('fs');
const path = require('path');
(async () => {
    try {
        let data = await fs.promises.stat('./abc.json');
    } catch (error) {
        console.log(error)
    }
    // console.log(data);
})()
// console.log(1111)
// console.log(__dirname)
// console.log(path.resolve(__dirname,'files/a.js'))
console.log(process.versions)