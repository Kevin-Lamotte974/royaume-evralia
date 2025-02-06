import React, { useState, useEffect } from 'react';

const EditorLoader = ({ value, onChange }) => {
  const [CKEditor, setCKEditor] = useState(null);
  const [ClassicEditor, setClassicEditor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEditor() {
      try {
        const CKEditorModule = await import('@ckeditor/ckeditor5-react');
        const ClassicEditorModule = await import('@ckeditor/ckeditor5-build-classic');
        
        setCKEditor(() => CKEditorModule.CKEditor);
        setClassicEditor(() => ClassicEditorModule.default);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement de CKEditor:', error);
      }
    }
    loadEditor();
  }, []);

  if (loading) {
    return <div className="bg-white rounded p-4">Chargement de l'éditeur...</div>;
  }

  return (
    <div className="bg-white rounded">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo']
        }}
      />
    </div>
  );
};

export default EditorLoader;
