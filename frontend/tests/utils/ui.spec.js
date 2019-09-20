import store from '@/store';
import * as homeTypes from '@/store/home/types';
import * as uiUtils from '@/utils/ui';


describe('utils/ui/showNotification', () => {
    beforeEach(() => {
        window.vueApp = {
            $toast: jest.fn(),
        };
    });

    it('default params', () => {
        uiUtils.showNotification('success', 'msg');
        expect(window.vueApp.$toast).toHaveBeenCalledWith('msg', {
            title: null,
            color: 'success',
            icon: 'mdi-check-circle',
            timeout: 4000,
            x: 'right',
            y: 'top',
            autoHeight: true,
        });
    });

    it('custom params', () => {
        uiUtils.showNotification('error', 'msg', 'title', 10000);
        expect(window.vueApp.$toast).toHaveBeenCalledWith('msg', {
            title: 'title',
            color: 'error',
            icon: 'mdi-alert',
            timeout: 10000,
            x: 'right',
            y: 'top',
            autoHeight: true,
        });
    });
});


describe('utils/ui/requestErrorNotification', () => {
    const action = 'some_action';

    beforeEach(() => {
        uiUtils.showNotification = jest.fn();
    });


    it('401', () => {
        const response = {
            status: 401,
            data: {},
        };

        uiUtils.requestErrorNotification(response, action);
        expect(uiUtils.showNotification).not.toHaveBeenCalled();
    });

    // it('403', () => {
    //     const response = {
    //         status: 403,
    //         data: {},
    //     };
    //
    //     uiUtils.requestErrorNotification(response, action);
    //     expect(uiUtils.showNotification).toHaveBeenCalledWith('error', expect.any(String));
    // });
    //
    // it('404', () => {
    //     const response = {
    //         status: 403,
    //         data: {},
    //     };
    //
    //     uiUtils.requestErrorNotification(response, action);
    //     expect(uiUtils.showNotification).toHaveBeenCalledWith('error', expect.any(String));
    // });
    //
    // it('custom error', () => {
    //     const response = {
    //         status: 500,
    //         data: {
    //             code: '1000',
    //             message: 'message',
    //         },
    //     };
    //
    //     uiUtils.requestErrorNotification(response, action);
    //     expect(uiUtils.showNotification).toHaveBeenCalledWith('warning', expect.any(String),
    //         expect.any(String), expect.any(Number));
    // });
    //
    // it('unknown error', () => {
    //     const response = {
    //         status: 500,
    //         data: {},
    //     };
    //
    //     uiUtils.requestErrorNotification(response, action);
    //     expect(uiUtils.showNotification).toHaveBeenCalledWith('error', expect.any(String));
    // });
});


describe('utils/ui/showPageLoader', () => {
    let promise;

    beforeEach(() => {
        promise = new Promise((resolve) => {
            resolve();
        });
        store.commit = jest.fn();
    });


    it('without callback', () => uiUtils.showPageLoader([promise]).then(() => {
        expect(store.commit).toHaveBeenNthCalledWith(1, homeTypes.START_LOADING);
        expect(store.commit).toHaveBeenNthCalledWith(2, homeTypes.STOP_LOADING);
    }));

    it('with callback', () => {
        const callback = jest.fn();

        return uiUtils.showPageLoader([promise], callback).then(() => {
            expect(store.commit).toHaveBeenNthCalledWith(1, homeTypes.START_LOADING);
            expect(store.commit).toHaveBeenNthCalledWith(2, homeTypes.STOP_LOADING);
            expect(callback).toHaveBeenCalled();
        });
    });

    it('single promise', () => uiUtils.showPageLoader(promise).then(() => {
        expect(store.commit).toHaveBeenNthCalledWith(1, homeTypes.START_LOADING);
        expect(store.commit).toHaveBeenNthCalledWith(2, homeTypes.STOP_LOADING);
    }));
});
