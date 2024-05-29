import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { API_BASE_URL } from '../config';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
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
                const response = await fetch(`${API_BASE_URL}/cart_items`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setCart(data.stores);
                    console.log(data.stores.length)
                } else {
                    throw new Error('Failed to fetch data');
                    setError('Failed to fetch data');
                }
            } catch (err) {
                setCart([]);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowedData();
    }, [refreshes]);

    const value = useMemo(() => ({
        cart, setCart, refreshes, setRefreshes, loading, error
    }), [cart, refreshes, loading, error]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
