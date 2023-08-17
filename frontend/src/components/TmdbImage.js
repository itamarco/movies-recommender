import React from "react";

const TmdbImage = ({path, alt, className}) => {
    const fullPath = `https://image.tmdb.org/t/p/w300/${path}`
    return (
        <img src={fullPath} alt={alt} className={className} />
    )
}

export default TmdbImage;