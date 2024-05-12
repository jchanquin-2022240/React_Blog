import './publication.css'

export const Publication = ({ publications, onMoreInfoClick }) => {
    return (
        <div>
            {publications.map((publication, index) => (
                <div className='post-card' key={index}>
                    <div className='container-card'>
                        <label>Título</label>
                        <div>{publication.title}</div>
                    </div>
                    <div className='container-card'>
                        <label>author</label>
                        <div>{publication.author}</div>
                    </div>
                    <div className='container-card'>
                        <label>description</label>
                        <div>{publication.description}</div>
                    </div>
                    <div className='container-card'>
                        <label>Languaje and tools</label>
                        <div>{publication.tools}</div>
                    </div>
                    <button onClick={() => onMoreInfoClick(publication._id)}>More info</button>
                </div>
            ))}
        </div>
    )
}