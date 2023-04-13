import React, { useEffect, useState } from 'react';
import useUserData from '../../../Hooks/useUserData';

const InvoicePage = () => {
    // Role Api from login Data
      const [userData, role] = useUserData();
    //   console.log(userData);
    //   console.log(userData?.firstName);
    const [loading, setLoading] = useState(true);

    const [invoiceCatagories, setInvoiceCatagories] = useState([]);
    console.log(invoiceCatagories);


    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const response = await fetch(
                "https://hms-server.onrender.com/api/v1/category/all",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
                    },
                }
            );
            const data = await response.json();
            // setUserData(data?.data);
            setInvoiceCatagories(data.data);
            setLoading(false);
        };
        fetchUserData();
    }, []);
    return (
        <div className=''>
            <div className='p-20'>
                <div>
                    <p className='text-4xl text-tahiti-lightGreen m-5 font-semibold'>UNICEH HMS</p>
                </div>
                <div className='grid grid-cols-3 bg-tahiti-white p-10'>
                    <div className=''>
                        <p>From</p>
                        <p>{userData?.firstName} {userData?.lastName}</p>
                        <p>{userData?.role}</p>
                        <p>Phone: {userData?.phone}</p>
                        <p>Email: {userData?.email}</p>
                    </div>
                    <div>
                        <p>To:</p>
                        <p>Patient Name: </p>
                        <p>Phone:</p>
                        <p>Email:</p>
                    </div>
                    <div>
                        <p>Invoice Id:</p>
                        <p>Payment Status:</p>
                        <p>Date:</p>
                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto bg-tahiti-white p-10">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            {
                                invoiceCatagories.map((invoiceCatagory, i) =>
                                    <tr key={invoiceCatagory?._id}>


                                        <td>{invoiceCatagory.name}</td>
                                        <th>{invoiceCatagory.amount}</th>



                                    </tr>)
                            }
                        </table>
                        {/* <table className="table w-full"> */}
                            {/* head */}
                        {/* <thead>
                            <tr>
                                <th>Item</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody> */}
                            {/* row 1 */}
                            {/* <tr>
                                <td>Cy Ganderton</td>
                                <td>Blue</td>
                            </tr> */}
                            {/* row 2 */}
                            {/* <tr>
                                <td>Hart Hagerty</td>
                                <td>Purple</td>
                            </tr> */}
                            {/* row 3 */}
                            {/* <tr>
                                <td>Brice Swyre</td>
                                <td>Red</td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
            </div>
            <div className='grid grid-cols-3 bg-tahiti-white'>
                <div>
                    <button className='btn btn-ghost btn-xs bg-tahiti-primary'>Print</button>
                </div>
                <div></div>
                <div>
                    <div className="overflow-x-auto mb-5">
                        <table className="table">
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <td>Sub Total:</td>
                                </tr>
                                <tr>
                                    <td>Tax:</td>
                                </tr>
                                <tr>
                                    <td>Discount:</td>
                                </tr>
                                <tr>
                                    <td>Grand Total:</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
};

export default InvoicePage;