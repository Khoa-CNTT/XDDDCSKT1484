import * as request from '~/utils/request'

const getAllTransaction = async (page, size, token) => {
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

        const res = await request.get('transaction', config)
        return res
    } catch (error) {
        return error
    }
}

export default getAllTransaction;