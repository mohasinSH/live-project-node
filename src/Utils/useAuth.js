import { useEffect, useState } from "react";
import axios from 'axios';

export  const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
            axios.post('http://localhost:8000/validate', { token: token })
                .then((res) => {
                    console.log(res.data)
                    setIsAuthenticated(res.data.auth);
                })
                .catch((error) => {
                    console.error('Validation error', error);
                    setIsAuthenticated(false);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    return { isAuthenticated, isLoading };
};
