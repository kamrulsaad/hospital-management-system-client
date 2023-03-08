import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserProvider/UserProvider';
import AvailableBed from './AvailableBed';
import AvailableDoctor from './AvailableDoctor';
import Bed from './Bed';
import Doctor from './Doctor';
import NewPatient from './NewPatient';
import Patients from './Patients';


const DashBoard = () => {
 
    return (
        <div className='grid grid-cols-3 -mt-20'>
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