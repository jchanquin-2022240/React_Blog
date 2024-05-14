import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';
import { getPosts } from '../../services';
import { PublicationListContainer } from '../../components/publication/Publication';
import { Comment } from '../../components/comment/Comment';

export const DashboardPage = () => {
    //const [shouldUpdate, setShouldUpdate] = useState(true);
    const [publication, setPublication] = useState([]);
    const [postById, setPostById] = useState(null);
    const [clickPublicationId, setClickPublicationId] = useState(null);

    const handleReadMoreClick = (id) => {
        console.log('Read more clicked:', id);
        setClickPublicationId(id);
    };

    useEffect(() => {
        console.log('Selected post id:', postById);
    }, [postById])

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await getPosts();
                if (!response.error) {
                    setPublication(response.data.publications || []);
                    console.log({ publications: response.data.publications })
                } else {
                    console.log('Error:', response.data);
                }
            } catch (error) {
                console.log('Error fetching publications:', error);
            }
        };
        fetchPublications();
    }, []);

    return (
        <>
            <Navbar />
            {clickPublicationId === null ? (
                <PublicationListContainer publications={publication} onMoreInfoClick={handleReadMoreClick}/>
            ) : (
                <Comment publicationId={clickPublicationId} />
            )}
            {clickPublicationId === null && <Footer />}
        </>
    )
}