let _ = {
    // 简化版的对象转request参数，_object对象必须只有一级，如{name: 'xxx', age: 18}
    object2query(obj) {
        let arr = [];
        for (let key of Object.keys(obj)) {
            let value = encodeURIComponent(obj[key]);
            arr.push(`${key}=${value}`);
        }
        return arr.join('&');
    },
    toQueryString(obj) {
        let keys = obj && Object.keys(obj);
        let params;
        if (keys && keys.length > 0) {
            params = keys.map(key => `${key}=${obj[key]}`).join('&');
        }
        return params;
    },
    extend(o1 = {}, o2 = {}, override) {
        for (let i in o2) {
            if (o1[i] === undefined || override) {
                o1[i] = o2[i];
            }
        }
        return o1;
    },
    filterParam(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!obj[key] && obj[key] !== 0 && obj[key] !== false || (this.isArray(obj[key]) && obj[key].length === 0)) {
                    delete obj[key];
                }
            }
        }
    },
    isArray(arr) {
        return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
    },
    getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
        const r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
        return null;
    },
    getBaseUrl() {
        let systemName = window.location.href.match('sc-.+\\/') && window.location.href.match('sc-.+\\/')[0] || '';
        let baseUrl = '';
        // 接口前缀统一处理
        if (systemName) {
            baseUrl = `/${systemName}api`;
        } else {
            // 公共模块
            baseUrl = '/common/menu';
        }
        return baseUrl;
    },
    /**
     * 压缩regular模版
     * @param htmlstr
     * @returns {XML|string}
     * add by xuejimiao 2016/02/25
     */
    compressHtml(htmlstr) {
        //防止nej打包模版后报错
        if (typeof htmlstr !== 'string') {
            return htmlstr;
        }
        htmlstr = htmlstr.replace(/(?:\r\n|\r|\n)/g, '');

        let htmlStrArrs,
            onHTML = false,
            onRegularExpression = false;
        htmlStrArrs = htmlstr.split('');
        return htmlStrArrs.map((item) => {
            if (item === '<') {
                onHTML = true;
            } else if (item === '>') {
                onHTML = false;
                return item;
            } else if (item === '{') {
                onRegularExpression = true;
            } else if (item === '}') {
                onRegularExpression = false;
                return item;
            }

            if (onHTML || onRegularExpression || !/[\n\s]/g.test(item)) {
                return item;
            }
        }).join('');
    },
    download(url) {
        let a = document.createElement('a');
        a.href = url;
        a.download = url;
        a.click();
    },
    str2arr(value) {
        if (Array.isArray(value)) {
            return value;
        }
        if (value === '' || value === null || value === undefined) {
            return [];
        }
        return String(value).split(',');
    },

    cloneObject(obj) {
        if (!obj) {
            return obj;
        }

        let newObj = obj;
        try {
            newObj = JSON.parse(JSON.stringify(obj));
        } catch(e) {
            console.error('cloneObject错误: 非法的json对象');
        }
        return newObj;
    },

    ////////////////////////////////////////////////////////////////////////////

    typeOf(o) {
        return o == null
                ? String(o)
                : ({}).toString.call(o).slice(8, -1).toLowerCase();
    },

    arrayContainsVal(arr, val) {
        if(!arr || !val) {
            return false;
        }

        return arr.indexOf(val) !== -1;
    },

    deepClone(obj) {
        /* eslint-disable */
        let cloneObj = function(obj) {
            let result = {}, item, type;
            for(let i in obj) {
                item = obj[i];
                type = _.typeOf(item);
                if(type === 'object') {
                    result[i] = cloneObj(item);
                } else if(type === 'array') {
                    result[i] = cloneArray(item);
                } else {
                    result[i] = item;
                }
            }

            return result;
        };

        let cloneArray = function(obj){
            let result = [], item, type;
            for(let i = 0; i < obj.length; i++) {
                item = obj[i];
                type = _.typeOf(item);
                if(type === 'object'){
                    result[i] = cloneObj(item);
                }else if(type === 'array'){
                    result[i] = cloneArray(item);
                }else if(typeof item !== 'object'){
                    result[i] = item;
                }
            }
            return result;
        };

        let type = _.typeOf(obj);
        switch(type){
            case 'object':
                return cloneObj(obj);
            case 'array':
                return cloneArray(obj);
            default:
                return obj;
        }
        /* eslint-enable */
    },

    /**
     * 计算文字个数(中文算一个,英文算半个)
     * @param str
     * @returns {number}
     */
    countCharLen(str) {
        let charLen = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 255) {
                charLen += 1;
            } else {
                charLen += 0.5;
            }
        }
        charLen = Math.ceil(charLen);
        return charLen;
    },

    /**
     * 当前时间 增加天数
     * @param options
     *        num        num < 0为过去时间
     *        stamp      是否以时间戳显示
     *        showTime   是否显示具体时间
     *        midnight   当前零点
     *        lastSecond 最后一秒
     * @param str      时间
     * @returns {*}
     */
    currentDateAddDays(options, str) {
        options = options || {};
        str = str || null;
        options = _.extend(options, {
            num: 0,
            stamp: false,
            showTime: false,
            midnight: false,
            lastSecond: false
        });

        let dateStr, years, months, days, times, hours, minutes, seconds;
        let date = str
                    ? new Date(str)
                    : new Date();

        date.setDate(date.getDate() + options.num);
        if(!options.stamp) {
            years = date.getFullYear();
            months = _.fmtclc(date.getMonth() + 1);
            days = _.fmtclc(date.getDate());

            if (options.midnight) {
                times = ' 00:00:00';
            } else if (options.lastSecond) {
                times = ' 23:59:59';
            } else {
                if (options.showTime) {
                    hours = _.fmtclc(date.getHours());
                    minutes = _.fmtclc(date.getMinutes());
                    seconds = _.fmtclc(date.getSeconds());
                    times = ` ${hours}:${minutes}:${seconds}`;
                } else {
                    times = '';
                }
            }

            dateStr = `${years}-${months}-${days}${times}`;
            return dateStr;
        }
        return date;
    },

    /**
     * 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
     * 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
     * diffType 默认day
     * 返回精度为：秒，分，小时，天
     */
    getDateDiff(startTime, endTime, diffType) {
        // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
        startTime = startTime.replace(/-/g, '/');
        endTime = endTime.replace(/-/g, '/');
        // 将计算间隔类性字符转换为小写
        diffType = diffType || 'day';
        diffType = diffType.toLowerCase();
        let sTime = new Date(startTime); // 开始时间
        let eTime = new Date(endTime); // 结束时间
        // 作为除数的数字
        let divNum = 1;
        switch (diffType) {
            case 'second':
                divNum = 1000;
                break;
            case 'minute':
                divNum = 1000 * 60;
                break;
            case 'hour':
                divNum = 1000 * 3600;
                break;
            case 'day':
                divNum = 1000 * 3600 * 24;
                break;
            default:
                break;
        }
        return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
    },

    formatDate(str, timeFlag, opr1, opr2) {
        if (!str) {
            return '';
        }

        timeFlag = timeFlag ? timeFlag : (timeFlag == false ? timeFlag : false);
        opr1 = opr1 || '-';
        opr2 = opr2 || ':';

        let dateStr, timeStr, years, months, days, hours, minutes, seconds;

        let date = new Date(str);

        years = date.getFullYear();
        months = _.fmtclc(date.getMonth() + 1);
        days = _.fmtclc(date.getDate());
        hours = _.fmtclc(date.getHours());
        minutes = _.fmtclc(date.getMinutes());
        seconds = _.fmtclc(date.getSeconds());


        dateStr = years + opr1 + months + opr1 + days;
        timeStr = `${dateStr} ${hours}${opr2}${minutes}${opr2}${seconds}`;

        return timeFlag ? timeStr : dateStr;
    },

    /**
     * 补全时间格式 9月 ——> 09
     * @param t
     * @returns {string}
     * @private
     */
    fmtclc(t) {
        return t ? (t > 9 ? t : `0${t}`) : (t == '0' ? '00' : '');
    },

    objectStringTrim(obj) {
        if(!obj) {
            return false;
        }

        let _obj = {};

        Object.keys(obj).forEach((k) => {
            _obj[k] = (_.typeOf(obj[k]) == 'string' && obj[k].length)
                        ? obj[k].trim()
                        : obj[k];
        });

        return _obj;
    },

    /**
     * 简单判断某字符串是否为json  避免js报错
     * @param string
     * @returns {boolean}
     */
    JSONParse(string) {
        try {
            return JSON.parse(string);
        } catch (e) {
            return false;
        }
    }
};

export default _;
