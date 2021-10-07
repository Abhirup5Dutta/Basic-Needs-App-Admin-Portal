import React, { useState, useEffect } from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import StarIcon from '@mui/icons-material/Star';
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Modal from '@mui/material/Modal';
import { db } from '../../firebase';
import './Vendor.css';
import VendorDetails from './VendorDetails/VendorDetails';

function Vendor() {
    const [vendors, setVendors] = useState([]);
    const [vendorsFilter, setVendorsFilter] = useState([]);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [shopName, setShopName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [dialog, setDialog] = useState('');
    const [topPicked, setTopPicked] = useState(false);
    const [active, setActive] = useState(false);
    // const [vendorId, setVendorId] = useState('');

    useEffect(() => {
        const unsubscribe = db.collection('vendors').orderBy('shopName', 'desc').onSnapshot(snapshot => (
            setVendors(snapshot.docs.map(doc => ({
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
        setVendorsFilter(vendors);
    }, [vendors]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onAccVerifyFalse = (eventId) => {
        // event.preventDefault();

        db.collection('vendors').doc(eventId).update(
            {
                accVerified: false
            }
        );
    }

    const onAccVerifyTrue = (eventId) => {
        // event.preventDefault();

        db.collection('vendors').doc(eventId).update(
            {
                accVerified: true
            }
        );
    }

    const onIsTopPickedFalse = async (eventId) => {
        // event.preventDefault();

        await db.collection('vendors').doc(eventId).update(
            {
                isTopPicked: false
            }
        );
    }

    const onIsTopPickedTrue = async (eventId) => {
        // event.preventDefault();

        await db.collection('vendors').doc(eventId).update(
            {
                isTopPicked: true
            }
        );
    }

    const filterItemAcc = () => {
        const updatedItems = vendors.filter((curElem) => {
            return curElem.data.accVerified === true;
        });

        setVendorsFilter(updatedItems);
    }

    const filterItemAccFalse = () => {
        const updatedItems = vendors.filter((curElem) => {
            return curElem.data.accVerified === false;
        });

        setVendorsFilter(updatedItems);
    }

    const filterItemTopPick = () => {
        const updatedItems = vendors.filter((curElem) => {
            return curElem.data.isTopPicked === true;
        });

        setVendorsFilter(updatedItems);
    }

    return (
        <div className='vendor'>
            <Modal open={open} onClose={handleClose}>
                <VendorDetails imageUrl={imageUrl} shopName={shopName} dialog={dialog} mobile={mobile} email={email} address={address} topPicked={topPicked} active={active} />
            </Modal>
            <h1 className="vendor__head">
                Manage Vendors
            </h1>
            <p className="vendor__desc">
                Manage all the Vendor Activities
            </p>
            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />
            <div className="vendor__tabsContainer">
                <button className={index === 0 ? "vendor__tabs vendor__tabsActive" : "vendor__tabs"} onClick={() => { setVendorsFilter(vendors); setIndex(0); }}>
                    All Vendors
                </button>
                <button className={index === 1 ? "vendor__tabs vendor__tabsActive" : "vendor__tabs"} onClick={() => { filterItemAcc(); setIndex(1); }}>
                    Active Vendors
                </button>
                <button className={index === 2 ? "vendor__tabs vendor__tabsActive" : "vendor__tabs"} onClick={() => { filterItemAccFalse(); setIndex(2); }}>
                    Inactive Vendors
                </button>
                <button className={index === 3 ? "vendor__tabs vendor__tabsActive" : "vendor__tabs"} onClick={() => { filterItemTopPick(); setIndex(3); }}>
                    Top Picked
                </button>
                <button className='vendor__tabs'>
                    Top Rated
                </button>
            </div>
            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />
            {/* <div className="vendor__Table"> */}
            <table className="vendor__Table">
                <tr className='vendor__TableHeadRow'>
                    <th className='vendor__TableHeadEntity'>Active/Inactive</th>
                    <th className='vendor__TableHeadEntity'>Top Picked</th>
                    <th className='vendor__TableHeadEntity'>Shop Name</th>
                    <th className='vendor__TableHeadEntity'>Rating</th>
                    <th className='vendor__TableHeadEntity'>Total Sales</th>
                    <th className='vendor__TableHeadEntity'>Mobile</th>
                    <th className='vendor__TableHeadEntity'>Email</th>
                    <th className='vendor__TableHeadEntity'>View Details</th>
                </tr>
                {
                    vendorsFilter.map((vendor, ind) => {
                        const { accVerified, isTopPicked, shopName, mobile, email, imageUrl, address, dialog } = vendor.data;
                        return (
                            <tr className='vendor__TableBodyRow' key={ind}>
                                <td className='vendor__TableBodyEntity'>{accVerified ? <CheckCircleRoundedIcon onClick={() => { onAccVerifyFalse(vendor.id); }} style={{ color: 'green' }} className='vendor__TableIcon' /> : <RemoveCircleOutlinedIcon onClick={() => { onAccVerifyTrue(vendor.id); }} style={{ color: 'red' }} className='vendor__TableIcon' />}</td>
                                <td className='vendor__TableBodyEntity'>{isTopPicked ? <CheckCircleRoundedIcon onClick={() => { onIsTopPickedFalse(vendor.id); }} style={{ color: 'green' }} className='vendor__TableIcon' /> : <RemoveCircleOutlinedIcon onClick={() => { onIsTopPickedTrue(vendor.id); }} style={{ color: 'red' }} className='vendor__TableIcon' />}</td>
                                <td className='vendor__TableBodyEntity'>{shopName}</td>
                                <td className='vendor__TableBodyEntity' style={{ display: 'flex', alignItems: 'center' }}><StarIcon style={{ color: 'gray' }} />3.5</td>
                                <td className='vendor__TableBodyEntity'>20,000</td>
                                <td className='vendor__TableBodyEntity'>{mobile}</td>
                                <td className='vendor__TableBodyEntity'>{email}</td>
                                <td className='vendor__TableBodyEntity'><InfoOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => { setImageUrl(imageUrl); setShopName(shopName); setDialog(dialog); setMobile(mobile); setEmail(email); setAddress(address); setTopPicked(isTopPicked); setActive(accVerified); handleOpen(); }} /></td>
                            </tr>
                        )
                    }
                    )
                }
            </table>
            <hr style={{ height: '4px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />
            {/* </div> */}
        </div>
    )
}

export default Vendor
