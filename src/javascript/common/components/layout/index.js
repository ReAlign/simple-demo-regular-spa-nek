/**
 * @name    导航-菜单 组件
 * @author  hzanliangjun(hzanliangjun@corp.netease.com)
 * @since   2018-04-09
 */
import 'less/base.less';
import './index.less';

import _u from 'widget/util.js';

import router from '@/router/index';

import BaseComponent from 'common/base/BaseComponent';
import NavInfo from './components/nav-info/index';
import UserInfo from './components/user-info/index';
import SidebarMenu from './components/sidebar-menu/index';

import template from './index.html';
import Config from './config';

const Layout = BaseComponent.extend({
    template,
    config(data) {
        _u.extend(data, {
            menus: []
        });
    },

    async init() {
        const res = {
            data: {
                userBaseInfo: {
                    jobNo: '9527',
                    userName: 'ReAlign'
                },
                menus: [
                    {
                        menuName: 'index',
                        link: '/',
                        children: []
                    },
                    {
                        menuName: 'menuLevel1',
                        link: '/app',
                        children: [
                            {
                                menuName: 'page1',
                                link: '/page1',
                                children: []
                            },
                            {
                                menuName: 'page2',
                                link: '/page2',
                                children: []
                            }
                        ]
                    }
                ]
            }
        };
        this.cbGetUserInfo(res);
    },

    cbGetUserInfo(res) {
        const _d = res.data || {};

        this.setUserBaseInfo(_d.userBaseInfo || {});
        this.setMenuData(_d.menus || []);
    },

    setUserBaseInfo(_uInfo = {}) {
        const data = this.data;

        data.userInfo = window.userInfo = _uInfo;
    },

    setMenuData(menus) {
        this.data.menus = menus;

        this.$update();
    }
});

Layout.directive('fadeIn', (ele) => {
    const fadeIn = () => {
        if(ele.classList
            && (ele.classList.value || '').indexOf(Config.ANIMATION_CLASS) != -1) {
            ele.classList.remove(Config.ANIMATION_CLASS);
        }

        setTimeout(() => {
            ele.classList.add(Config.ANIMATION_CLASS);
        }, Config.DELAY.FADE_IN);
    };

    fadeIn();

    router.on('begin', fadeIn);
});

Layout.component('user-info', UserInfo);
Layout.component('nav-info', NavInfo);
Layout.component('sidebar-menu', SidebarMenu);

export default Layout;