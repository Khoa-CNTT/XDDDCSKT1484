import * as request from '~/utils/request'

const uploadPostContent = async (data, token) => {
    try {
        const res = await request.post('post-content', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default uploadPostContent;