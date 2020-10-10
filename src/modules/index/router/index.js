export default [
    {
        path: '/',
        redirect: '/page1'
    },
    {
        path: '/page1',
        component: () => import(/* webpackChunkName: 'page1' */ '@/modules/index/pages/page1'),
    },
    {
        path: '/page2',
        component: () => import(/* webpackChunkName: 'page2' */ '@/modules/index/pages/page2'),
    },
];