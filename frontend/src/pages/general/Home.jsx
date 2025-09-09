import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]); // Store refs for all videos

  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        setVideos(res.data.foodItems || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Intersection Observer to play only one video at a time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play(); // Play when in view
          } else {
            video.pause(); // Pause when out of view
          }
        });
      },
      { threshold: 0.7 } // Video should be 70% visible to play
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  // Handle store visit button click
  const handleVisitStore = (id) => {
    navigate(`/food-partner/${id}`);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black"
    >
      {videos.map((video, index) => (
        <div
          key={video._id}
          className="relative h-screen w-full flex-shrink-0 snap-start bg-black"
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el)} // Store reference
            src={video.video}
            className="h-full w-full object-cover"
            loop
            muted
          ></video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Overlay Content */}
          <div className="absolute bottom-12 w-full flex flex-col items-center px-4 text-center text-white">
            <p className="text-sm mb-2 line-clamp-2">{video.description}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full font-semibold transition"
              onClick={() => handleVisitStore(video.foodPartner)}
            >
              Visit Store
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
