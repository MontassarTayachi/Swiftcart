import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { API_BASE_URL } from '../config';

const FollowedContext = createContext();

export const FollowedProvider = ({ children }) => {
    const [followed, setFollowed] = useState([]);
    const [refreshes, setRefreshes] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
       

        const fetchFollowedData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/follows/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setFollowed(data.follows);
                } else {
                    setError('Failed to fetch data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowedData();
    }, [refreshes]);

    const value = useMemo(() => ({
        followed, setFollowed, refreshes, setRefreshes, loading, error
    }), [followed, refreshes, loading, error]);

    return (
        <FollowedContext.Provider value={value}>
            {children}
        </FollowedContext.Provider>
    );
}

export const useFollowed = () => useContext(FollowedContext);
