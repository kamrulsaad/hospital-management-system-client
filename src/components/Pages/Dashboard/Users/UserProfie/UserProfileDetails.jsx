import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUserData from "../../../../Hooks/useUserData";
import Spinner from "../../../../Shared/Spinner";

const UserProfileDetails = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(null);
  const {user, role, loading} = useUserData();

  const imageInput = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Update Profile Picture
  const updateProfilePic = () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image, image?.name);
    //  send to backend
    fetch("http://localhost:5000/api/v1/user/upload-picture", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          toast.success(result.message);
          window.location.reload();
        } else {
          toast.error(result.error);
        }
        setUploading(false);
      });
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="grid justify-items-center  ">
      <section className="pt-16 bg-blueGray-50 w-full p-56 ">
        <div className="w-full  px-4 mx-auto  ">
          <div className="relative bg-tahiti-white  flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="w-48 h-48 bg-indigo-100 bg-tahiti-white   mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    {user?.imageURL ? (
                      <img
                        src={user?.imageURL}
                        className="rounded-full w-48 h-48 object-cover border border-tahiti-lightGreen"
                        alt=""
                      />
                    ) : (
                      <FaUserAlt className="text-tahiti-dark opacity-50 text-8xl" />
                    )}
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20"></div>
              </div>
              <div className="text-center mt-12 pb-20">
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {user?.firstName} {user?.lastName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {role}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Email: <b>{user?.email}</b>
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  Phone: <b>{user?.phone}</b>
                </div>
                <Link to="/user/updatepassword">
                  <button className="btn btn-ghost btn-xs bg-tahiti-primary">Update Password</button>
                </Link><br />

                <input
                  type="file"
                  onChange={imageInput}
                  name="file"
                  id="file"
                  placeholder=""
                  className="mt-5 px-3 py-2 rounded-md "
                />
                <button
                  className="btn btn-ghost btn-xs bg-tahiti-primary"
                  onClick={updateProfilePic}
                >
                  {uploading ? (
                    <img
                      src="assets/loading.png"
                      className="w-6 mx-8 animate-spin"
                      alt=""
                    />
                  ) : (
                    "Update Profile Picture"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfileDetails;
