import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          withCredentials: true, // if you’re using cookies/sessions
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <img
        src={user.imageUrl || "/default-avatar.png"}
        alt={user.name}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold text-center">{user.name}</h1>
      <p className="text-center text-gray-600">{user.email}</p>
      <p className="mt-4 text-center">{user.position}</p>
    </div>
  );
}

export default Profile;
