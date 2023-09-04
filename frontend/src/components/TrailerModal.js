import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TrailerModal.css"


const Modal = ({ isOpen, onClose, youtubeKey }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeKey}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const TrailerModal = ({movieId}) => {
  const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);


    const openTrailer = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

      useEffect(() => {
    // Fetch the trailer info
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`)
      .then(res => res.data)
      .then(data => { 
        const youtubeTrailer = data.results.find(video => video.site === 'YouTube');
        if (youtubeTrailer) {
          setTrailer(youtubeTrailer.key);
        }
      }).catch( err => {
        console.error(err)
      });
  }, [movieId]);

  
    return  (
        <div>
        {trailer && (
            <button onClick={openTrailer}>
              <img src="/static/youtube-play-button.png" alt="Play Trailer" height="80px" />
            </button>
          )}

         <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            youtubeKey={trailer}
          />
          </div>
    )
}
export default TrailerModal;
