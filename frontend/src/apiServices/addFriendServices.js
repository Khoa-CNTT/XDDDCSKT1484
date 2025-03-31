import * as request from '~/utils/request'

const addFriend = async (data, token) => {
    try {

        const res = await request.post('friend-ship',
            {
                receiver: data
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default addFriend;