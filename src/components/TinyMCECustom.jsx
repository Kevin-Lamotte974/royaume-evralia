import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCECustom = ({ data, onChange }) => {
  return (
    <Editor
      apiKey='cqzzbepc5yiumkaoj4nkrg1xcw2bzni17zjjdwgcu3dr69px'
      value={data}
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      onEditorChange={onChange}
    />
  );
};

export default TinyMCECustom;
