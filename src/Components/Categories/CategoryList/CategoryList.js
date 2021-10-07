import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Modal from '@mui/material/Modal';
import './CategoryList.css';
import CategoryAdd from './CategoryAdd/CategoryAdd';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [catId, setCatId] = useState('');

    useEffect(() => {
        const unsubscribe = db.collection('category').onSnapshot(snapshot => (
            setCategories(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })
            ))
        ));

        return () => {
            unsubscribe();
        };
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='categoryList'>
            <Modal open={open} onClose={handleClose}>
                <CategoryAdd name={name} catId={catId} />
            </Modal>
            {
                categories.map((cat, ind) => {
                    const { image, name } = cat.data;
                    return (
                        <div className='categoryList__Item' keyy={ind} onClick={async () => {
                            setName(name); setCatId(cat.id); handleOpen();
                        }}>
                            <img src={image} alt="Category" className='categoryList__ItemImage' />
                            <p className='categoryList__ItemName'>{name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CategoryList
