import * as request from '~/utils/request'

const getTransactionByIdAds = async (id, token) => {
    try {
        const res = await request.get(`transaction/${id}/ads`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res;
    } catch (error) {
        return error;
    }

}

export default getTransactionByIdAds;