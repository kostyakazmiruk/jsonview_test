"use client"
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface JsonViewerProps {
    data: any;
    level?: number;
}

const JsonViewer = ({ data, level = 0 }: JsonViewerProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();

    const handleClick = useCallback(() => {
        setIsCollapsed(!isCollapsed);
    }, []);

    const handleLinkClick = useCallback((value: string) => {
        if (typeof value === 'string') {
            if (value.includes('get(')) {
                const path = value.match(/get\((.*?)\)/)?.[1];
                if (path) {
                    router.push(`/?path=${path}`);
                }
            } else if (value.includes('/')) {
                router.push(`/?path=${value}`);
            }
        }
    }, [router]);

    if (typeof data !== 'object' || data === null) {
        const isClickable = typeof data === 'string' && 
            (data.includes('get(') || data.includes('/'));
        
        let displayValue = data;
        let className = '';

        if (typeof data === 'string') {
            displayValue = `"${data}"`;
            className = 'text-green-600';
        } else if (typeof data === 'number') {
            className = 'text-red-500';
        } else if (data === null) {
            className = 'text-gray-500';
            displayValue = 'null';
        } else if (typeof data === 'boolean') {
            className = 'text-orange-500';
        }

        return (
            <span 
                className={`${className} ${isClickable ? 'cursor-pointer hover:underline' : ''}`}
                onClick={() => isClickable && handleLinkClick(data)}
            >
                {displayValue}
            </span>
        );
    }

    const indent = "  ".repeat(level);
    const keyCount = Object.keys(data).length;

    return (
        <div style={{ marginLeft: level > 0 ? '20px' : '0' }}>
            <span 
                className="cursor-pointer hover:bg-gray-100 px-1 rounded"
                onClick={handleClick}
            >
                {isCollapsed ? `{${keyCount}}` : '{'}
            </span>
            
            {!isCollapsed && (
                <div>
                    {Object.entries(data).map(([key, value], index) => (
                        <div key={key} style={{ marginLeft: '20px' }}>
                            <span className="text-gray-600">"{key}"</span>: {' '}
                            <JsonViewer data={value} level={level + 1} />
                            {index < Object.keys(data).length - 1 && ','}
                        </div>
                    ))}
                </div>
            )}
            
            {!isCollapsed && <div>{indent}{'}'}</div>}
        </div>
    );
};

export default JsonViewer;