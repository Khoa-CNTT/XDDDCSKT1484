import * as request from '~/utils/request'

const getFriends = async (page, size, token) => {
    try {

        const config = {
            params: {
                page,
                size,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const res = await request.get('friend-ship/friendship', config)
        return res
    } catch (error) {
        return error
    }
}

export default getFriends;