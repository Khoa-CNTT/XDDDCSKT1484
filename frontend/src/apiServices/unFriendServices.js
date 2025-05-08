import * as request from '~/utils/request'

const unFriend = async (userId, token) => {
    try {
        const res = await request.post(`friend-ship/un-accept/${userId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default unFriend;