import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



const CalendarComponent = () => {

  return (
    <div className='lg:mt-20 bg-tahiti-white xl:w-80 rounded-xl 2xl:h-80 shadow-2xl shadow-tahiti-blue mainBlue'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </div>
  );
};

export default CalendarComponent;