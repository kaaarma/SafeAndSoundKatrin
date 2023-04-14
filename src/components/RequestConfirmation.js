import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import img2 from "../images/img2.jpg";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../config/firebase";
import Button from "@mui/material/Button";


function RequestConfirmation() {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedRequest = location?.state?.selectedRequest;
    const [userData, setUserData] = useState("")


    const getUserDocument = async () => {
        try {
            const q = query(collection(database, "requests"),
                where("randomId", "==", selectedRequest.randomId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("User not found, please register.");
            } else {
                const dataRef= querySnapshot.docs[0].data()
                setUserData(dataRef)

            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserDocument();
    }, [])

    const toProfile = () => {
        navigate("/profile", { state: { userId: userData.userId, isSignedIn: true } });
    }


    return (
        <div style={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${img14})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
        }}>
            <div
                style={{
                    width: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "25px",
                    marginTop: "1px",
                    marginLeft: "90px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
            <h3>Your selected request:</h3>
            <p>Date: {selectedRequest.day}</p>
            <p>From: {selectedRequest.from}</p>
            <p>To: {selectedRequest.to}</p>
            <p>Starting time: {selectedRequest.timeframe_1}</p>
            <p>Latest arrival: {selectedRequest.timeframe_2}</p>
            <p>Number of the spots: {selectedRequest.needed_spots}</p>
                <p>Verification code: {selectedRequest.randomId}</p>
        </div>
            <div
                style={{
                    width: "20%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "25px",
                    marginTop: "1px",
                    marginLeft: "90px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                <img src={userData.user_profile_pic}></img>
                <p>User's name: {userData.user_first_name} {userData.user_last_name} </p>
                <p>User's phone: {userData.user_phone}</p>
                <Button
                    variant="contained"
                    onClick={toProfile}>
                    User's profile
                </Button>
            </div>
        </div>
    );
}
export default RequestConfirmation;
