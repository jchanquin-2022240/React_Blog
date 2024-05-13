import './publication.css'
import { Comment } from '../comment/Comment';
import { useState } from 'react';

export const PublicationListContainer = ({ publications, onMoreInfoClick, setShouldUpdate }) => {
    console.log({ publications })
    return (
        <div className='posts-container'>
            {publications.map((publication) => (
                <Publication
                    title={publication.title}
                    author={publication.author}
                    key={publication._id}
                    description={publication.description}
                    tools={publication.tools}
                    descriptionFuction={publication.descriptionFuntion}
                    comments={publication.comments}
                    id={publication._id}
                    setShouldUpdate={setShouldUpdate}
                    image={publication.image}
                    link={publication.link}
                    date={publication.date} 
                />
            ))}
        </div>
    )
}

const Publication = (publication) => {
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);

    return (
        <div className='post-card'>
            <img className='post-image' src={publication.image} alt="" />
            <div className='container-card'>
                <label>Título:</label>
                <div>{publication.title}</div>
            </div>
            <div className='container-card'>
                <label>Author:</label>
                <div>{publication.author}</div>
            </div>
            <div className='container-card'>
                <label>Description:</label>
                <div>{publication.description}</div>
            </div>
            <div className='container-card'>
                <label>Languaje and tools: </label>
                <div>{publication.tools}</div>
            </div>
            <div className='container-card'>
                <label>Function: </label>
                <div>{publication.descriptionFuction}</div>
            </div>
            <div className='container-card'>
                <label>Link: </label><br />
                <a href={publication.link}>{publication.link}</a>
            </div>
            <div className='container-card'>
                <label>Date Publication</label>
                <div>{publication.date}</div>
            </div>
            <button className='button' onClick={() => setIsCommentsVisible(!isCommentsVisible)}>
                {isCommentsVisible ? 'Less Info' : 'More Info'}
            </button>
            {isCommentsVisible && <Comment comments={publication.comments} publicationId={publication.id} setShouldUpdate={publication.setShouldUpdate} />}
        </div>
    )
}