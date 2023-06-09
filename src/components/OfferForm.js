import React, {useState, useRef, useEffect} from "react";
import {addDoc, collection, doc, getDoc} from "firebase/firestore";
import { database } from "../config/firebase";
import Button from "@mui/material/Button";
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { googleMapsApiKey } from "../config/config";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import img1 from "../images/img1.jpg";
import '../App.css'

function OfferForm() {

    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;
    const isSignedIn = location.state?.isSignedIn;
    const [userData, setUserData] = useState(null)
    const [date, setDate] = useState("")
    const [placeToStart, setPlaceToStart] = useState("")
    const [placeToGo, setPlaceToGo] = useState("")
    const [timeToGo, setTimeToGo] = useState("")
    const [timeToArrive, setTimeToArrive] = useState(0)
    const [freeSpots, setFreeSpots] = useState(false)
    const [price, setPrice] = useState("");
    const [submitOffer, setSubmitOffer] = useState(false)
   // const [seeDriveHistory, setSeeDriveHistory] = useState(false)
    const placeToStartRef = useRef(null);
    const placeToGoRef = useRef(null);


    const requestsCollectionRef = collection(database, "offers")

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const handleRequest = async () => {

        let randomId = generateString(5)

        try {
            await addDoc(requestsCollectionRef, {
                day: date,
                from: placeToStart,
                to: placeToGo,
                timeframe_1: timeToGo,
                timeframe_2: timeToArrive,
                needed_spots: freeSpots,
                price: price,
                randomId: randomId,
                userId: userId,
                user_first_name: userData.first_name,
                user_last_name: userData.last_name,
                user_email: userData.email,
                user_phone: userData.phone,
                user_profile_pic: userData.profile_pic,
                user_licence_plate: userData.licence_plate,
                user_licence_Pic: userData.driving_licence_pic,
            });
            document.getElementById("OfferForm").reset();
            setSubmitOffer(true)

        } catch (err) {
            console.error(err)
        }
    }

    const handlePlaceToStartSelect = () => {
        const place = placeToStartRef.current.getPlace();
        if (!place || !place.geometry) {
            console.error('Invalid place object:', place);
            return;
        }
        setPlaceToStart(place.formatted_address);
    }

    const handlePlaceToGoSelect = () => {
        const place = placeToGoRef.current.getPlace();
        if (!place || !place.geometry) {
            console.error('Invalid place object:', place);
            return;
        }
        setPlaceToGo(place.formatted_address);
    };

    const getUserDocument = async () => {
        try {
            const userRef = doc(database, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserData(userData)
            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserDocument(userId);
    }, []);

    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             backgroundImage: `url(${img1})`,
             backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"

        }}>
            <div
                style={{
                    width: "45%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "25px",
                    marginTop: "-20px",
                    marginLeft: "40px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {isSignedIn && (
                    <>
                    <form id="OfferForm">
                    <h3>You would like to share your ride?
                        <br />
                        Insert an offer here:</h3>
                    <label
                        style={{ fontSize: "12px" }}>
                        Date of the ride:
                    </label>
                    <br />
                        <input
                            type="date"
                            style={{ borderRadius: "8px" }}
                            onChange={(e) =>
                                setDate(e.target.value)} />

                    <LoadScript
                        googleMapsApiKey={googleMapsApiKey}
                        libraries={['places']}
                    ><label
                        style={{ fontSize: "12px" }}>
                        From:
                    </label>
                        <Autocomplete
                            onLoad={(ref) =>  placeToStartRef.current = ref}
                            onPlaceChanged={ handlePlaceToStartSelect }
                            options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
                        >
                            <input type="text" placeholder="Starting point*" style={{ borderRadius: "8px" }} />
                        </Autocomplete>

                        <label
                            style={{ fontSize: "12px" }}>
                            To:
                        </label>
                        <Autocomplete
                            onLoad={(ref) => placeToGoRef.current = ref}
                            onPlaceChanged={ handlePlaceToGoSelect }
                            options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
                        >
                            <input type="text" placeholder="Endpoint*" style={{ borderRadius: "8px" }}/>
                        </Autocomplete>
                    </LoadScript>
                    <label
                        style={{ fontSize: "12px" }}>
                        What time would you like to offer the ride?
                        <br />
                        Please choose the earliest starting time:
                    </label>
                    <br />
                    <input
                        type="time"
                        placeholder="Departure time*"
                        style={{ borderRadius: "8px" }}
                        onChange={(e) =>
                            setTimeToGo(e.target.value)}/>
                    <br />
                    <label
                        style={{ fontSize: "12px" }}>
                        The latest time of arrival:
                    </label>
                    <br />
                    <input
                        type="time"
                        placeholder="Time of arrival*"
                        style={{ borderRadius: "8px" }}
                        onChange={(e) =>
                            setTimeToArrive(e.target.value)}/>
                    <br />
                    <label
                        style={{ fontSize: "12px" }}>
                        How many free seats do you have in your car?
                        <br />
                        Insert the number:
                    </label>
                    <br />
                    <input
                        type="number"
                        placeholder="*"
                        style={{ borderRadius: "8px" }}
                        type="number"
                        min="1"
                        max="9"
                        sx={{width: "20px"}}
                        onChange={(e) => setFreeSpots(Number(e.target.value))}/><br />
                    <label
                        style={{ fontSize: "12px" }}>
                        Price for one person:
                    </label>
                    <br />
                    <span className="input-symbol-euro">
                        <input placeholder="Price*"
                               style={{ borderRadius: "8px" }} type="text"
                               onChange={(e) => setPrice(Number(e.target.value))}/><br />
                    </span>
                        <Button variant="outlined"
                                color="primary"
                                sx={{ fontFamily: 'monospace',
                                    width: "180px",
                                    height: "40px",
                                    fontWeight: 600, color: "#fbf6f4",
                                    backgroundColor: "#896c63", borderRadius: "8px",
                                    "&:hover": {
                                        backgroundColor: "#ccada2",
                                        color: "#3e2723",
                                    },
                                }}
                            onClick={ handleRequest }
                    > Submit </Button>
                    <br />
                    {submitOffer &&
                        <CheckIcon
                            sx={{color: "green",
                                marginBottom: "-5px",
                                marginLeft: "10px"}}></CheckIcon>}
                </form>
                    </>
                    )}
                    </div>
                    <div style={{
                        width: "5%",
                        position: "absolute",
                        top: "18%",
                        left: "10%"
                    }}>
                        {isSignedIn && (
                            <>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ fontFamily: 'monospace',
                                width: "180px",
                                height: "40px",
                                fontWeight: 600, color: "#fbf6f4",
                                backgroundColor: "#896c63", borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                            }}
                            onClick={() => {
                                navigate("/profile", { state: { userId: userId, isSignedIn: {isSignedIn} } });
                            }}
                        >
                            Home
                        </Button>
                        <br /><br />
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ fontFamily: 'monospace',
                                width: "180px",
                                height: "40px",
                                fontWeight: 600,
                                color: "#fbf6f4",
                                backgroundColor: "#896c63",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                            }}
                            onClick={() => {
                                navigate("/request", { state: { userId: userId, isSignedIn: {isSignedIn} } });
                            }}
                        >
                            Insert a request
                        </Button>
                        <br /><br />
                        <Button variant="outlined"
                                color="primary"
                                sx={{ fontFamily: 'monospace',
                                    width: "180px",
                                    height: "40px",
                                    fontWeight: 600, color: "#fbf6f4",
                                    backgroundColor: "#896c63", borderRadius: "8px",
                                    "&:hover": {
                                        backgroundColor: "#ccada2",
                                        color: "#3e2723",
                                    },
                                }}
                        > Previous drives
                        </Button>
                        <br /><br />
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ fontFamily: 'monospace',
                                width: "180px",
                                height: "40px",
                                fontWeight: 600, color: "#fbf6f4",
                                backgroundColor: "#896c63", borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                            }}
                            onClick={() => {
                                navigate("/seeoffers", { state: { userId: userId, isSignedIn: {isSignedIn} } });
                            }}
                        >
                            All offers
                        </Button>
                        <br /><br />
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ fontFamily: 'monospace',
                                width: "180px",
                                height: "40px",
                                fontWeight: 600, color: "#fbf6f4",
                                backgroundColor: "#896c63", borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                            }}
                            onClick={() => {
                                navigate("/seerequests", { state: { userId: userId, isSignedIn: {isSignedIn} } });
                            }}
                        >
                            All requests
                        </Button>
                            </>
                            )}
            </div>
            {/*<p style={{position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", textAlign: "center", fontSize: "12px", color: "#896c63"}}>*/}
            {/*    Image by <a href="https://www.freepik.com/free-photo/group-friends-trip-together_6281291.htm#query=car%20trip&position=0&from_view=keyword&track=ais" style={{color: "#896c63"}}>Freepik</a>. All rights reserved.*/}
            {/*</p>*/}
        </div>
    )
}

export default OfferForm;