const config = {};

config.CODE = 'retCode';
config.MSG = 'retDesc';
config.MSG_ERR_NOT_200 = '请求失败，（返回非 200）';
config.MSG_ERR_NO_RES = '请求失败，（无返回值）';

config.NProgressConfig = {
    parent: '#page',
    showSpinner: false,
    template: `<div class="bar u-progress u-progress-striped z-act" role="bar">
                    <div class="progress_bar" style="width: 100%;"></div>
                </div>`
};

export default config;