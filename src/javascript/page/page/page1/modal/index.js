import _ from 'widget/util.js';

import BaseModalComponent from 'common/base/BaseModalComponent.js';

const App = BaseModalComponent.extend({
    config(data) {
        _.extend(data, {
            title: 'tips',
            width: 260,
            okButton: 'ok',
            content: 'Try the browser forward and backward'
        });

        this.supr(data);
    },

    ok() {
        this.destroy();
    }
});

export default App;