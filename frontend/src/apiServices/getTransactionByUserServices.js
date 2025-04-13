import * as request from '~/utils/request'

const getTransactionByUser = async (page, size, token) => {
    try {

        const config = {
            params: {
                page,
                size
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const res = await request.get('transaction/user', config)
        return res
    } catch (error) {
        return error
    }
}

export default getTransactionByUser;