import * as request from '~/utils/request'

const deletedReplyComment = async (id, token) => {
    try {
        const res = await request.deleted(`comment-reply/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default deletedReplyComment;