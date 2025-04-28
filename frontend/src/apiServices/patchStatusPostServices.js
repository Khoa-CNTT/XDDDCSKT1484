import * as request from '~/utils/request';

const patchStatusPost = async (id, data, token) => {
    try {
        const res = await request.patch(`posts/${id}/status`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return error;
    }
}

export default patchStatusPost;