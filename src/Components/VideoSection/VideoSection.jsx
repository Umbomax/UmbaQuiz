import React from "react";
import classes from "./VideoSection.module.css";

const VideoSection = ({ videoId }) => {
    return (
        <div className={classes.videoWrapper}>
            <iframe
                title="Video Demo"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default VideoSection;
