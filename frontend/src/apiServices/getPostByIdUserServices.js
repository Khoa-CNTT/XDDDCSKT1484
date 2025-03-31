import * as request from '~/utils/request'

const getPostByIdUser = async (id, page, size, token) => {
    try {
        const res = await request.get(`posts/user/${id}`, {
            params: {
                page,
                size,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error
    }
}

export default getPostByIdUser