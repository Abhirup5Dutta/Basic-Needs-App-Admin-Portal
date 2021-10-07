import React, { useState, useEffect } from 'react';
import { storage, db } from '../../firebase';
import ItemsCarousel from 'react-items-carousel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import { IconButton } from '@mui/material';
import firebase from 'firebase';
import './Baners.css';

function Baners() {
    const [baners, setBaners] = useState([]);
    const [addVisible, setAddVisible] = useState(true);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 0;
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [open, setOpen] = useState(false);
    const [eventId, setEventId] = useState('');

    useEffect(() => {
        const unsubscribe = db.collection('slider').onSnapshot(snapshot => (
            setBaners(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })
            ))
        ));

        return () => {
            unsubscribe();
        };
    }, []);

    const onDelete = async () => {

        await db.collection("slider").doc(eventId).delete().then(() => {
            toast.error("Baner deleted", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setEventId('');
        }).catch((error) => {
            toast.warn("Sorry baner could not be deleted", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setEventId('');
        });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEventId('');
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const imageName = firebase.firestore.Timestamp.now().toDate().toString().substring(0, 24);
        const uploadTask = storage.ref(`uploads/shopBanerUploads/${imageName}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage.ref('uploads/shopBanerUploads').child(imageName).getDownloadURL().then(url => {
                    db.collection('slider').add({
                        image: url
                    });

                    setProgress(0);
                    setImage(null);
                    setAddVisible((prev) => prev = !prev);

                    toast.success("Baner Added", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
            }
        )
    }

    return (
        <div className='baners'>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deletion Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={() => { onDelete(); handleClose(); }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <h1 className="baners__head">
                Baner Screen
            </h1>
            <p className="baners__desc">
                Add / Delete Home Screen Baner Images
            </p>
            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />
            <div className="baners__Show">
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={2}
                    leftChevron={<ChevronLeftIcon fontSize='large' style={{ backgroundColor: 'lightgray', borderRadius: '45px' }} />}
                    rightChevron={<ChevronRightIcon fontSize='large' style={{ backgroundColor: 'lightgray', borderRadius: '45px' }} />}
                    chevronWidth={chevronWidth}
                    infiniteLoop
                >
                    {
                        baners.map((baner, ind) => (
                            <div className="baner__Slide" key={ind}>

                                <DeleteIcon className='baner__SlideIcon' style={{ color: 'red' }} onClick={() => { setEventId(baner.id); handleClickOpen(); }} />

                                <img src={baner.data.image} alt="baner" className='baner__SlideImage' />
                            </div>
                        ))
                    }
                </ItemsCarousel>
            </div>
            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />
            <div className="baners__Upload">
                <button className={addVisible ? 'baners__UploadAddButton' : 'baners__none'} onClick={(e) => { e.preventDefault(); setAddVisible((prev) => prev = !prev) }} >
                    Add New Baner
                </button>
                <div className={addVisible ? "baners__none" : "baners__UploadBar"}>
                    <progress className='baners__UploadBar__progress' value={progress} max='100' />
                    <div className="baners__bottom">
                        <button className='baners__UploadBar__Left' onClick={(e) => { e.preventDefault(); setAddVisible((prev) => prev = !prev) }} >
                            Cancel
                        </button>
                        <div className="baners__UploadBar__Right">
                            <input type="file" className='baners__UploadBar__progress__Input' accept="image/*" placeholder='Upload Image' onChange={handleChange} />
                            <button className='baners__UploadBar__progress__Save' disabled={!image} onClick={handleUpload} >
                                Save Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Baners
