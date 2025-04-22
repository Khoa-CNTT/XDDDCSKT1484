import * as request from '~/utils/request'

const searchPostsAdmin = async (page, size, content, language, token) => {
    try {
        const config = {
            params: {
                page,
                size,
                content,
                language
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('posts/find', config)

        return res;
    } catch (error) {
        return error;
    }
}

export default searchPostsAdmin;