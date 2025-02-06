import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const canViewComments = user?.role === 'admin' || user?.role === 'commentator';

  useEffect(() => {
    if (canViewComments) {
      fetchComments();
    }
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/api/comments/${articleId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/comments', {
        articleId,
        content: newComment
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    }
  };

  return (
    <div className="w-1/4 ml-4 bg-gray-800 text-secondary rounded-lg p-4 h-[85vh] flex flex-col">
      <h3 className="text-xl font-bold mb-4">Commentaires</h3>
      
      {canViewComments ? (
        <>
          <form onSubmit={handleSubmit} className="mb-4 flex-shrink-0">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white resize-none"
              placeholder="Ajouter un commentaire..."
              rows="3"
            />
            <button 
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              Commenter
            </button>
          </form>

          <div className="overflow-y-auto flex-grow space-y-4 pr-2 custom-scrollbar">
            {comments.map(comment => (
              <div key={comment.id} className="p-3 bg-gray-700 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">{comment.username}</span>
                  <span className="text-sm text-gray-400">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-400">
          Vous devez être commentateur ou administrateur pour voir les commentaires.
        </p>
      )}
    </div>
  );
};

export default Comments;
