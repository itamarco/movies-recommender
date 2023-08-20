import axios from "axios";
import React, { useState } from "react";

const Vote = ({movieId}) => {
    const [rating, setRating] = useState(0);

    const handleVote = (stars) => {
      setRating(stars);
      axios.post(`/vote/${movieId}`, { vote: stars });
    };


    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((stars) => (
                <span
                    key={stars}
                    className={`star ${stars <= rating ? 'selected' : ''}`}
                    onClick={() => handleVote(stars)}
                >
                ★
                </span>
        ))}
    </div>
    )
}

export default Vote;