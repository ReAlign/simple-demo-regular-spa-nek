
function axiosCancelEvt() {
    if(window.RGLSPA.AxiosCancelList.length) {
        for(let i = 0; i < window.RGLSPA.AxiosCancelList.length; i++) {
            window.RGLSPA.AxiosCancelList[i] && window.RGLSPA.AxiosCancelList[i](window.RGLSPA.AxiosCancelText);
        }
    }

    window.RGLSPA.AxiosCancelList = null;
    window.RGLSPA.AxiosCancelList = [];
    window.RGLSPA.AxiosCancelCount = 0;
}

function implement(component) {
    component.implement({
        axiosCancelEvt
    });
};

export {
    implement,
    axiosCancelEvt
};