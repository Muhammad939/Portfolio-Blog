// main.js
document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('postForm');
  const postsDiv = document.getElementById('posts');

  postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(postForm);
    const title = formData.get('title');
    const content = formData.get('content');

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });

      const data = await response.json();
      console.log('Post created:', data);

      // Clear form inputs
      postForm.reset();

      // Optionally, display the newly created post on the page
      const postElement = document.createElement('div');
      postElement.innerHTML = `<h3>${data.title}</h3><p>${data.content}</p><small>${new Date(data.date).toLocaleDateString()}</small>`;
      postsDiv.appendChild(postElement);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  });

  // Fetch and display existing posts
  fetchPosts();
});

async function fetchPosts() {
  try {
    const response = await fetch('http://localhost:5000/api/posts');
    const data = await response.json();
    const postsDiv = document.getElementById('posts');

    data.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>${new Date(post.date).toLocaleDateString()}</small>`;
      postsDiv.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}
