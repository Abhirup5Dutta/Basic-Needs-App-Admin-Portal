import React, { useState, useEffect } from 'react'
import { db } from '../../../../firebase';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import firebase from 'firebase/app';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import './CategoryAdd.css';

function CategoryAdd({ name, catId }) {
    const [subCat, setSubCat] = useState('');
    const [open, setOpen] = useState(false);
    const [subCatList, setSubCatList] = useState([]);

    useEffect(() => {

        if (catId) {
            db.collection('category').doc(catId).onSnapshot(snapshot => setSubCatList(snapshot.data()['subCat']));
        }

    }, [catId]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = (e) => {
        e.preventDefault();

        if (subCat === '') {
            handleClickOpen();
        } else {
            db.collection('category').doc(catId).update({
                'subCat': firebase.firestore.FieldValue.arrayUnion(...[
                    {
                        'name': subCat
                    }
                ]),
            });

            setSubCat('');

            toast.success("SubCategory Added", {
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

    return (
        <div className='categoryAdd'>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add New SubCategory"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Need to Give SubCategory Name
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
            <p className='categoryAdd__Head'>Main Category : &nbsp; <span>{name}</span></p>

            <hr style={{ height: '3px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <div className="categoryAdd__List">
                {
                    !catId ?
                        'Loading...'
                        :
                        !subCatList ?
                            'No Sub Categories found.'
                            :
                            subCatList?.length === 0 ?
                                'No Sub Categories found.'
                                :
                                subCatList.map((_, ind) => {
                                    return (
                                        <div className='categoryAdd__ListRow'>
                                            <p className='categoryAdd__ListRowIndex'>{ind + 1}</p>
                                            <p className='categoryAdd__ListRowEntity'>{subCatList[ind].name}</p>
                                        </div>
                                    )
                                })
                }
            </div>

            <hr style={{ height: '3px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <div className="categoryAdd__Bottom">
                <h5 className="categoryAdd__BottomTitle">Add New Sub Category</h5>

                <div className="categoryAdd__BottomSearch">
                    <input type="text" className='categoryAdd__BottomSearchInput' placeholder='Sub Category Name' value={subCat} onChange={(event) => { setSubCat(event.target.value); }} />
                    <button className='categoryAdd__BottomSearchButton' onClick={handleUpload} >Save</button>
                </div>
            </div>
        </div>
    )
}

export default CategoryAdd
