import * as request from '~/utils/request'

const getReplyComment = async (page, size, commentId, token) => {
    try {
        const config = {
            params: {
                page,
                size,
                commentId,
            }
        }
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('comment-reply', config)
        return res
    } catch (error) {
        return error;
    }
}

export default getReplyComment;