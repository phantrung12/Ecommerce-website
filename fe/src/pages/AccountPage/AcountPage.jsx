import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { getUser, updateUser } from "../../redux/actions/user.actions";
import "./AccountPage.css";
import Footer from "../../components/Footer";

const AcountPage = () => {
  const id = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({});

  const [profilePicture, setProdfilePicture] = useState("");

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file !== null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const user = { id, profilePicture: downloadURL, ...inputs };
            dispatch(updateUser(user));
          });
        }
      );
    } else {
      const user = { id, profilePicture: "", ...inputs };
      dispatch(updateUser(user));
    }
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  useEffect(() => {
    setProdfilePicture(user.userInfo.profilePicture);
    // console.log(user.userInfo.profilePicture);
  }, [user.userInfo]);

  return (
    <Layout>
      <div className="accContainer">
        <div className="accSidebar">
          <div className=""></div>
          <ul>
            <li>Sửa thông tin</li>
            <li>Đổi mật khẩu</li>
            <li>Danh sách địa chỉ</li>
            <li>Đơn hàng của bạn</li>
          </ul>
        </div>
        <div className="accContent">
          <div className="contentWrapper">
            <div className="userTitleContainer">
              <h1 className="userTitle">Sửa thông tin</h1>
            </div>
            <div className="userContainer">
              <div className="userShow">
                <div className="userShowTop">
                  <img
                    src={
                      profilePicture
                        ? profilePicture
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt=""
                    className="userShowImg"
                  />
                  <div className="userShowTopTitle">
                    <span className="userShowUsername">
                      {user.userInfo.firstName} {user.userInfo.lastName}
                    </span>
                    <span className="userShowUserTitle">
                      {user.userInfo.username}
                    </span>
                  </div>
                </div>
                <div className="userShowBottom">
                  <span className="userShowTitle">Account Details</span>
                  <div className="userShowInfo">
                    <PermIdentity className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {user.userInfo.username}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">10.12.1999</span>
                  </div>
                  <span className="userShowTitle">Contact Details</span>
                  <div className="userShowInfo">
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {user.userInfo.contactNumber}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <MailOutline className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {user.userInfo.email}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <LocationSearching className="userShowIcon" />
                    <span className="userShowInfoTitle">New York | USA</span>
                  </div>
                </div>
              </div>
              <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form
                  className="userUpdateForm"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                      <label>Username</label>
                      <input
                        name="username"
                        type="text"
                        placeholder={user.userInfo.username}
                        className="userUpdateInput"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder={user.userInfo.firstName}
                        onChange={handleChange}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder={user.userInfo.lastName}
                        className="userUpdateInput"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder={user.userInfo.email}
                        className="userUpdateInput"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="contactNumber"
                        placeholder={user.userInfo.contactNumber}
                        className="userUpdateInput"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Address</label>
                      <input
                        type="text"
                        placeholder="New York | USA"
                        className="userUpdateInput"
                      />
                    </div>
                  </div>
                  <div className="userUpdateRight">
                    <div className="userUpdateUpload">
                      <img
                        className="userUpdateImg"
                        src={
                          profilePicture
                            ? profilePicture
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                      />
                      <label htmlFor="file">
                        <Publish className="userUpdateIcon" />
                      </label>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={(e) => imageHandler(e)}
                      />
                    </div>
                    <button className="userUpdateButton">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default AcountPage;
