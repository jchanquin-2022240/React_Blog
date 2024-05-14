import './publication.css'
import { Comment } from '../comment/Comment';
import { useState } from 'react';

export const PublicationListContainer = ({ publications, onMoreInfoClick }) => {
    console.log({ publications })
    return (
        <div className='posts-container'>
            {publications.map((publication, index) => (
                <div className='container-post-card' key={index}>
                    <div className='post-card'>
                        <img className='post-image' src={publication.image} alt="" />
                        <div className='container-card'>
                            <label>Título:</label>
                            <div className='content-container-card'>{publication.title}</div>
                        </div>
                        <div className='container-card'>
                            <label>Author:</label>
                            <div className='content-container-card'>{publication.author}</div>
                        </div>
                        <div className='container-card'>
                            <label>Description:</label>
                            <div className='content-container-card'>{publication.description}</div>
                        </div>
                        <button className='button' onClick={() => onMoreInfoClick(publication._id)}>
                            More Info
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}