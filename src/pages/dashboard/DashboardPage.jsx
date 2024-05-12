import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';
import { getPosts } from '../../services';
import { Publication } from '../../components/publication/Publication';

export const DashboardPage = () => {
    const [publication, setPublication] = useState([]);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await getPosts();
                console.log(response, "oa")
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
        <Publication publications={publication} />
    )
}