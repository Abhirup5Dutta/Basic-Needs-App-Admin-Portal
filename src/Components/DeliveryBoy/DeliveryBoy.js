import React, { useState } from 'react';
import { db } from '../../firebase';
import firebase from 'firebase/app';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import './DeliveryBoy.css';
import DeliveryTabs from './DeliveryTabs/DeliveryTabs';

function DeliveryBoy() {
    const [addVisible, setAddVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorDesc, setErrorDesc] = useState('');

    const handleUpload = (e) => {
        e.preventDefault();
        if (email === '') {
            setErrorTitle('Email Id');
            setErrorDesc('Email Id not entered');
            handleClickOpen();
        } else {
            if (password === '') {
                setErrorTitle('Password');
                setErrorDesc('Password not entered');
                handleClickOpen();
            } else {
                if (password.length < 6) {
                    setErrorTitle('Password');
                    setErrorDesc('Minimum 6 characters required');
                    handleClickOpen();
                } else {
                    db.collection('boys').doc(email).set({
                        'accVerified': false,
                        'address': '',
                        'email': email,
                        'imageUrl': '',
                        'location': new firebase.firestore.GeoPoint(0, 0),
                        'mobile': '',
                        'name': '',
                        'password': password,
                        'uid': '',
                    });

                    setEmail('');
                    setPassword('');
                    setAddVisible((prev) => prev = !prev);
                    setErrorTitle('');
                    setErrorDesc('');

                    toast.success("Delivery Boy saved successfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='deliveryBoy'>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {errorTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorDesc}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>

                </DialogActions>
            </Dialog>
            <h1 className="deliveryBoy__head">
                Delivery Boys
            </h1>
            <p className="deliveryBoy__desc">
                Create new Delivery Boys and Manage all Delivery Boys
            </p>
            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <div className="deliveryBoy__Upload">
                <button className={addVisible ? 'deliveryBoy__UploadAddButton' : 'deliveryBoy__none'} onClick={(e) => { e.preventDefault(); setAddVisible((prev) => prev = !prev) }} >
                    Create new Delivery Boy
                </button>
                <div className={addVisible ? "deliveryBoy__none" : "deliveryBoy__UploadBar"}>
                    <div className="deliveryBoy__bottom">
                        <button className='deliveryBoy__UploadBar__Left' onClick={(e) => { e.preventDefault(); setAddVisible((prev) => prev = !prev) }} >
                            Cancel
                        </button>
                        <div className="deliveryBoy__UploadBar__Right">
                            <input type="text" className='deliveryBoy__UploadBar__RightText' placeholder='Email Id' value={email} onChange={(event) => setEmail(event.target.value)} />
                            <input type="text" className='deliveryBoy__UploadBar__RightText' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />

                            <button className='deliveryBoy__UploadBar__progress__Save' onClick={handleUpload} >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <DeliveryTabs />

        </div>
    )
}

export default DeliveryBoy
