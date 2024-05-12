import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';
import { getPosts } from '../../services';
import { Publication } from '../../components/publication/Publication';
import { Comment } from '../../components/comment/Comment';

export const DashboardPage = () => {
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
        const fetchPublications = async () => {
            try {
                const response = await getPosts();
                if (!response.error) {
                    setPublication(response.data.publications || []);
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
        {postById === null ? ( 
        <Publication publications={publication} onMoreInfoClick={handleMoreInfoClick}/>
        ) : (
            <Comment publicationId={postById} />
        )}
        </>
    )
}