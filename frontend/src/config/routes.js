const routes = {
    home: '/',
    login: '/login',
    register: '/register',
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
    paymentResult: '/payment-result',

    // Route Admin
    dashboard: '/admin/dashboard',
    usersManagement: '/admin/users',
    postsManagement: '/admin/posts',
    statistic: '/admin/statistic',
    report: '/admin/report',
}

export default routes