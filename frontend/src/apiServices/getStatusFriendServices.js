import * as request from '~/utils/request'

const getStatusFriend = async (userId, token) => {
    try {
        const res = await request.get(`friend-ship/friendship/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default getStatusFriend;