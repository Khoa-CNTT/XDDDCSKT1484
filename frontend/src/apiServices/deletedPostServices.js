import * as request from '~/utils/request'

const deletedPost = async (id, token) => {
    try {
        const res = await request.deleted(`posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default deletedPost