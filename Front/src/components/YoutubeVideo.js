import React from 'react';
import './YoutubeVideo.css';
 
function YoutubeVideo({ links }) {
    if (!links || links.length === 0) {
        return <p>Nema dostupnih video zapisa</p>; 
    }
 
    return (
        <div className="video-gallery">
            <div className="videos">
                {links.map((link, index) => (
                    <div key={index} className="video">
                        <iframe
                            width="300"
                            height="200"
                            src={`https://www.youtube.com/embed/${getYoutubeId(link)}`}
                            title={`Video ${index + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
function getYoutubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
 
export default YoutubeVideo;
