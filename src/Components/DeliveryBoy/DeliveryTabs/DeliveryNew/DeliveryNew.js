import React, { useState, useEffect } from 'react'
import { db } from '../../../../firebase';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PersonIcon from '@mui/icons-material/Person';
import Switch from '@mui/material/Switch';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import './DeliveryNew.css';

function DeliveryNew() {
    const [newBoys, setNewBoys] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('boys').onSnapshot(snapshot => (
            setNewBoys(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })
            ))
        ));

        return () => {
            unsubscribe();
        };
    }, []);

    const handleClickTrue = (boyId) => {
        db.collection('boys').doc(boyId).update(
            {
                accVerified: true
            }
        );
        toast.success("Delivery Boy approved", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        newBoys.filter(c => c.data.accVerified === false).length > 0 ?
            <table className="deliveryNew__Table">
                <tr className='deliveryNew__TableHeadRow'>
                    <th className='deliveryNew__TableHeadEntity'>Profile Pic</th>
                    <th className='deliveryNew__TableHeadEntity'>Name</th>
                    <th className='deliveryNew__TableHeadEntity'>Email</th>
                    <th className='deliveryNew__TableHeadEntity'>Mobile</th>
                    <th className='deliveryNew__TableHeadEntity'>Address</th>
                    <th className='deliveryNew__TableHeadEntity'>Action</th>
                </tr>
                {
                    newBoys.filter(c => c.data.accVerified === false).map((boys, ind) => {
                        const { accVerified, name, email, mobile, address, imageUrl } = boys.data;
                        return (
                            <tr className='deliveryNew__TableBodyRow' key={ind}>
                                <td className='deliveryNew__TableBodyEntityImage'>{imageUrl === '' ? <PersonIcon fontSize='large' /> : <img src={imageUrl} className='deliveryNew__Pic' alt="profile pic" />}</td>
                                <td className='deliveryNew__TableBodyEntity'>{name}</td>
                                <td className='deliveryNew__TableBodyEntity'>{email}</td>
                                <td className='deliveryNew__TableBodyEntity'>{mobile}</td>
                                <td className='deliveryNew__TableBodyEntity' style={{ width: '20rem' }}>{address}</td>
                                <td className='deliveryNew__TableBodyEntity' style={{ width: '20rem' }}>{
                                    mobile === '' ?
                                        'Not Registered' :
                                        <FormGroup style={{ marginLeft: '7rem' }}>
                                            <FormControlLabel control={<Switch checked={accVerified} onClick={() => handleClickTrue(boys.id)} />} label={accVerified ? 'Approved' : 'Not approved'} />
                                        </FormGroup>
                                }</td>
                            </tr>
                        )
                    }
                    )
                }
            </table>
            : <div className='deliveryNew__TableEmpty'>
                No Delivery Boys left to be approved.
            </div>
    )
}

export default DeliveryNew
