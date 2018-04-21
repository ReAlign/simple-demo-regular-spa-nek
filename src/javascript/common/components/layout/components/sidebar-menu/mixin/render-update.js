export default (Component) => {
    Component.implement({
        updateMenusData(pathname = '', reset = true) {
            const data = this.data;

            (data.menus || []).forEach((menu) => {
                (menu.children || []).forEach((item) => {
                    item.open = reset
                                ? item[data.routerKey] === pathname
                                : false;
                    menu.open = reset
                                // 缓存一级菜单打开状态，只要有打开过，就不关闭
                                ? menu.open
                                    || (
                                        // 完全匹配二级菜单
                                        (item[data.routerKey] === pathname)
                                        // 一级菜单匹配
                                        || (pathname.indexOf(menu[data.routerKey]) == 0)
                                        )
                                : false;
                });
            });
        },

        changeAllAboutMenus(pathname, { flag = true } = {}) {
            const data = this.data;

            this.updateMenusData(pathname, flag);
            if(!data.clickFlag) {
                data.showFlag = flag;
            }

            if(flag) {
                data.clickFlag = false;
            }

            this.$update();
        }
    });
};