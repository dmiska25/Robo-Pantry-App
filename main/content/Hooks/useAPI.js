// ./src/hooks.js
import { useState, useEffect } from "react";

export const useAPI = (apiFunction, params) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiFunction(params)
            .then(({data}) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Something went wrong!");
                setIsLoading(false);
                console.log(err);
            });
    }, [apiFunction, params]);

    return [isLoading, data, error];
};