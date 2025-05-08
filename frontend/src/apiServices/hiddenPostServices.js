import * as request from '~/utils/request';

const hiddenPost = async (id, token) => {
    try {
        const res = await request.patch(`posts/${id}/Show`, {
            status: false,
        }, {
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