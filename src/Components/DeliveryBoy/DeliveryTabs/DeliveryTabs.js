import React, { useState } from 'react';
import './DeliveryTabs.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeliveryNew from './DeliveryNew/DeliveryNew';
import DeliveryApproved from './DeliveryApproved/DeliveryApproved';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function DeliveryTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='deliveryTabs'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" indicatorColor="secondary" centered>
                        <Tab label="New" {...a11yProps(0)} style={{ width: '100%' }} />
                        <Tab label="Approved" {...a11yProps(1)} style={{ width: '100%' }} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <DeliveryNew />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DeliveryApproved />
                </TabPanel>
            </Box>
        </div>
    )
}

export default DeliveryTabs
