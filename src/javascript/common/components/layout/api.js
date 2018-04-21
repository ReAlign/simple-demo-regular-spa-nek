import { $get } from 'common/widget/request/ajax';

export const getUserInfo = () => $get('/api/userInfo');