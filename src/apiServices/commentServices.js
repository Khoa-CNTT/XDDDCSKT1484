import * as request from '~/utils/request'

const comment = async (postId, content, token) => {
    try {

        const data = {
            postId,
            content,
        }
        const res = await request.post('comments', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default comment;