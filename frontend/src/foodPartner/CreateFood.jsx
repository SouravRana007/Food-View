import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateFood() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    videos: [],
  });
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [uploading, setUploading] = useState(false); // For loader

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Video Selection
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      videos: [...formData.videos, ...files],
    });
    setVideoPreviews([...videoPreviews, ...newPreviews]);
  };

  // Submit Form with Loader
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // Start loader
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      formData.videos.forEach((file) => data.append("video", file));

      await axios.post("http://localhost:3000/api/food", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
      });
      toast.success("Food Item Created Successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/");
    } catch (err) {
      toast.error("Failed to create food item!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      console.error(err);
    } finally {
      setUploading(false); // Stop loader
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Create Food Item
        </h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
        />

        {/* Description Input */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="2"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none resize-none"
        />

        {/* Upload Video */}
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleVideoChange}
          className="w-full text-sm text-gray-400 file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg hover:file:bg-purple-700"
        />

        {/* Video Previews with Loader */}
        {videoPreviews.length > 0 && (
          <div className="space-y-2 mt-3">
            {videoPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <video
                  src={preview}
                  controls
                  className="w-full h-28 rounded-lg border border-gray-700 object-cover"
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg"
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
