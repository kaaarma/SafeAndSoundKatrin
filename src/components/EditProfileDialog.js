import React, {useState} from "react";
import { doc, getDoc } from "firebase/firestore";
import {database} from "../config/firebase";
import {useLocation} from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';

export default function EditProfileDialog(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;
    const isSignedIn = location.state?.isSignedIn;
    const firstName = location.state?.firstName;
    const lastName = location.state?.lastName;
    const phone = location.state?.phone;
    const profilePic = location.state?.profilePic
    const licencePlate = location.state?.licencePlate;
    const isUserDriver = location.state?.isUserDriver;
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [newProfilePic, setNewProfilePic] = useState("")
    const [newLicencePlate, setNewLicencePlate] = useState("")
    const [newLicencePic, setNewLicencePic] = useState("")



    function submit() {

    }

    return (
        <div style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {isSignedIn && (
                <div>
                    <img src={profilePic} />
                    <br />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        margin: "0 auto",
                        justifyContent: "center",
                        alignItems: "center"

                    }}>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6} sm={6} md={6}  >
                                <p>Change profile picture:</p>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <input placeholder={profilePic} type="file"
                                    // onChange={(e) => setNewFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                               <p>First name:</p>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <input placeholder={firstName}
                                    onChange={(e) => setNewFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <p>Last name:</p>

                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <input placeholder={lastName}
                                     onChange={(e) => setNewLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <p>Phone:</p>

                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <input placeholder={phone}
                                     onChange={(e) => setNewPhone(e.target.value)}
                                />
                            </Grid>
                                {isUserDriver && (
                                    <>

                                <Grid item xs={6} sm={6} md={6} >
                                        <p>Licence plate:</p>

                                </Grid>
                                <Grid item xs={6} sm={6} md={6} >
                                        <input placeholder={licencePlate}
                                         onChange={(e) => setNewLicencePlate(e.target.value)}
                                        />

                                </Grid>
                                <Grid item xs={6} sm={6} md={6} >
                                <p>Change driving licence:</p>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} >
                                <input placeholder={firstName} type="file"
                                    // onChange={(e) => setNewFirstName(e.target.value)}
                                /></Grid>
                            </>

                        )}
                        </Grid>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={submit}
                            sx={{
                                fontFamily: 'Roboto Mono',
                                fontWeight: 700,
                            }}
                        >
                            Submit
                        </Button>
                    </Box>

                </div>
            )}
        </div>
    );
}
