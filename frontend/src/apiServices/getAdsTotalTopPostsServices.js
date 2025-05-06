import * as request from '~/utils/request';
const getAdsTotalTopPosts = async (start, end, token) => {
    try {
        const config = {
            params: {
                start,
                end,
                limit: 5
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('ads-total/top-posts', config)
        return res;
    } catch (error) {
        return error;
    }
}
export default getAdsTotalTopPosts;