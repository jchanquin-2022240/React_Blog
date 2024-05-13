import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';
import { getPosts } from '../../services';
import { PublicationListContainer } from '../../components/publication/Publication';
import { Comment } from '../../components/comment/Comment';

export const DashboardPage = () => {
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [publication, setPublication] = useState([]);
    const [postById, setPostById] = useState(null);

    const handleMoreInfoClick = (id) => {
        console.log('Read more info clicked:', id);
        setPostById(id);
    };

    useEffect(() => {
        console.log('Selected post id:', postById);
    }, [postById])

    useEffect(() => {
        if (!shouldUpdate) return;
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
        setShouldUpdate(false);
    }, [shouldUpdate]);

    return (
        <>
            {postById === null && (
                <PublicationListContainer publications={publication} onMoreInfoClick={handleMoreInfoClick} setShouldUpdate={setShouldUpdate} />
            )}
        </>
    )
}