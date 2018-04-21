import {KLTable} from 'nek-ui';
import moment from 'moment';

const _format = (value, type) => {
    if(!value){
        return null;
    }

    let newValue = moment(value).isValid();
    if (!newValue) {
        return;
    }
    if (!type) {
        type = 'YYYY-MM-DD';
    }
    return moment(value).format(type);
};

/* 公用过滤器 */
const filter = {
    // 获取字符串长度，mode != 0 时汉字占两个字符
    length(value, mode = 0) {
        if (mode === 0) {
            return value.length;
        }
        return ((value && value.toString()) || '').replace(/[^\x00-\xff]/g, 'xx').length;
    },
    // 兼容https; 将图片资源的链接http://改为//;
    safeLink(url) {
        if (!url) {
            return '';
        }
        return url.replace(/^http:/i, '');
    },
    // 1/0转换为是否
    yesOrNo(value) {
        if(value === '' || value === null || value === undefined) {
            return '';
        }
        return (value === 0 || value === false) ? '否' : '是';
    },
    // 1/0转换为是否
    bool2Str(value) {
        if (value === '' || value === null || value === undefined) {
            return '';
        }
        return (value === 0 || value === false) ? '否' : '是';
    },
    returnOriginValue(value) {
        return value;
    },
    delDots: {
        set: (value) => {
            if (!value) {
                return value;
            }
            const pattDot = /[，]/g;
            return value.replace(pattDot, ',').replace(/ /g, '');
        },
        get: value => value
    },
    str2arr: {
        get: value => value,
        set: (value) => {
            if (Array.isArray(value)) {
                return value;
            }
            if (value === '' || value === null || value === undefined) {
                return [];
            }
            return String(value).split(',');
        }
    },
    format: value => _format(value),
    formatDateTime: {
        set(value) {
            return (value && value > 0) ? new Date(value).getTime() : '';
        },
        get(value) {
            return value ? _format(value, 'YYYY/MM/DD HH:mm:ss') : null;
        }
    },

    /**
     * 返回yyyy-MM-dd 00:00对应时间戳
     */
    formatDateTimeZero: {
        set(value) {
            return (value && value > 0) ? (new Date(value).getTime() - 8 * 60 * 60 * 1000) : '';
        },
        get(value) {
            return value ? _format(value, 'YYYY-MM-DD') : null;
        }
    },
    fixed(_data, _len = 2) {
        if(_data === '' || _data === null || typeof _data === 'undefined' || isNaN(_data)) {
            return '';
        }
        return parseFloat(Number(_data).toFixed(_len));
    },
    noDataFormat(value) {
        if (value || value === 0) {
            return value;
        }
        return '--';
    },
    percent(_data, _len = 2) {
        if(_data === '' || _data === null || typeof _data === 'undefined' || isNaN(_data)) {
            return '';
        }
        const value = parseFloat(Number(_data * 100).toFixed(_len));
        return `${value}%`;
    }
};
KLTable.filter(filter);
export default filter;

