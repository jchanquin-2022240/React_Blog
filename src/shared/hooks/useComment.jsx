import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addComment as addCommentService } from '../../services';

export const useComment = () => {
    const [comments, setComments] = useState([]);

    const saveComment = (id, data) => {
        const response = addCommentService(id, data);

        if (response.error) {
            return toast.error(
                response.e?.response?.data || "Error al guardar el comentario"
            )
        }

        toast.success("Comentario guardado con éxito");
    }
}