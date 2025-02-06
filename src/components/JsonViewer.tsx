"use client"
import React, { useState, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";


// Reference
// const dataSet = {
//     name: "Pomodoro technique",
//     children: [{
//         name: "Method",
//         children: [{
//             name: "Everyday workflow"
//         }, {
//             name: "Tools",
//             children: [{
//                 name: "Paper"
//             }
//
//
//             const stack = []
// // const map = new Map();
//             function showMessages(node,level= 0) {
//             if(!node.children) {
//     return
// }
// if(node.children) {
//     // map.set(node.name, level)
//     stack.push({name : node.name, level})
//
//     // console.log('map', map.keys(), "val", map.values())
// }
// // //
// [...node.children].forEach((item) => {
//     showMessages(item, level+1)
//     // console.log('this is node foreach',item )
// })
// // console.log('map end', map.keys(), "val end", map.values())
//
// }
// const data = showMessages(dataSet)
// console.log(stack.map(item => "  ".repeat(item.level) + item.name).join("\n"));
interface JsonViewerProps {
    data: any;
    level?: number;
    path?: string;
}

const JsonViewer = memo(({ data, level = 0, path = '' }: JsonViewerProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsCollapsed(prev => !prev);
    }, []);

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
            displayValue = String(data);
        }

        if (isClickable && typeof data === 'string') {
            let path = data;
            if (data.includes('get(')) {
                path = data.match(/get\((.*?)\)/)?.[1] || '';
            }
            return (
                <Link 
                    href={`/?path=${path}`}
                    className={`${className} hover:underline`}
                >
                    {displayValue}
                </Link>
            );
        }

        return (
            <span className={className}>
                {displayValue}
            </span>
        );
    }

    const indent = "  ".repeat(level);
    const keyCount = Object.keys(data).length;
    const isArray = Array.isArray(data);

    return (
        <div style={{marginLeft: level > 0 ? '20px' : '0'}}>
            <span 
                className="cursor-pointer hover:bg-blue-100 px-1 rounded text-black"
                onClick={handleClick}
            >
                {isCollapsed ? (isArray ? `[${keyCount}]` : `{${keyCount}}`) : (isArray ? '[' : '{')}
            </span>
            
            {!isCollapsed && (
                <div>
                    {isArray ? (
                        // Handle arrays without numerical indices
                        data.map((item: any, index: number) => (
                            <div key={`${path}-${index}`} style={{ marginLeft: '20px' }}>
                                <JsonViewer 
                                    data={item} 
                                    level={level + 1} 
                                    path={`${path}-${index}`}
                                />
                                {index < data.length - 1 && <span className="text-black">,</span>}
                            </div>
                        ))
                    ) : (
                        // Handle objects as before
                        Object.entries(data).map(([key, value], index) => (
                            <div key={`${path}-${key}`} style={{ marginLeft: '20px' }}>
                                <span className="text-black">"{key}"</span>: {' '}
                                <JsonViewer 
                                    data={value} 
                                    level={level + 1} 
                                    path={`${path}-${key}`}
                                />
                                {index < Object.keys(data).length - 1 && <span className="text-black">,</span>}
                            </div>
                        ))
                    )}
                </div>
            )}
            
            {!isCollapsed && (
                <div>
                    {indent}<span className="text-black">{isArray ? ']' : '}'}</span>
                </div>
            )}
        </div>
    );
});

JsonViewer.displayName = 'JsonViewer';

export default JsonViewer;