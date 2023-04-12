import React, { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../config/firebase";
import Button from "@mui/material/Button";
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { googleMapsApiKey } from "../config/config";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";




function OfferForm() {

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [date, setDate] = useState("")
    const [placeToStart, setPlaceToStart] = useState("")
    const [placeToGo, setPlaceToGo] = useState("")
    const [timeToGo, setTimeToGo] = useState("")
    const [timeToArrive, setTimeToArrive] = useState(0)
    const [freeSpots, setFreeSpots] = useState(false)
    const [price, setPrice] = useState("");
    const [submitRequest, setSubmitRequest] = useState("")
   // const [seeDriveHistory, setSeeDriveHistory] = useState(false)
    const placeToStartRef = useRef(null);
    const placeToGoRef = useRef(null);


    const requestsCollectionRef = collection(database, "offers") // see users requests collection from database

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
                randomId: randomId
            });
            setSubmitRequest(true)
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
        setPlaceToStart({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
        });
    }

    const handlePlaceToGoSelect = () => {
        const place = placeToGoRef.current.getPlace();
        if (!place || !place.geometry) {
            console.error('Invalid place object:', place);
            return;
        }
        setPlaceToGo({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
        });
    };
    const toProfile = () => {
        navigate("/profile", { state: { email: email, isSignedIn: true } });
    }

    const toSeeOffers = () => {
        navigate("/seeOffers", { state: { email: email, isSignedIn: true } });
    }

    const toSeeRequests = () => {
        navigate("/seerequests", { state: { email: email, isSignedIn: true } });
    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center"
        }}>
            <div
                style={{
                    width: "50%",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                    marginTop: "20px",
                    marginLeft: "40px"
                }}
            >
            <h3>You would like to share Your ride? Insert offer</h3>
            <input type="date" placeholder="Day" onChange={(e) => setDate(e.target.value)}/>

            <LoadScript
                googleMapsApiKey={googleMapsApiKey}
                libraries={['places']}
            >
                <Autocomplete
                    onLoad={(ref) =>  placeToStartRef.current = ref}
                    onPlaceChanged={handlePlaceToStartSelect}
                    options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
                >
                    <input type="text" placeholder="From" />
                </Autocomplete>

                <Autocomplete
                    onLoad={(ref) => placeToGoRef.current = ref}
                    onPlaceChanged={handlePlaceToGoSelect}
                    options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
                >
                    <input type="text" placeholder="To" />
                </Autocomplete>
            </LoadScript>
            <input type="time" placeholder="Departure time" onChange={(e) => setTimeToGo(e.target.value)}/><br />
            <input type="time" placeholder="ETA - estimated arrival time" onChange={(e) => setTimeToArrive(e.target.value)}/><br />
            <input
                type="number"
                placeholder="Free spots"
                type="number"
                min="1"
                max="9"
                sx={{width: "20px"}}
                onChange={(e) => setFreeSpots(Number(e.target.value))}/><br />
            <span className="input-symbol-euro">
                <input placeholder="Price" type="text" onChange={(e) => setPrice(Number(e.target.value))}/><br />
            </span>
                <Button variant="contained"
                        sx={{backgroundColor: "#add8e6",
                            '&:hover': {
                                backgroundColor: '#fff',
                                color: '#3c52b2',},
                            width: "180px",
                            height: "40px"
                        }}
                    onClick={handleRequest}
            > Submit </Button>
            </div>
            <div style={{
                width: "50%" }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#add8e6",
                        "&:hover": {
                            backgroundColor: "#fff",
                            color: "#3c52b2",
                        },
                        width: "180px",
                        height: "40px"

                    }}onClick={toProfile}>
                    Go to profile
                </Button>
                <br /><br />
                <Button variant="contained"
                        sx={{backgroundColor: "#add8e6",
                            '&:hover': {
                                backgroundColor: '#fff',
                                color: '#3c52b2',},
                            width: "180px",
                            height: "40px"
                        }}
                    // onClick={(e) => {setSeeDriveHistory} Go to my profile previous drives page (e.target.value)}
                > Previous drives </Button>
                <br /><br />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#add8e6",
                        "&:hover": {
                            backgroundColor: "#fff",
                            color: "#3c52b2",
                        },
                        width: "180px",
                        height: "40px"

                    }}
                    onClick={toSeeOffers}
                >
                    All offers
                </Button>
                <br /><br />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#add8e6",
                        "&:hover": {
                            backgroundColor: "#fff",
                            color: "#3c52b2",
                        },
                        width: "180px",
                        height: "40px"

                    }}
                    onClick={toSeeRequests}
                >
                    All requests
                </Button>
                }
            </div>
        </div>
    )
}

export default OfferForm;