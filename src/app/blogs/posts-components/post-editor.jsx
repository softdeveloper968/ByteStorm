"use client";

import { useState } from 'react';
import { useRef } from "react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


export default function PostEditor({ name, content, setContent }) {
    // const [content, setContent] = useState('');
    const postImput = useRef();

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            // ['link', 'image'],
            [{ align: [] }],
            // [{ color: [] }, { background: [] }],
            // ['code-block'],
            ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        // 'image',
        'align',
        // 'color',
        // 'background',
        // 'code-block',
    ];

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    return (
        <main className="w-full">
            <input
                type="hidden"
                id={name}
                name={name}
                value={content}
                ref={postImput}
                required
            />

            <QuillEditor
                value={content}
                onChange={handleEditorChange}
                modules={quillModules}
                formats={quillFormats}
                className="bg-slate-100 p-4"
            />
        </main>
    );
};
