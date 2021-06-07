import React, { useState, useEffect } from 'react';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);

        const reqInterceptors = axios.interceptors.request.use((req) => {
            setError(null);
            return req;
        })

        const resInterceptors = axios.interceptors.response.use((res) => res, error => {
            setError(error)
        });

        useEffect(() => {
            reqInterceptors();
            resInterceptors();
            console.log(error, 'WithErrorHandler');

            return () => {
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptors);
            }
        });

        return (
            <WrappedComponent {...props} error={error} />
        );
    }
}

export default withErrorHandler;