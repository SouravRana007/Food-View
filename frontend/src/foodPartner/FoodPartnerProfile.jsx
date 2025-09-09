import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FoodPartnerProfile() {
  const { id } = useParams();
  const [profile, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          {
            withCredentials: true,
          }
        );

        setProfileData(res.data.foodPartner);
        setVideos(res.data.foodPartner?.foodItems || []); // fallback if no videos
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>;
  if (!profile)
    return (
      <div className="text-white text-center mt-10">Profile not found</div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Profile Card */}
      <div className="bg-gray-900 rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Business Logo */}
          <div className="w-20 h-20 bg-gray-600 rounded-full overflow-hidden">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQG7bty3-yHZ5g/profile-displayphoto-shrink_400_400/B4DZWsyWN9HAAk-/0/1742360635724?e=1760572800&v=beta&t=-CdU3Vs_93DjXPfd6GOIT7qqmhsN4SwNbnnlAl2e0Kw"
              alt=""
            />
          </div>

          {/* Business Info */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-gray-400">{profile.address}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-4 border-t border-gray-700 pt-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Meals</p>
            <p className="text-lg font-bold">{videos.length || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Customers Served</p>
            <p className="text-lg font-bold">{profile.customerServe || 0}</p>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-3 gap-1">
        {videos.length > 0 ? (
          videos.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-md overflow-hidden h-48"
            >
              <video src={item.video} className="w-full h-full object-cover" />
              <p className="text-center mt-2 text-sm">{item.name}</p>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-400">
            No videos available
          </p>
        )}
      </div>
    </div>
  );
}
