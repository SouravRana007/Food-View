import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Saved() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [savedVideos, setSavedVideos] = useState([]);
  const videoRefs = useRef([]);

  // Load saved videos from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedVideos")) || [];
    setSavedVideos(saved);
  }, []);

  // Intersection Observer for autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) video.play();
          else video.pause();
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [savedVideos]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black"
    >
      {savedVideos.length === 0 ? (
        <div className="h-screen flex items-center justify-center text-white text-lg">
          No Saved Videos
        </div>
      ) : (
        savedVideos.map((video, index) => (
          <div
            key={video._id}
            className="relative h-screen w-full flex-shrink-0 snap-start bg-black"
          >
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.video}
              className="h-full w-full object-cover"
              loop
              muted
            ></video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Description */}
            <div className="absolute bottom-20 w-full flex flex-col items-center px-4 text-center text-white">
              <p className="text-sm mb-2 line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))
      )}

      {/* Back Button */}
      <div
        className="fixed top-4 left-4 text-white bg-gray-900 px-3 py-1 rounded cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back
      </div>
    </div>
  );
}
