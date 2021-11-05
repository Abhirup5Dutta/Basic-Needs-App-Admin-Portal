import React, { useState } from 'react'
import { storage, db } from '../../firebase';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import firebase from 'firebase';
import './Categories.css';
import CategoryList from './CategoryList/CategoryList';

function Categories() {
    const [addVisible, setAddVisible] = useState(true);
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const imageName = firebase.firestore.Timestamp.now().toDate().toString().substring(0, 24);
        const uploadTask = storage.ref(`uploads/CategoryImage/${imageName}`).put(image);
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
                storage.ref('uploads/CategoryImage').child(imageName).getDownloadURL().then(url => {
                    db.collection('category').doc(text).set({
                        'image': url,
                        'name': text,
                    });

                    setProgress(0);
                    setImage(null);
                    setText('');
                    setAddVisible((prev) => prev = !prev);

                    toast.success("Category Added", {
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
        <div className='categories' >
            <ToastContainer />
            <h1 className="categories__head">
                Categories
            </h1>
            <p className="categories__desc">
                Add New Categories and Sub Categories
            </p>

            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <div className="categories__Upload">
                <button className={addVisible ? 'categories__UploadAddButton' : 'categories__none'} onClick={(e) => { e.preventDefault(); setAddVisible((prev) => prev = !prev) }} >
                    Add New Category
                </button>
                <div className={addVisible ? "categories__none" : "categories__UploadBar"}>
                    <progress className='categories__UploadBar__progress' value={progress} max='100' />
                    <div className="categories__bottom">
                        <button className='categories__UploadBar__Left' onClick={(e) => { e.preventDefault(); setAddVisible((prev) => prev = !prev) }} >
                            Cancel
                        </button>
                        <div className="categories__UploadBar__Right">
                            <input type="text" className='categories__UploadBar__RightText' placeholder='No category Name given' value={text} onChange={(event) => setText(event.target.value)} />
                            <input type="file" className='categories__UploadBar__progress__Input' accept="image/*" placeholder='Upload Image' onChange={handleChange} />
                            <button className='categories__UploadBar__progress__Save' disabled={!image} onClick={handleUpload} >
                                Save New Category
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <CategoryList />

        </div>
    )
}

export default Categories
