import * as request from '~/utils/request'

const historyEditPost = async (postId, page, size, token) => {
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

        const res = await request.get(`post-content-history/${postId}`, config);

        return res;

    } catch (error) {
        return error;
    }

}

export default historyEditPost;