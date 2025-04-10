import * as request from '~/utils/request'

const editPost = async (postId, data, token) => {
    try {

        const res = await request.patch(`post-content/${postId}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res;
    } catch (error) {
        return error;
    }
}

export default editPost;