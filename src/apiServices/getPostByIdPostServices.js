import * as request from '~/utils/request'

const getPostByIdPost = async (id, token) => {
    try {
        const config = {}
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get(`posts/${id}`, config)

        return res
    } catch (error) {
        return error
    }
}

export default getPostByIdPost;