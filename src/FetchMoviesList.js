import { useState, useEffect } from "react";
import axios from "axios";

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
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)"
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

// Fetch Movies and Display them in a row
function FetchMoviesList() {
    const [movieList, setMovieList] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);  

            try {
                const response = await axios.get("http://localhost:5000/movies");
                setMovieList(response.data);  

            } catch (error) {
                setError("Something went wrong"); 
            }

            setIsLoading(false);
        };
        fetchMovies();
    }, []);

    if (isLoading) return <p>Loading data...</p>;  
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;  

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "grey" }}>Movies List</h2>
            <div style={{
                display: "flex", 
                justifyContent: "center", 
                gap: "20px", 
                flexWrap: "wrap",  
                padding: "10px"
            }}>
                {movieList.map((movie) => (
                    <MovieItem key={movie.id} movieData={movie} /> 
                ))}
            </div>
        </div>
    );
}

export default FetchMoviesList;