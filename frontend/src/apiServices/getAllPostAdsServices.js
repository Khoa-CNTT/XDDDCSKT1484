import * as request from '~/utils/request'

const getAllPostAds = async (token) => {
    try {
        const res = request.get('ads', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res;
    } catch (error) {
        return error;
    }
}

export default getAllPostAds;