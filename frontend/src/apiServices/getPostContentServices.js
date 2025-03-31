import * as request from '~/utils/request'

const getPostContent = async (id, token) => {
    try {
        const config = {}
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get(`post-content/${id}`, config)
        return res
    } catch (error) {
        return error
    }
}

export default getPostContent