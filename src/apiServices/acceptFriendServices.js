import * as request from '~/utils/request'

const acceptFriend = async (userId, token) => {
    try {
        const res = await request.post(`friend-ship/accept/${userId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default acceptFriend;