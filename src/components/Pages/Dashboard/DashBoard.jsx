import React from 'react';
import AvailableBed from './AvailableBed';
import AvailableDoctor from './AvailableDoctor';
import Bed from './Bed';
import Doctor from './Doctor';
import NewPatient from './NewPatient';
import Patients from './Patients';


const DashBoard = () => {
    return (
     <div className='grid grid-cols-3'>
        <Patients></Patients>
        <Doctor></Doctor>
        <Bed></Bed>
        <NewPatient></NewPatient>
        <AvailableDoctor></AvailableDoctor>
        <AvailableBed></AvailableBed>
     </div>
    );
};

export default DashBoard;