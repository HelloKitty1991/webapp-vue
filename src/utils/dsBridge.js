/* eslint-disable */

import dsbridge from 'dsbridge';
import { lodashUtils } from '@/utils';

/**
 * @desc dsBridge中间件，防止开发环境阻塞
 * @param { function } promiseFn 调用原生的方法
 * @param { object } mock 模拟原生调用成功返回数据
 * @param { boolean } devDisable 是否在开发环境的真机上执行
 * @return {Promise<any>|*}
 */
function dsMiddleware(promiseFn, mock, devDisable) {
    // 模拟环境
    if (process.env.NODE_ENV === 'development' && (window.location.hostname === 'localhost' || devDisable)) {
        if (Object.prototype.toString.call(mock) === '[object Object]') {
            if (Object.prototype.toString.call(promiseFn) === '[object Promise]') {
                return Promise.resolve(mock);
            }
            return mock;
        }
        if (Object.prototype.toString.call(mock) === '[object Function]') {
            return mock();
        }
        return mock;
    }
    // 非模拟环境
    return promiseFn();
}

/**
 * @des 关闭Webview
 * @param params
 * @return {Promise<any>}
 */

export const dsCloseWebview = () => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('setWebviewClose', {}, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
);

/**
 * @desc 调用位置定位服务
 * @return {Promise<any>}
 */
export const dsUseLocation = (iparams = {}) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        // console.log('dsUseLocation-enter');
        dsbridge.call('useLocation', iparams, ({ code, data, msg }) => {
            // console.log('dsUseLocation-cb');
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
    {
        areaCode: 330101,
        city: '成都市',
        lng: '104.066001',
        lat: '30.554300',
        province: '四川省',
        area: '阿西吧区',
    },

);

/**
 * @desc 调用分享
 * @return {Promise<any>}
 */
export const dsUseShare = (options = {}) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useShare', options, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
);

/**
 * @desc 调用支付
 * @return {Promise<any>}
 */
export const dsUsePayServe = (options) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('usePayServe', options, ({ code, msg }) => {
            if (code === 0) {
                resolve();
            } else {
                reject(msg);
            }
        });
    }),
    Promise.resolve(),
);

export const dsUseSwitchVehicle = (payload = {}) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useSwitchVehicle', payload, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
    {
        vehicleId: 10568966,
    },
);


export const setJumpToAppPage = ({ name }) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('setJumpToAppPage', { name }, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
);

export const dsEditVehicle = () => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useEditVehicle', {}, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
    {
        vehicleId: '10171531',
    },
);

export const dsGetCurrentVehicle = () => dsMiddleware(
    () => dsbridge.call('getCurrentVehicle', {}),
    {
        id: '11139840',
        brand: '凯德拉克',
        serial: 'XT5',
        model: '2018 两驱豪华',
        productType: 'div',
        plateNumber: '川AT848K',
        isAuth: '0',
    },
);

export const dsGetVehicleList = () => dsMiddleware(
    () => dsbridge.call('getVehicleList', {}),
    [{
        id: '11139840',
        brand: '凯德拉克',
        serial: 'XT5',
        model: '2018 两驱豪华',
        productType: 'div',
        plateNumber: '川AT848K',
        isAuth: '0',
    }],
);

export const dsUseClipboard = ({ content }) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useClipboard', { content }, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
    {},
);

export const dsUseWebview = ({
    url,
    title,
}) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useWebview', {
            url,
            title,
        }, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
);

export const dsSetTabBar = ({ visible }) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('setTabBar', { visible }, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
);

export const dsUseImagePreview = ({
    images,
    index,
}) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useImagePreview', { images, index }, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
);

export const dsSetNavBarStatus = ({
    visible,
}) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('setNavBarStatus', { visible }, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
);

export const dsGetDeviceData = () => dsMiddleware(
    () => dsbridge.call('getDeviceData', {}),
    {
        fingerprint: 'DEV',
        version: '6.3.7',
        statusBarHeight: 40,
        navBarHeight: 40,
        tabBarHeight: 40,
    },
);

export const dsGetGroupData = () => dsMiddleware(
    () => {
        const data = dsbridge.call('getGroupData', {});
        return data;
    },
    { community: 'A' },
);

export const dsUseAppStorage = (params) => dsMiddleware(
    () => {
        const state = dsbridge.call('useAppStorage', params);
        if (state) { return state.value; }
        return null;
    },
    () => {
        const storage = {
            oilNo: 95,
            helpNew: '[]',
        };
        return storage[params.key];
    },
);
// useShareRefuelCard
export const dsUseShareRefuelCard = (params) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useShareRefuelCard', params, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
    () => {
        const storage = {
            oilNo: 95,
        };
        return storage[params.key];
    },
);

