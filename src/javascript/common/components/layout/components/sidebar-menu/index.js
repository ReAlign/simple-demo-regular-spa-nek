/**
 * @name    边栏-菜单 组件
 * @author  hzanliangjun(hzanliangjun@corp.netease.com)
 * @since   2018-04-09
 */
import './index.less';

import _u from 'widget/util.js';
import _lod from 'lodash';
import router from '@/router/index';
import RenderUpdate from './mixin/render-update';

import BaseComponent from 'common/base/BaseComponent';

import template from './index.html';
import Config from './config';

const App = BaseComponent.extend({
    template,
    config(data) {
        _u.extend(data, {
            routerObj: router,
            iconPrefix: 'csai-icon-',
            titleKey: 'menuName',
            pageKey: 'menuName',
            routerKey: 'link',
            urlKey: 'link',
            menus: [],
            firstRender: true,      // 首次拿到数据渲染
            showFlag: false,        // 完全更新菜单，只更新数据没用
            clickFlag: false        // 点击切换标记，避免点击的时候出现闪烁
        });

        this.baseWatch();

        this.supr(data);
    },

    baseWatch() {
        const self = this;
        const data = this.data;

        this.$watch('menus', (val) => {
            if(data.firstRender && val && val.length) {
                self.renderMenu(data.menus);
                data.firstRender = false;
                self.$update();
            }
        });
    },

    renderMenu(menus = []) {
        const data = this.data;
        data.menus = _lod.cloneDeep(menus || []);

        this.watchers();
        this.joinItem2FullMenu();
        this.renderMenuIcon();
        this.renderMenuState();
    },

    watchers() {
        const self = this;
        const data = this.data;
        this.$watch('routerObj.history.curPath', (nVal) => {
            !data.clickFlag && self.renderMenuState(nVal);
        });
    },

    joinItem2FullMenu() {
        const data = this.data;

        data.menus.forEach((menu) => {
            let prefixLink = _lod.trimEnd((menu[data.routerKey] || ''), '/');
            menu.children.forEach((item) => {
                item[data.routerKey] = prefixLink + item[data.routerKey];
            });
        });

        this.$update();
    },

    renderMenuIcon() {
        const data = this.data;

        (data.menus || []).forEach((menu) => {
            menu.iconClass = `iconfont ${data.iconPrefix}${Config.ICON_KEY[menu[data.titleKey]]}`;
        });
    },

    renderMenuState(pathname = '') {
        const self = this;
        pathname = pathname || location.pathname;

        this.changeAllAboutMenus(pathname, { flag: false });

        setTimeout(() => {
            self.changeAllAboutMenus(pathname);
        }, Config.DELAY.RENDER_MENU);
    },

    menuItemEvt($event) {
        const data = this.data;
        data.clickFlag = true;

        this.renderMenuState($event.data.route);
    }
});

App.use(RenderUpdate);

export default App;