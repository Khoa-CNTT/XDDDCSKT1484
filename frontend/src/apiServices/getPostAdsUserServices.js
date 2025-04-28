import * as request from '~/utils/request';

const getPostAdsUser = async (page, size, token) => {
    const configs = {
        params: {
            page,
            size
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await request.get('ads/user', configs);

    return res;
}

export default getPostAdsUser;