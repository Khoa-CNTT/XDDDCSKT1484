import * as request from '~/utils/request'

const getRequestFriends = async (page, size, token) => {
    try {
        const configs = {
            params: {
                page,
                size,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('friend-ship/friendship-request', configs);
        return res;
    } catch (error) {
        return error;
    }
}

export default getRequestFriends;