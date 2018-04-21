import restate from 'regular-state';
import Layout from 'common/components/layout';

import Index from './pages/index';
import Page from './pages/page.js';

const manager = restate()
    .state({
        app: {
            url: '',
            view: Layout
        }
    })
    .state(Index)
    .state(Page);

export default manager;
