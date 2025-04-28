import * as request from '~/utils/request'

const like = async (postId, token) => {
    try {
        const res = await request.post(
            'likes/action',
            {
                postId
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res;
    } catch (error) {
        return error;
    }
}

export default like