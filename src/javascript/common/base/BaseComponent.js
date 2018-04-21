/* BaseComponent */
import Regular from 'regularjs';
import BaseMixin from './mixin/_mixin';
import filter from 'widget/filter';

const BaseComponent = Regular.extend({
    enter() {
        //
    },

    config(data) {
        this.supr(data);
    },

    leave() {
        this.axiosCancelEvt();
        this.destroy();
        this.$phase = 'destroyed';
    }
});

BaseComponent.use(BaseMixin);
BaseComponent.filter(filter);

export default BaseComponent;