import * as request from '~/utils/request'

const rejectFriend = async (userId, token) => {
    try {
        const res = await request.post(`friend-ship/reject/${userId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default rejectFriend;