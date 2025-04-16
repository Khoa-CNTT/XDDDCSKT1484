import * as request from '~/utils/request';

const searchUsers = async (name, page, size, token) => {
    try {
        const config = {
            params: {
                name,
                page,
                size,
            }
        }

        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('users/find', config);

        return res
    } catch (error) {
        return error;
    }
}

export default searchUsers;