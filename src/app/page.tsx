"use client"
import JsonViewer from "@/components/JsonViewer";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://ronin-stand-api.cosmonova-broadcast.tv';

// Define the type for our JSON data
type JsonDataType = typeof data;

const Page = () => {
    const [jsonData, setJsonData] = useState<JsonDataType | null>(null);
    const searchParams = useSearchParams();
    const path = searchParams.get('path');

    useEffect(() => {
        const fetchData = async () => {
            if (path) {
                try {
                    const response = await fetch(`${BASE_URL}/${path}`);
                    const newData = await response.json();
                    setJsonData(newData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setJsonData(data);
                }
            } else {
                setJsonData(data);
            }
        };

        fetchData();
    }, [path]);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <JsonViewer data={jsonData || data} />
        </div>
    );
};

export default Page;