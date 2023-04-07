import React from 'react';

const PatientPresciption = () => {
    return (
        <div>
            <h1 className='text-center text-4xl font-semibold mb-8'><span>PATIENT</span> <span className='text-tahiti-lightGreen'>PRESCRIPTIONS</span></h1>
            <table className="table xl:w-full ">
                <tbody className=''>
                    {/* row 1 */}
                    <tr>

                        <td className='bg-tahiti-grey'>ECG</td>
                        <td className='bg-tahiti-grey'>Quality Control Specialist</td>
                        <td className='bg-tahiti-grey'>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>

                        <td>ECG</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>

                        <td>ECG</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                    <tr>

                        <td>ECG</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PatientPresciption;