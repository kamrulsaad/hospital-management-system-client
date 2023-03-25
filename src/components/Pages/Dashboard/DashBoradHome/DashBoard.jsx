import React, { useContext, useEffect, useState } from 'react';

import AvailableBed from '../Bed/AvailableBed';
import AvailableDoctor from '../Doctors/AvailableDoctor';
import Bed from '../Bed/Bed';
import Doctor from '../Doctors/Doctor';
import NewPatient from '../Patients/NewPatient';
import Patients from '../Patients/Patients';
import Calendar from '../Calendar/CalendarComponent';
import CalendarComponent from '../Calendar/CalendarComponent';
import NewPatientTable from '../NewPatientTable/NewPatientTable';


const DashBoard = () => {

    return (
        <div >
            <div className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-items-stretch lg:mt-10 lg:ml-20 sm:ml-20'>
                <Patients></Patients>
                <Doctor></Doctor>
                <Bed></Bed>
                <NewPatient></NewPatient>
                <AvailableDoctor></AvailableDoctor>
                <AvailableBed></AvailableBed>
                <CalendarComponent></CalendarComponent>
                <div className='col-span-2'><NewPatientTable></NewPatientTable></div>
            </div>

        </div>
    );
};

export default DashBoard;