import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formatText } from '../services/geminiService';
import { FaMagic, FaUndo } from 'react-icons/fa';  // Ajout de FaUndo

const RichTextEditor = ({ value, onChange }) => {
  const [isFormatting, setIsFormatting] = useState(false);
  const [originalContent, setOriginalContent] = useState('');

  const handleFormat = async () => {
    try {
      setIsFormatting(true);
      const formattedContent = await formatText(value);
      setOriginalContent(value);
      if (formattedContent && formattedContent !== value) {
        onChange(formattedContent);
      }
    } catch (error) {
      console.error('Erreur lors du formatage:', error);
      alert('Erreur lors du formatage du texte');
    } finally {
      setIsFormatting(false);
    }
  };

  const handleRevert = () => {
    if (originalContent) {
      onChange(originalContent);
      setOriginalContent('');
    }
  };

    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'clean']
      ],
    };

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet',
      'link',
      'color', 'background'
    ];

    return (
      <div className="flex flex-col">
        <div className="mb-2 flex justify-end gap-2">
          <button
            onClick={handleRevert}
            disabled={!originalContent}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaUndo />
            Retour
          </button>
          <button
            onClick={handleFormat}
            disabled={isFormatting || !value}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaMagic />
            {isFormatting ? 'Formatage...' : 'Formater le texte'}
          </button>
        </div>
        <div className="bg-white rounded">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
    );
  };

  export default RichTextEditor;
