// ./src/hooks.js

import { useState, useEffect } from "react";
import axios from "axios";

export const roboPantryAPI = (apiFunction, params) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiFunction(params)
            .then(({data}) => {
                setData(data);
                setIsLoading(false);
            })
            .catch(() => {
                setError("Something went wrong!");
                setIsLoading(false);
            });
    }, [apiFunction, params]);

    return [isLoading, data, error];
};