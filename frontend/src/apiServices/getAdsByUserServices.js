import * as request from '~/utils/request'

const getAdsByUser = async (page, size, token) => {
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

        const res = await request.get('ads/user', config)
        return res
    } catch (error) {
        return error
    }
}

export default getAdsByUser;