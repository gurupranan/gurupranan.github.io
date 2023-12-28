import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyD27EFMpChpPEoTdwoN61TOzm9aU39K7f0",
  authDomain: "bday-mailer-62c96.firebaseapp.com",
  databaseURL: "https://bday-mailer-62c96-default-rtdb.firebaseio.com",
  projectId: "bday-mailer-62c96",
  storageBucket: "bday-mailer-62c96.appspot.com",
  messagingSenderId: "767480013407",
  appId: "1:767480013407:web:201a8d7b38a0f7c4c971ea",
  measurementId: "G-YSG0R407MB"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const Interface = () => {
  const [persons, setPersons] = useState([]); //comp state data value as empty array

  useEffect(() => {
    const dbRef = ref(db, "persons");

    const fetchData = () => {
      onValue(dbRef, (snapshot) => {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          data.push({...childData, id: childKey });
        });
        setPersons(data);
      });
    };

    fetchData();

    // return () => {
    //   console.log("retruncln");
    // };
  }, [db]);//dependency array

  const writeUserData = (event) => {
    //event.preventDefault();

    const name = document.getElementById("name").value;
    const mail = document.getElementById("mail").value;
    const dob = document.getElementById("dob").value;

    if (name && mail && dob) {
      const userId = push(ref(db, "persons")).key;
      set(ref(db, 'persons/' + userId), {
        name: name,
        email: mail,
        birth: dob
      });
      alert("Data added");
    }
  };
const tableStyle = {
  height: 320,
  overflow: "auto",
} 


  return (
    <div style={{ marginTop: '50px', marginRight: '80px' }}>
      <div style={{ textAlign: 'right', justifyContent: 'center' }}>
        <form>
          <input style={{ width: '31%', height: '40px' }} type="text" id="name" name="name" placeholder="Enter your name" />&nbsp;&nbsp;&nbsp;
          <input style={{ width: '31%', height: '40px' }} type="email" id="mail" name="email" placeholder="Enter your email" />&nbsp;&nbsp;&nbsp;
          <input style={{ width: '31%', height: '40px' }} type="text" id="dob" name="date" placeholder="Enter date of birth (dd-mm-yyyy)" />
          <br />
          <br />
          <button style={{ width: '31.25%', backgroundColor: '#d9d9d9', height: '40px' }} type="reset" id="addRecord" onClick={(event) => writeUserData(event)}>Add Record</button>
        </form>
      </div>
      <br />

      <div className= {"table"} style={{ textAlign: 'center', marginLeft: '70px', backgroundColor: '#d9d9d9', ...tableStyle }}>
        <table id="person" style={{ width: '100%', textAlign: 'left', margin: '10px' }}>
          <thead>
            <tr>
             <th>S. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person, sno) => (
              <tr key={person.id}>
                <td>{sno+1}</td>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.birth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'right', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', height: '20%' }}>
        <button style={{ position: 'fixed', bottom: '10px', right: '40px', width: '31%', backgroundColor: '#d9d9d9', height: '40px' }} type="submit" id="logout">Log Out</button>
      </div>
    </div>
  );
};

export default Interface;