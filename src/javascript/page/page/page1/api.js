import { $get } from 'common/widget/request/ajax';

export const getInfo = () => $get('/api/page1/info');
export const getInfo2 = () => $get('/api/page1/info2');