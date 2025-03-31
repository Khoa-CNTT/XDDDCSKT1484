import * as request from '~/utils/request'

const replyComment = async (formData, token) => {
    try {
        const res = await request.post('comment-reply', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res;
    } catch (error) {
        return error
    }
}

export default replyComment;