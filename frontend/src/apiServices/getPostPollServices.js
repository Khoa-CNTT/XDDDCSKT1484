import * as request from '~/utils/request'

const getPostPoll = async (id, token) => {
    try {
        const config = {}
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get(`post-poll/${id}`, config)
        return res
    } catch (error) {
        return error
    }
}

export default getPostPoll