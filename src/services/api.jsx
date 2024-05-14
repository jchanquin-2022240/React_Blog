import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/blog/v1',
    timeout: 5000
})

export const getPosts = async () => {
    try {
        return await api.get('/posts')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const addComment = async (id, commentUser, commentMain) => {
    try {
        console.log('id', id)
        console.log('commentUser', commentUser)
        console.log('commentMain', commentMain)
        return await api.put(`/addComment/${id}`, { commentUser, commentMain })
    } catch (e) {
        return ({
            error: true,
            e
        })
    }
}

export const searchPost = async (id) => {
    try {
        return await api.get(`/post/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}