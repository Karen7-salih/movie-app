import { useState, useEffect } from "react";
import axios from "axios";

function AddMovie({ onMovieAdded }) {
    const [title, setTitle] = useState("");  
    const [year, setYear] = useState("");    
    const [message, setMessage] = useState(""); 
    const [lastMovieId, setLastMovieId] = useState(0); // Store last used ID

    useEffect(() => {
        const fetchLastMovieId = async () => {
            try {
                const response = await axios.get("http://localhost:5000/movies");
                console.log("Response data:", response.data); // Debugging
                
                if (response.data && response.data.length > 0) {
                    // Ensure IDs are numbers
                    const ids = response.data.map(movie => {
                        const id = Number(movie.id);
                        return isNaN(id) ? 0 : id;  // If parsing fails, use 0
                    });
                    console.log("Parsed IDs:", ids); // Debugging
                    const highestId = Math.max(...ids);
                    setLastMovieId(highestId);
                } else {
                    setLastMovieId(0); 
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
    
        fetchLastMovieId();  
    }, []);
    
    function addMovie() {
        // If fields are empty, show a message
        if (!title || !year) {
            setMessage("⚠ Please fill in all fields girl");
        } else {
            const newMovieId = lastMovieId + 1; // Next ID

            axios.post("http://localhost:5000/movies", { id: newMovieId, title, year })
                .then(() => {
                    setMessage(`🎬 Movie added successfully with ID ${newMovieId}!`);
                    setTitle(""); // Clears the title input field
                    setYear("");  // Clears the year input field
                    setLastMovieId(newMovieId); // Update last movie ID

                    // Refresh the movie list if onMovieAdded is provided
                    if (onMovieAdded) {
                        onMovieAdded();
                    }
                })
                .catch(() => {
                    setMessage("❌ Error adding movie. Try again miss girl");
                });
        }
    }

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