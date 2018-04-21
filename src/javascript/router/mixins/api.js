import { $get } from 'common/widget/request/ajax';

// 获取权限
export const getUserOperationUrls = param => $get(
    '/api/operationUrlList',
    {
        data: param
    }
);