import * as request from '~/utils/request'

const getAllAds = async (page, size, token) => {
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

        const res = await request.get('ads', config)
        return res
    } catch (error) {
        return error
    }
}

export default getAllAds;