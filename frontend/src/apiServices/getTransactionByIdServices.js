import * as request from '~/utils/request'

const getTransactionById = async (id, token) => {
    try {
        const res = await request.get(`transaction/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res;
    } catch (error) {
        return error;
    }

}

export default getTransactionById;