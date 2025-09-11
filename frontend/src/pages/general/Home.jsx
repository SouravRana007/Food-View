import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heart, Bookmark, MessageCircle, Home as HomeIcon } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [likes, setLikes] = useState({});
  const [saves, setSaves] = useState({});
  const [comments, setComments] = useState({});

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
  }, [videos]);

  // Handle store visit button click
  const handleVisitStore = (id) => {
    navigate(`/food-partner/${id}`);
  };

  // Like, Save, Comment Handlers
  const handleLike = (id) => setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
  const handleSave = (id) => {
    const savedVideo = videos.find((v) => v._id === id);
    const existingSaves = JSON.parse(localStorage.getItem("savedVideos")) || [];

    // Avoid duplicates
    const updatedSaves = [
      ...existingSaves.filter((v) => v._id !== id),
      savedVideo,
    ];
    localStorage.setItem("savedVideos", JSON.stringify(updatedSaves));

    setSaves({ ...saves, [id]: (saves[id] || 0) + 1 });
  };

  const handleComment = (id) =>
    setComments({ ...comments, [id]: (comments[id] || 0) + 1 });

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
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.video}
            className="h-full w-full object-cover"
            loop
            muted
          ></video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Right Side Icons */}
          <div className="absolute right-4 top-1/3 flex flex-col gap-5 items-center text-white">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleLike(video._id)}
            >
              <Heart className="w-10 h-10 hover:text-red-500 rounded-full bg-black/30 backdrop-blur-md py-2 flex justify-around text-white border-t border-white/10" />
              <span className="text-xs mt-1">{likes[video._id] || 0}</span>
            </div>

            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSave(video._id)}
            >
              <Bookmark className="w-10 h-10 hover:text-yellow-500 rounded-full bg-black/30 backdrop-blur-md py-2 flex justify-around text-white border-t border-white/10" />
              <span className="text-xs mt-1">{saves[video._id] || 0}</span>
            </div>

            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleComment(video._id)}
            >
              <MessageCircle className="w-10 h-10 hover:text-blue-500 rounded-full bg-black/30 backdrop-blur-md py-2 flex justify-around text-white border-t border-white/10" />
              <span className="text-xs mt-1">{comments[video._id] || 0}</span>
            </div>
          </div>

          {/* Description & Visit Store Button */}
          <div className="absolute bottom-20 w-full flex flex-col items-center px-4 text-center text-white">
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-black/30 backdrop-blur-md py-2 flex justify-around text-white border-t border-white/10">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/saved")}
        >
          <Bookmark className="w-6 h-6" />
          <span className="text-xs">Saved</span>
        </div>
      </div>
    </div>
  );
}
