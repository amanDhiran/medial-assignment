import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PostPage = () => {
    const { postId } = useParams(); 
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/post/${postId}`);
                setPost(response.data);
            } catch (error) {
                setError('Error fetching post details');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div className='px-8 py-10 lg:max-w-screen-lg m-auto'>
            <Helmet>
                <title>{post.title}</title>
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.content} />
                <meta property="og:image" content={`${post.ogImage}`} />
                <meta property="og:url" content={`http://localhost:3000/post/${postId}`} />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className='border p-5 rounded-lg'>
            {post.image && <img className='rounded-lg h-auto ' src={post.image} alt='post_image' />}
            <h1 className='mt-5 text-2xl font-bold'>{post.title}</h1>
            <p className='mt-1 text-gray-400'>@username</p>
            <p className='mt-6 text-lg'>{post.content}</p>
            </div>
        </div>
    );
};

export default PostPage;