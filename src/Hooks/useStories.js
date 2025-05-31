import { useState, useEffect } from 'react';

export function useStories() {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState('all');

    useEffect(() => {
        const fetchStories = async () => {
            setIsLoading(true);
            setError(null);
            const url = currentPage === 'all' ? 'http://localhost:8080/stories' : 'http://localhost:8080/stories/top';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Received data:', data);
                setPageData(data);
            } catch (e) {
                console.error('Fetch error:', e);
                setError(e.message || 'An error occurred while fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStories();

        // Cleanup function to handle unmounting
        return () => {
        };
    }, [currentPage]);

    return { pageData, isLoading, error, currentPage, setCurrentPage };
}