import * as request from '~/utils/request'

const getCommentByIdPost = async (postId, page, size, token) => {
    try {
        const config = {
            params: {
                postId,
                page,
                size,
            }
        }
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('comments', config)

        return res
    } catch (error) {
        return error
    }
}

export default getCommentByIdPost;