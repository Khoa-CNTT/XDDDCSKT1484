import * as request from '~/utils/request';

const deletedUser = async (id, token) => {

    try {
        const res = await request.deleted(`users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res;
    } catch (error) {
        return error;
    }

}

export default deletedUser;