import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Function to Fetch Movies
const FetchMovies = async () => {
    const { data } = await axios.get("http://localhost:5000/movies");
    return data;
};

// Component for a Single Movie
const MovieItem = ({ movieData }) => {
    return (
        <div 
            className="movie-item"
            style={{
                textAlign: "center",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
                width: "250px",
                backgroundColor: "#f9f9f9",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out"
            }}
        >
            <h3 style={{ fontWeight: "bold" }}>{movieData.title}</h3>
            <p><strong>Year:</strong> {movieData.year}</p>
            <img 
                src={movieData.image} 
                alt={movieData.title} 
                style={{ 
                    width: "100%", 
                    height: "350px", 
                    objectFit: "cover", 
                    borderRadius: "10px" 
                }} 
            />
        </div>
    );
};

export function FetchMoviesList() {
    const { data: movies, error, isLoading } = useQuery({
        queryKey: ["movies"], 
        queryFn: FetchMovies, 
        staleTime: 5000, 
    });

    if (isLoading) return <p>Loading data...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>; 

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "grey" }}>kareens Movies List</h2>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
                padding: "10px"
            }}>
                {movies.map((movie) => (
                    <MovieItem key={movie.id} movieData={movie} />
                ))}
            </div>
        </div>
    );
}

export default FetchMoviesList;
