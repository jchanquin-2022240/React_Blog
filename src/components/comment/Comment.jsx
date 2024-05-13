import { useEffect, useState } from 'react';
import { addComment } from '../../services';
import { Input } from '../Input';
import './comment.css'

export const Comment = ({ comments, publicationId, setShouldUpdate }) => {
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
        console.log({ publicationId })
        const response = await addComment(
            publicationId,
            formState.commentUser.value,
            formState.commentMain.value,
        );

        if (response.status === 200) {
            setShouldUpdate(true);
        }
        setFormState({
            commentUser: { value: "" },
            commentMain: { value: "" },
        });
    };

    return (
        <div className='comments-container'>
            <div className='container-details'>
                <h3 className='subtitle'>Comments</h3>
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