import { useState } from 'react';
import toast from 'react-hot-toast';
import { getPost as getPostService } from '../../services';

export const usePublication = () => {
    const [post, setPost] = useState([]);

    const dataPublication = async () => {
        const publicationData = await getPostService();
        if (publicationData.error) {
            return toast.error(
                publicationData.response?.data || 'Error al obtener la publicación'
            )
        }
        setPost(publicationData.data);
        return publicationData.data;
    }
}