/**
 * @name    nek 组件辅助dom操作
 * @author  安亮军（hzanliangjun@corp.netease.com）
 * @since   2018-04-09
 *
 * @description
 *
 * nek 组件的 ref 没有抛出
 * 有需要取 dom 的地方，就略显尴尬了
 * 所有就有了这个东西
 *
 */
import Regular from 'regularjs';
const rDom = Regular.dom;

const config = {
    DELAY: {
        FOCUS: 30
    }
};

const _ = {
    $cls(cls = '') {
        return document.getElementsByClassName(cls);
    },
    $cEl(name = '') {
        return document.createElement(name);
    },
    $cAttr(key = '') {
        return document.createAttribute(key);
    },
    focus(str = '') {
        setTimeout(() => {
            const _dom = rDom.find(str);

            if(_dom) {
                _dom.focus();
            } else {
                console.warn(`￣へ￣，node ${str} does not exist！！！`);
            }
        }, config.DELAY.FOCUS);
    },

    inputFocus(cls = '') {
        _.focus(`.${cls} .input_wrap .input`);
    }
};

export default _;
