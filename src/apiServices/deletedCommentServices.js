import * as request from '~/utils/request'

const deletedComment = async (id, token) => {
    try {
        const res = await request.deleted(`comments/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default deletedComment