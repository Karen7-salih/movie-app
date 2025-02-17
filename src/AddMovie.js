import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";



const fetchMovies = async () => {
    const { data } = await axios.get("http://localhost:5000/movies");
    return data.map(movie => {
        return { id: Number(movie.id), title: movie.title, year: movie.year };
    });
};

export function AddMovie() {
    const [title, setTitle] = useState("");  
    const [year, setYear] = useState("");    
    const [message, setMessage] = useState(""); 
    
    // Fetch movies from the server
    const { data: movies, isLoading, error } = useQuery({
        queryKey: ['movies'],
        queryFn: fetchMovies,
        staleTime: 5000,
    });

    // React Query: Mutation to add a new movie
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (newMovie) => {
            return axios.post("http://localhost:5000/movies", newMovie);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['movies']); // Refresh movie list
            setMessage("The Movie Was Added Successfully!");
            setTitle("");  // Clear form
            setYear("");  
        },
        onError: () => {
            setMessage("Error adding movie. Try again.");
        }
    });

    // Get the last used ID safely, ensuring fallback value of 0
    let lastMovieId = 0;
    if (movies && movies.length > 0) {
        let movieIds = movies.map(movie => Number(movie.id));
        lastMovieId = Math.max(...movieIds);
    }

    function addMovie() {
        if (!title || !year) {
            setMessage("⚠ Please fill in all fields.");
        } else {
            const newMovieId = lastMovieId + 1; // Generate next ID
            mutation.mutate({ id: newMovieId, title: title, year: year });
        }
    }

    if (isLoading) return <p>Loading movies...</p>;
    if (error) return <p>Error loading movies.</p>;

    return (
        <div>
            <h2>Add a Movie here</h2>

            {/* Show the last movie ID */}
            <p>Last Movie ID: {lastMovieId}</p>

            <p>{message}</p>

            <input 
                type="text" 
                placeholder="Enter movie Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />

            <input 
                type="number" 
                placeholder="Enter release Year" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
            />

            <button onClick={addMovie}>Click to add Movie</button>
        </div>
    );
}

export default AddMovie;
