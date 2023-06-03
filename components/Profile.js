import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';

const Profile = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [editMode, setEditMode] = useState(false); 

  useEffect(() => {
    // Fetch user details from the backend server
    axios
      .get('http://keshav.ddns.net:5000/api/profile')
      .then((response) => {
        const userProfile = response.data;
        // Update the state variables with the fetched user details
        setAge(userProfile.age);
        setGender(userProfile.gender);
        setDob(userProfile.dob);
        setMobile(userProfile.mobile);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!editMode) {
      // Create an object with the updated profile data
      const updatedProfile = {
        age,
        gender,
        dob,
        mobile,
      };

      // Send the updated profile data to the backend server
      axios
        .post('http://keshav.ddns.net:5000/api/profile', updatedProfile)
        .then((response) => {
          // Handle the response or show a success message
          console.log(response.data);
        })
        .catch((error) => {
          // Handle the error or show an error message
          console.error(error);
        });
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="profilemain">
      <div className="myprofile">
        <h2 id="profile">Hi, Welcome Back</h2>
        <form id="profile-form" onSubmit={handleUpdate}>
          <label className="clslable" htmlFor="age">
            Age:
          </label>
          <input
            type="number"
            className="inputcls"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={!editMode} 
          />
          <button className="editbtn" id="ageedit" onClick={toggleEditMode}>
            {editMode ? 'Save' : 'Edit'}
          </button>

          <label className="clslable" htmlFor="gender">
            Gender:
          </label>
          <select
            value={gender}
            id="genderedit"
            onChange={(e) => setGender(e.target.value)}
            disabled={!editMode} 
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button className="editbtn" id="genderedit" onClick={toggleEditMode}>
            {editMode ? 'Save' : 'Edit'}
          </button>

          <label className="clslable" htmlFor="dob">
            Date of Birth:
          </label>
          <input
            type="date"
            className="inputcls"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            disabled={!editMode}
          />
          <button className="editbtn" id="dobedit" onClick={toggleEditMode}>
            {editMode ? 'Save' : 'Edit'}
          </button>

          <label className="clslable" htmlFor="mobile">
            Mobile:
          </label>
          <input
            type="text"
            className="inputcls"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={!editMode} 
          />
          <button className="editbtn" id="numedit" onClick={toggleEditMode}>
            {editMode ? 'Save' : 'Edit'}
          </button>

          <input
            id="profilebtn"
            type="submit"
            value="Update"
            onClick={toggleEditMode}
            
          />
        </form>
      </div>
      <a id="logoutbtn" href="/login">
        Logout
      </a>
    </div>
  );
};

export default Profile;
