import React, { useSate, useEffect } from 'react';
import { Navbar} from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';
import { getPost } from '../../services';
import { Publication } from '../../components/publication/Publication';

export const DashboardPage = () => {
    const [publication, setPublication] = useState([]);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await getPost();
                console.log(response)
                if (!response.error) {
                    setPublication(response.data || []);
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
        <Publication publication={publication}/>
    )
}