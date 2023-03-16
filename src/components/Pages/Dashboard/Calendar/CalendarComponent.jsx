import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



const CalendarComponent = () => {

  // const currDate = new Date().toDateString();

  // function MyApp() {
  //     const [value, onChange] = useState(new Date());
  // }
  return (
    <div className='lg:mt-36  '>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>

      {/* <p>{currDate}</p> */}
    </div>
  );
};

export default CalendarComponent;