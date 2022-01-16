// ./src/hooks.js
import { useState, useEffect } from "react";

export const useAPI = (apiFunction, params) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = () => {
        apiFunction(params)
        .then(({data}) => {
            setData(data);
            console.log("data: ");
            console.log(data);
            setIsLoading(false);
        })
        .catch((err) => {
            setError("Something went wrong!");
            setIsLoading(false);
            console.log(err);
        });
    }
    const reloadData = () => {
        if (isLoading==true) return;
        setIsLoading(true);
        loadData();
    }

    useEffect(() => {
        loadData();
    }, [apiFunction, params]);

    return [isLoading, data, error, reloadData];
};