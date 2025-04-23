import * as request from '~/utils/request'

const getPostAdsById = async (id, token) => {
    try {
        const res = request.get(`ads/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res;
    } catch (error) {
        return error;
    }
}

export default getPostAdsById;