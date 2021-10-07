import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import './VendorDetails.css';

function VendorDetails({ imageUrl, shopName, dialog, mobile, email, address, topPicked, active }) {
    return (
        <div className='vendorDetails'>
            {
                active ?
                    <button className='vendorDetails__ActiveStatus' style={{ color: 'white', backgroundColor: 'green' }}>
                        <CheckCircleRoundedIcon />
                        Active
                    </button>
                    :
                    <button className='vendorDetails__ActiveStatus' style={{ color: 'white', backgroundColor: 'red' }}>
                        <RemoveCircleOutlinedIcon />
                        Inactive
                    </button>
            }
            <div className="vendorDetails__Top">
                <img src={imageUrl} className='vendorDetails__TopImage' alt="shop pic" />
                <div className="vendorDetails__TopDesc">
                    <h1 className="vendorDetails__TopDescHead">
                        {shopName}
                    </h1>
                    <p className="vendorDetails__TopDescDialog">
                        {dialog}
                    </p>
                </div>
            </div>

            <hr style={{ height: '3px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <div className="vendorDetails__Body">
                <div className="vendorDetails__BodyRow">
                    <h4 className="vendorDetails__BodyRowTag">
                        Contact Number:
                    </h4>
                    <p className="vendorDetails__BodyRowDetail">
                        {mobile}
                    </p>
                </div>
                <div className="vendorDetails__BodyRow">
                    <h4 className="vendorDetails__BodyRowTag">
                        Email:
                    </h4>
                    <p className="vendorDetails__BodyRowDetail">
                        {email}
                    </p>
                </div>
                <div className="vendorDetails__BodyRow">
                    <h4 className="vendorDetails__BodyRowTag">
                        Address:
                    </h4>
                    <p className="vendorDetails__BodyRowDetail">
                        {address}
                    </p>
                </div>
            </div>

            <hr style={{ height: '3px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <div className="vendorDetails__Bottom">
                <h4 className="vendorDetails__BottomTag">
                    Top Pick Status:
                </h4>
                <p className="vendorDetails__BottomDetail">
                    {
                        topPicked ?
                            <button className='vendorDetails__TopPickedButton'>
                                <CheckIcon />
                                Top Picked
                            </button>
                            :
                            'Not Top Picked'
                    }
                </p>
            </div>

            <hr style={{ height: '3px', border: 'none', backgroundColor: '#C2C0C2', width: '100%' }} />

            <div className="vendorDetails__BottomInfo">
                <div className="vendorDetails__BottomInfoCard">
                    <MonetizationOnIcon className='vendorDetails__BottomInfoCardIcon' />
                    <p className='vendorDetails__BottomInfoCardDesc'>Total Revenue 12,000</p>
                </div>
                <div className="vendorDetails__BottomInfoCard">
                    <ShoppingCartIcon className='vendorDetails__BottomInfoCardIcon' />
                    <p className='vendorDetails__BottomInfoCardDesc'>Active Orders 6</p>
                </div>
                <div className="vendorDetails__BottomInfoCard">
                    <ShoppingBagIcon className='vendorDetails__BottomInfoCardIcon' />
                    <p className='vendorDetails__BottomInfoCardDesc'> Total Orders 130</p>
                </div>
                <div className="vendorDetails__BottomInfoCard">
                    <GrainOutlinedIcon className='vendorDetails__BottomInfoCardIcon' />
                    <p className='vendorDetails__BottomInfoCardDesc'>Products 160 Products</p>
                </div>
                <div className="vendorDetails__BottomInfoCard">
                    <ListAltOutlinedIcon className='vendorDetails__BottomInfoCardIcon' />
                    <p className='vendorDetails__BottomInfoCardDesc'>Statement</p>
                </div>
            </div>
        </div>
    )
}

export default VendorDetails
