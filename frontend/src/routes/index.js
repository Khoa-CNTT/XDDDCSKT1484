// Routes Config
import routesConfig from '~/config/routes'

// Layouts
import { DefaultLayout, HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Setting from '~/pages/Setting';
import Profile from '~/pages/Profile';
import Register from '~/pages/Register';
import Upload from '~/pages/Upload';
import ActiveAccount from '~/pages/ActiveAccount';
import ForgotPassword from '~/pages/ForgotPassword';
import SendEmail from '~/pages/SendEmail';
import ConfirmEmail from '~/pages/ConfirmEmail';
import PostDetail from '~/pages/PostDetail';
import ResetPassword from '~/pages/ResetPassword';
import AboutFL from '~/pages/AboutFL'
import Policy from '~/pages/Policy'
import Help from '~/pages/Help'
import Friends from '~/pages/Friends';
import Dashboard from '~/pages/admin/Dashboard';
import UsersManagement from '~/pages/admin/UsersManagement';
import PostsManagement from '~/pages/admin/PostsManagement';
import AdvManagement from '~/pages/admin/AdvManagement';
import Statistic from '~/pages/admin/Statistic';
import Report from '~/pages/admin/Report';
import AdminLayout from '~/layouts/AdminLayout';
import { Fragment } from 'react';
import PostAds from '~/pages/PostAds';
import PostAdsId from '~/pages/PostAds/PostAdsDetails';
import ResultPayment from '~/pages/ResultPayment';
import Search from '~/pages/Search';

const publicRoutes = [
    { path: routesConfig.home, component: Home, layout: DefaultLayout },
    { path: routesConfig.login, component: Login, layout: Fragment },
    { path: routesConfig.register, component: Register, layout: Fragment },
    { path: routesConfig.forgotPassword, component: ForgotPassword, layout: Fragment },
    { path: routesConfig.resetPassword, component: ResetPassword, layout: Fragment },
    { path: routesConfig.confirmEmail, component: ConfirmEmail, layout: Fragment },
    { path: routesConfig.policy, component: Policy, layout: HeaderOnly },
    { path: routesConfig.help, component: Help, layout: HeaderOnly },
    { path: routesConfig.aboutFL, component: AboutFL, layout: HeaderOnly },
    { path: routesConfig.postDetail, component: PostDetail, layout: DefaultLayout },
    { path: routesConfig.postAds, component: PostAds, layout: HeaderOnly },
    { path: routesConfig.postAdsId, component: PostAdsId, layout: HeaderOnly },
    { path: routesConfig.paymentResult, component: ResultPayment, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: HeaderOnly },
    { path: routesConfig.activeAccount, component: ActiveAccount, layout: Fragment },
    { path: routesConfig.sendEmail, component: SendEmail, layout: Fragment },
];

const privateRoutes = [
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.setting, component: Setting, layout: HeaderOnly },
    { path: routesConfig.friends, component: Friends, layout: HeaderOnly },
    { path: routesConfig.profile, component: Profile, layout: HeaderOnly },
];

const adminRoutes = [
    { path: routesConfig.dashboard, component: Dashboard, layout: AdminLayout },
    { path: routesConfig.usersManagement, component: UsersManagement, layout: AdminLayout },
    { path: routesConfig.postsManagement, component: PostsManagement, layout: AdminLayout },
    { path: routesConfig.advManagement, component: AdvManagement, layout: AdminLayout },
    { path: routesConfig.statistic, component: Statistic, layout: AdminLayout },
    { path: routesConfig.report, component: Report, layout: AdminLayout },
]

export { publicRoutes, privateRoutes, adminRoutes };
