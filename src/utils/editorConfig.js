import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const editorConfiguration = {
  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo']
};

export const editor = ClassicEditor;
