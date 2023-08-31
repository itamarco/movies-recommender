import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../store/MoviesContext";

const Vote = ({movieId}) => {
    const [rating, setRating] = useState(0);
    const {userVotes, dispatch} = useContext(MoviesContext);

    const handleVote = (stars) => {
        if (stars == rating){
            stars =0
        }
        setRating(stars);
        axios.post(`/vote/${movieId}`, { vote: stars });
        dispatch({type: "ADD_VOTE", payload: {movieId, vote: stars}})
    };

    useEffect( ()=> {
        const vote = userVotes[movieId] || 0
        setRating(vote)
    }, [userVotes])

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