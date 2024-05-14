import { useEffect, useState } from 'react';
import { addComment, searchPost } from '../../services';
import back from '../../assets/img/flecha-izquierda.png';
import { Input } from '../Input';
import './comment.css'

export const Comment = ({ publicationId }) => {
    const [commentDetails, setCommentDetails] = useState(null);

    const [formState, setFormState] = useState({
        commentUser: {
            value: '',
            isValid: false,
            showError: false,
        },
        commentMain: {
            value: '',
            isValid: false,
            showError: false,
        }
    })

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'commentUser':
                isValid = value.length > 0;
                break;
            case 'commentMain':
                isValid = value.length > 0;
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            },
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await addComment(
            publicationId,
            formState.commentUser.value,
            formState.commentMain.value,
        );

        setFormState({
            commentUser: { value: "" },
            commentMain: { value: "" },
        });

        fetchPublicationDetails();
    };

    const fetchPublicationDetails = async () => {
        try {
            if (publicationId) {
                const data = await searchPost(publicationId);
                setCommentDetails(data);
            } else {
                console.error('No publicationId provided');
            }
        } catch (error) {
            console.error('Error fetching publication details:', error);
        }
    };

    useEffect(() => {
        fetchPublicationDetails();
        console.log('Fetching publication details for id:', publicationId);
    }, [publicationId]);

    useEffect(() => {
        const fetchPublicationDetails = async () => {
            try {
                if (publicationId) {
                    const data = await searchPost(publicationId);
                    setCommentDetails(data);
                } else {
                    console.error('No publicationId provided');
                }
            } catch (error) {
                console.error('Error fetching publication details:', error);
            }
        }
        fetchPublicationDetails();
        console.log('Fetching publication details for id:', publicationId);
    }, [publicationId]);
    console.log('Publication details:', commentDetails);

    return (
        <div className='comments-details-container'>
            {commentDetails && (
                
                <div className='container-comment-card'>
                    <button className='back' onClick={() => window.location.reload()}>
                        <img src={back} alt="Back"></img>
                    </button>
                    <div className='post-card-item'>
                        <div className='container-card-item'>
                            <label>Título:</label>
                            <div className='content-card'>{commentDetails.data.title}</div>
                        </div>
                        <div className='container-card-item'>
                            <label>Author:</label>
                            <div className='content-card'>{commentDetails.data.author}</div>
                        </div>
                        <div className='container-card-item'>
                            <label>Description:</label>
                            <div className='content-card'>{commentDetails.data.description}</div>
                        </div>
                        <div className='container-card-item'>
                            <label>Languaje and tools: </label>
                            <div className='content-card'>{commentDetails.data.tools}</div>
                        </div>
                        <div className='container-card-item'>
                            <label >Function: </label>
                            <div className='content-card'>{commentDetails.data.descriptionFuntion}</div>
                        </div>
                        <div className='container-card-item'>
                            <label>Link: </label><br />
                            <a className='content-card' href={commentDetails.data.link}>{commentDetails.data.link}</a>
                        </div>
                        <img className='post-image' src={commentDetails.data.image} alt="" />
                        <div className='container-card-item'>
                            <label>Date: </label>
                            <div className='content-card'>{commentDetails.data.date}</div>
                        </div>
                    </div>
                    <hr />
                    <h2 className='subtitle'>Comments</h2>
                    <div className="comment-form-item">
                        <form className='comment-form'>
                            <Input
                                field='commentUser'
                                label='User'
                                value={formState.commentUser.value}
                                onChangeHandler={handleInputValueChange}
                                onBlurHandler={handleInputValidationOnBlur}
                                type='text'
                                className='comment-input'
                            />
                            <Input
                                field='commentMain'
                                label='Comment'
                                value={formState.commentMain.value}
                                onChangeHandler={handleInputValueChange}
                                onBlurHandler={handleInputValidationOnBlur}
                                type='text'
                                className='comment-input'
                            />
                            <br />
                            <button onClick={handleFormSubmit} className='comment-button'>
                                Add comment
                            </button>
                        </form>
                        <div className='comment-submit'>
                            {commentDetails && commentDetails.data && commentDetails.data.comments && commentDetails.data.comments.length > 0 ? (
                                commentDetails.data.comments.map((comment, index) => (
                                    <div key={index} className="comment-card">
                                        <div className='comment-user'>
                                            <label>User: {comment.commentUser}</label>
                                        </div>
                                        <div className='comment-main'>
                                            <label>Comment: {comment.commentMain}</label>
                                        </div>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <div className="no-comments">No hay comentarios</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}