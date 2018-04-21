import NEKUI from 'nek-ui';

const DURATION = 3000;

function showTips(msg, state, duration = DURATION, onclose) {
    NEKUI.KLNotify[state](msg, duration);
    if (onclose && typeof onclose === 'function') {
        NEKUI.KLNotify.notify.$on('close', (evt) => {
            onclose(evt);
        });
    }
}

function info(msg, duration = DURATION, onclose) {
    showTips(msg, 'info', duration, onclose);
}

function warning(msg, duration = DURATION, onclose) {
    showTips(msg, 'warning', duration, onclose);
}

function success(msg, duration = DURATION, onclose) {
    showTips(msg, 'success', duration, onclose);
}

function error(msg = '服务器异常，请稍后再试', duration = DURATION, onclose) {
    showTips(msg, 'error', duration, onclose);
}

function implement(component) {
    component.implement({
        showTips,
        info,
        warning,
        success,
        error
    });
};

export {
    implement,
    info,
    warning,
    success,
    error,
    showTips
};