export const dsUseMapNavigation = (params) => dsMiddleware(
    () => {
        return dsbridge.call('useMapNavigation', params);
    },
);

export const dsRegLoginStatusChange = (cb) => dsMiddleware(
    () => {
        dsbridge.register('regLoginStatusChange', cb);
    },
    // () => {
    //     cb({ isLogin: '0' });
    // },
);

export const dsRegTabBarChange = (cb) => dsMiddleware(
    () => {
        dsbridge.register('regTabBarChange', cb);
    },
    () => {
        const list = ['COMMUNITY', 'HOME'];
        let index = 1;
        setInterval(() => {
            cb({ key: list[index], value: '123' });
            if (index === list.length - 1) {
                index = 0;
            } else {
                index += 1;
            }
        }, 5000);
    },
);

export const dsRegConnectionListener = (cb) => dsMiddleware(
    () => {
        dsbridge.registerAsyn('regConnectionListener', cb);
    },
    () => {

    },
);

export const dsRegGoBackListener = (cb) => dsMiddleware(
    () => {
        dsbridge.register('regGoBackListener', cb);
    },
    () => {

    },
);

/**
 * 图片、视频选择器
 * @param params
 * @return {Promise<any>|*}
 */
export const dsUseMediaSelectView = (params = {}) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useMediaSelectView', params, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
    () => {
        // { type: 'video', url: '' }
        return [{
            type: 'image',
            poster: 'http://file.dev.div.com/api/file/5d1b15317374cb000d4ea992/',
            duration: '10',
            url: 'http://div-app-vod-cdn.div.com/9ca75e4935674611bea29a3d19eb2795/8aae3f91dcb949e7907284e6322a0578-454eaae832b5efdee4632e0fb6374523-sd.mp4',
        }];
    },
);

/**
 * 图片、视频上传阿里云，与dsUseMediaSelectView一起使用
 * @param params
 * @return {Promise<any>|*}
 */
export const dsUseUploadMedia = (params = {}) => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useUploadMedia', params, ({ code, data, msg }) => {
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        });
    }),
    () => {
        // { type: 'video', url: '' }
        return [{
            type: 'image',
            poster: 'http://file.dev.div.com/api/file/5d1b15317374cb000d4ea992/',
            duration: '10',
            url: 'http://div-app-vod-cdn.div.com/9ca75e4935674611bea29a3d19eb2795/8aae3f91dcb949e7907284e6322a0578-454eaae832b5efdee4632e0fb6374523-sd.mp4',
        }];
    },
);

/**
 * 获取当前网络环境类型
 */
export const dsGetConnectionType = () => dsMiddleware(
    () => {
        const data = dsbridge.call('getConnectionType', {});
        if (data && data.type) {
            return data.type;
        }
        return null;
    },
    'other',
);

export const dsGetToken = () => dsMiddleware(
    () => {
        const data = dsbridge.call('getToken', {});
        if (lodashUtils.isEmpty(data)) { return null; }
        return data.ticket;
    },
    /**
     * 测试ticket(凯励程-dev)
     *     无店模式  18382328582   5a966223083bc682b2c82313a6adea9ccef65026c5978f3e
     *     有店模式  15608186333   4f0388df9cf4b11d126fc2210874e63b6e8361a02326b96d
     */
    '8dbe167d72f875b1a75da2b1a9dafc2042590e01c65e5ff6',
    // '358ebb5076f70078d006344f18520740ccdc44feb5105427',
);

export const dsGetUserInfo = () => dsMiddleware(
    () => {
        const data = dsbridge.call('getUserInfo', {});
        if (lodashUtils.isEmpty(data)) { return null; }
        return data;
    },
    {

    },
);

export const dsUseLoginServe = () => dsMiddleware(
    () => new Promise((resolve, reject) => {
        dsbridge.call('useLoginServe', {}, ({ code, msg }) => {
            if (code === 0) {
                // 登录成功
                resolve();
            } else {
                // 点击了返回
                reject(msg);
            }
        });
    }),
);

// 获取埋点通用属性
export const dsGetTrackCommonProperty = () => dsMiddleware(
    () => {
        const data = dsbridge.call('getTrackCommonProperty', {});
        if (lodashUtils.isEmpty(data)) { return null; }
        return data;
    },
);

export const isInApp = () => {
    return !!dsbridge.hasNativeMethod('getDeviceData');
}
