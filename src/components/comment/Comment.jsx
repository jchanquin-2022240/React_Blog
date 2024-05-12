import React, { useEffect, useState } from 'react';
import { searchPost, addComment } from '../../services';
import { Input } from '../Input';
import './comment.css'

export const Comment = ({ publicationId}) => {
    const [comment, setComment] = useState(null);
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

        // fetchPublicationDetails();
    };

    // const fetchPublicationDetails = async () => {
    //     try {
    //         if (publicationId) {
    //             const data = await searchPost(publicationId);
    //             setComment(data);
    //         } else {
    //             console.error('No publicationId provided');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching publication details:', error);
    //     }
    // };
    
    useEffect(() => {
        // fetchPublicationDetails();
        console.log('Fetching publication details for id:', publicationId);
    }, [publicationId]);

    useEffect(() => {
        const fetchPublicationDetails = async () => {
            try {
                if (publicationId) {
                    const data = await searchPost(publicationId);
                    setComment(data);
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
    console.log('Publication details:', comment);

    return (
        <div className='comments-container'>
            {comment && (
                <div className='container-details'>
                    <div className='post-details-items'>
                        <label>Título</label>
                        <div>{comment.data.title}</div>
                    </div>
                    <div className='post-details-items'>
                        <label>Author</label>
                        <div>{comment.data.author}</div>
                    </div>
                    <div className='post-details-items'>
                        <label>Description</label>
                        <div>{comment.data.description}</div>
                    </div>
                    <div className='post-details-items'>
                        <label>Languaje and tools</label>
                        <div>{comment.data.tools}</div>
                    </div>
                    <div className='post-details-items'>
                        <label>Function</label>
                        <div>{comment.data.descriptionFuntion}</div>
                    </div>
                    <div className='post-details-items'>
                        <label>Image</label>
                        <img src={comment.data.image} alt="Image" />
                    </div>
                    <div className='post-details-items'>
                        <label>link</label>
                        <a href={comment.data.link}>{comment.link}</a>
                    </div>
                    <div className='post-details-items'>
                        <label>Date</label>
                        <div>{comment.data.date}</div>
                    </div>
                    <hr />
                    <h2>Comments</h2>
                    <div comment-form-item>
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
                            <button onClick={handleFormSubmit} className='comment-button'>
                                Add comment
                            </button>
                        </form>
                        <div>
                            {comment && comment.data && comment.data.comments && comment.data.comments.length > 0 ? (
                                comment.data.comments.map((commentMain, index) => (
                                    <div key={index} className="comment-card">
                                        <div>
                                            <label>User comment: {commentMain.commentUser}</label>
                                        </div>
                                        <div>
                                            <label>Comment: {commentMain.commentMain}</label>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-comments">There are no comments</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

          
}