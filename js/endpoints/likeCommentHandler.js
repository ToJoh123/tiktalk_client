export async function likeCommentHandler(event) {
    const commentId = event.target.dataset.commentId;
  
    try {
      const response = await fetch(`http://localhost:3000/comments/like/${commentId}`, {
        method: 'PATCH',
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        const likeBtn = document.getElementById(`like-btn-${commentId}`);
        likeBtn.classList.toggle('liked');
        likeBtn.textContent = data.numberOfLikes;
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  }