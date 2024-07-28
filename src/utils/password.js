export const setPassword = (password) => {
    localStorage.setItem('editorPassword', password);
  };
  
  export const getPassword = () => {
    return localStorage.getItem('editorPassword');
  };
  
  export const clearPassword = () => {
    localStorage.removeItem('editorPassword');
  };
  