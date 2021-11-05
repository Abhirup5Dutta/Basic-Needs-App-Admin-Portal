import React, { useState, useEffect } from 'react'
import { db } from '../../../../firebase';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import './DeliveryApproved.css';

function DeliveryApproved() {
    const [approvedBoys, setApprovedBoys] = useState([]);
    const [approvedBoysFilter, setApprovedBoysFilter] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('boys').onSnapshot(snapshot => (
            setApprovedBoys(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })
            ))
        ));

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        noNameFilter(approvedBoys);
    }, [approvedBoys]);

    const noNameFilter = (boys) => {
        const updatedItems = boys.filter((curElem) => {
            return curElem.data.name !== '';
        });

        setApprovedBoysFilter(updatedItems);
    }

    const handleClickFalse = (boyId) => {
        db.collection('boys').doc(boyId).update(
            {
                accVerified: false
            }
        );
        toast.success("Delivery Boy removed from approved list", {
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
        approvedBoysFilter.filter(c => c.data.accVerified === true).length > 0 ?
            <table className="deliveryApproved__Table">
                <tr className='deliveryApproved__TableHeadRow'>
                    <th className='deliveryApproved__TableHeadEntity'>Profile Pic</th>
                    <th className='deliveryApproved__TableHeadEntity'>Name</th>
                    <th className='deliveryApproved__TableHeadEntity'>Email</th>
                    <th className='deliveryApproved__TableHeadEntity'>Mobile</th>
                    <th className='deliveryApproved__TableHeadEntity'>Address</th>
                    <th className='deliveryApproved__TableHeadEntity'>Action</th>
                </tr>
                {
                    approvedBoysFilter.filter(c => c.data.accVerified === true).map((boys, ind) => {
                        const { accVerified, name, email, mobile, address, imageUrl } = boys.data;
                        return (
                            <tr className='deliveryApproved__TableBodyRow' key={ind}>
                                <td className='deliveryApproved__TableBodyEntityImage'><img src={imageUrl} className='deliveryApproved__Pic' alt="profile pic" /></td>
                                <td className='deliveryApproved__TableBodyEntity'>{name}</td>
                                <td className='deliveryApproved__TableBodyEntity'>{email}</td>
                                <td className='deliveryApproved__TableBodyEntity'>{mobile}</td>
                                <td className='deliveryApproved__TableBodyEntity' style={{ width: '20rem' }}>{address}</td>
                                <td className='deliveryApproved__TableBodyEntity' style={{ width: '20rem' }}>{
                                    <FormGroup style={{ marginLeft: '7rem' }}>
                                        <FormControlLabel control={<Switch checked={accVerified} onClick={() => handleClickFalse(boys.id)} />} label={accVerified ? 'Approved' : 'Not approved'} />
                                    </FormGroup>
                                }</td>
                            </tr>
                        )
                    }
                    )
                }
            </table>
            : <div className='deliveryApproved__TableEmpty'>
                No Delivery Boys yet approved.
            </div>
    )
}

export default DeliveryApproved
