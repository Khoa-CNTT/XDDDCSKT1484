import * as request from '~/utils/request';

const hiddenPost = async (id, data, token) => {
    try {
        const res = await request.patch(`posts/${id}/Show`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return error;
    }
}

export default hiddenPost;