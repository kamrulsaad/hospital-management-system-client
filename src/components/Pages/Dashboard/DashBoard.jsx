import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserProvider/UserProvider';
import AvailableBed from './AvailableBed';
import AvailableDoctor from './AvailableDoctor';
import Bed from './Bed';
import Doctor from './Doctor';
import NewPatient from './NewPatient';
import Patients from './Patients/Patients';


const DashBoard = () => {
 
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 -mt-20'>
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