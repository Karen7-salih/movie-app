import { useQuery } from '@tanstack/react-query';
import axios from "axios";

// Function to fetch posts
const fetchPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
};

// Posts List Component
export function PostsList() {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 5000 // Data remains fresh for 5 seconds before refetching
    });

    if (isLoading) return <p>Loading posts, wait miss girl...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

    return (
        <div>
            <h2>Posts List</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <strong>{post.title}</strong> - {post.body}
                    </li>
                ))}
            </ul>
        </div>
    );
}
