/* BaseComponent */
import Regular from 'regularjs';
import filter from 'widget/filter';

const BaseComponent = Regular.extend({
    enter() {
        //
    },

    config(data) {
        this.supr(data);
    },

    leave() {
        this.destroy();
        this.$phase = 'destroyed';
    }
});

BaseComponent.filter(filter);

export default BaseComponent;