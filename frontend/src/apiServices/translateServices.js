import * as request from '~/utils/request';

const translate = async (data,token) => {
    try {
        const res = await request.post('ai/translate', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res;
    } catch (error) {
        return error;
    }
}

export default translate;