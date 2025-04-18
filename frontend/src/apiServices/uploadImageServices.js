import * as request from '~/utils/request'

const uploadImage = async (img) => {
    try {
        const formData = new FormData();
        formData.append('file', img)
        const res = await request.post('upload/image', formData)

        return res
    } catch (error) {
        return error
    }
}

export default uploadImage;