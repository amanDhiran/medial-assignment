import React, { useState } from 'react';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/create-post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, image }),
    });
    const result = await response.json();
    console.log(result);
    setGeneratedImage(result.ogImage)
    setPostUrl(result.postUrl)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 px-3 py-2 block w-full border border-gray-300  focus:border outline-none rounded-md shadow-sm  sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 px-3 py-2 focus:border outline-none block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
            rows="4"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">
            Image URL (optional)
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border outline-none sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#000000] text-white py-2 px-4 rounded-md shadow hover:bg-[#27272A] "
        >
          Create Post
        </button>
      </form>
      {postUrl && (
                <div className='mt-9'>
                    <div>
                        <p className='font-bold'>Post Link:</p>
                        <a className='text-blue-600 mt-5 hover:text-blue-800' href={postUrl} target="_blank" rel="noopener noreferrer">{postUrl}</a>
                    </div>
                    {generatedImage && <div className='mt-8'>
                      <p className='font-semibold'>Generated OG Image Link: </p>
                      <a href={generatedImage} target="_blank" rel="noopener noreferrer" className='mt-2 text-blue-600 hover:text-blue-800'>{generatedImage}</a>
                      <p className='mt-5 font-semibold'>Generated OG Image:</p>
                      <img className=' mt-3 border rounded-md' src={generatedImage} alt="OG Preview" />
                    </div>}
                </div>
            )}
    </div>
  );
}

export default CreatePost;
