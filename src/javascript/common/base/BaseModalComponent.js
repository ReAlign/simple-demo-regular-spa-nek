/* BaseModal */
import _ from 'widget/util.js';
import { KLModal } from 'nek-ui';
import filter from 'widget/filter.js';

const BaseModalComponent = KLModal.extend({
    config(data) {
        _.extend(data, {
            class: 'm-csai-modal-scrollbar',
            // 默认 modal 是 inject 到 body 上的
            // 可以手动设置要 inject 的节点
            // 注意 translate 问题，fixed 会失效
            // 优先取 $event，取不到，再去取 injectEl
            $event: '',         // regular $event
            injectEl: ''        // element id
        });

        this.supr(data);
    },

    init() {
        this.supr();

        const data = this.data;
        const $event = data.$event;

        if(this.$root === this) {
            if($event) {
                // 兼容 regular 原生的 $evnt 和 NEKUI 的 $event
                const _node = $event.e
                                ? $event.e.target.parentNode
                                : $event.target.parentNode;
                if(_node) {
                    this.$inject(_node);
                } else {
                    console.log('有接收到 $event，但是没有取到节点！！！');
                }
            } else if(data.injectEl) {
                this.$inject(document.getElementById(data.injectEl));
            } else {
                this.$inject(document.body);
            }
        }
    }
});

BaseModalComponent.filter(filter);

export default BaseModalComponent;