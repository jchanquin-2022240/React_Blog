import { useEffect, useState } from 'react';
import { addComment } from '../../services';
import { Input } from '../Input';
import './comment.css'

export const Comment = ({ comments, publicationId }) => {
    console.log({ comments })
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

        if (!response.ok) {
            console.error("SOMETHING WRONG ADDING NEW COMMENT")
            return;
        }

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

    return (
        <div className='comments-container'>
            <div className='container-details'>
                <h2>Comments</h2>
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
                        <button onClick={handleFormSubmit} className='comment-button'>
                            Add comment
                        </button>
                    </form>
                    <div>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="comment-card">
                                    <div>
                                        <label>User comment: {comment.commentUser}</label>
                                    </div>
                                    <div>
                                        <label>Comment: {comment.commentMain}</label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-comments">There are no comments</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}