import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const AllPatients = () => {


    const [patients, setPatients] = useState({});
    // const url = `http://hms.uniech.com/api/v1/patient/all-patient`;

    // const { data: patients = [], refetch } = useQuery({
    //     queryKey: ['patients'],
    //     queryFn: async () => {
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         return data;
    //     }
    // })



    // fetching userInfo from backend
    useEffect(() => {
        fetch("http://hms.uniech.com/api/v1/patient/all-patient", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setPatients(data))
            .catch((err) => console.log(err));
      
    }, []);

    console.log(patients);



//    // handleDeleteUser
//    const handleDeleteUser = _id => {


//     fetch(`https://trade-buy-sell-arbinzaman.vercel.app/usersList/${_id}`, {
//         method: 'DELETE'
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             if (data.deletedCount > 0) {
//                 console.log(data.deletedCount);
//                 toast.success("User Deleted Succesfully")
//                 const remainingUsers = displayUser.filter(usr => usr._id !== _id);
//                 setDisplayUser(remainingUsers);
//             }
//         })
// }

return (
    <div>
        <h1 className='text-3xl font-bold mb-10 mt-5 '>All Users</h1>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Patient ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>

                {
                        patients.map(( patient, i) => <tr key={ patient._id}>
                            <th>{i + 1}</th>
                            <td>{ patient?._id}</td>
                            <td>{ patient?.firstName}</td>
                            <td>{ patient?.lastName}</td>
                            <td>{ patient?.email}</td>
                            <td>{ patient?.phone}</td>
                            <td><button>Details</button></td>
                            {/* onClick={() => handleDeleteUser(user._id)} */}
                            <td>
                                {/* { patient?.role !== 'admin' &&  */}
                                <button  className='btn btn-xs btn-danger'>Delete</button>
                                {/* // } */}
                                </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>



    </div>
);
};

export default AllPatients;



