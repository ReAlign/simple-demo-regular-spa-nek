import * as Notify from 'common/base/mixin/notify';
import * as AxiosCancel from 'common/base/mixin/axios-cancel';

export default (Component) => {
    Component.implement(Notify);
    Component.implement(AxiosCancel);
};