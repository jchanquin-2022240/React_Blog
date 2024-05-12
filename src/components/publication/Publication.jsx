import './publication.css'

export const Publication = ({ publications }) => {
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
                    <div className='container-card'>
                        <label>Function</label>
                        <div>{publication.descriptionFuntion}</div>
                    </div>
                    <div className='container-card'>
                        <label>Image</label>
                        <img src={publication.image} alt="Image" />
                    </div>
                    <div className='container-card'>
                        <label>link</label>
                        <a href={publication.link}/>
                    </div>
                    <div className='container-card'>
                        <label>Date</label>
                        <div>{publication.date}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}