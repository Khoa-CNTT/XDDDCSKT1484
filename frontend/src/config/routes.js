const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    search: '/search',
    forgotPassword: '/forgotPassword',
    resetPassword: '/resetPassword',
    confirmEmail: '/confirmEmail',
    setting: '/setting',
    profile: '/user/:user_id',
    upload: '/upload',
    activeAccount: '/activeAccount',
    sendEmail: '/sendEmail',
    aboutFL: '/aboutFL',
    policy: '/policy',
    help: '/help',
    postDetail: '/post/:id_post',
    friends: '/friends',
    postAds: '/postAds',
    postAdsId: '/postAds/:id',
    paymentResult: '/paymentResult',

    // Route Admin
    dashboard: '/admin/dashboard',
    usersManagement: '/admin/users',
    postsManagement: '/admin/posts',
    advManagement: '/admin/advertisement',
    statistic: '/admin/statistic',
    report: '/admin/report',
}

export default routes