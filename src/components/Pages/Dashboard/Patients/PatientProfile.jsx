import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PatientProfile = () => {
    const [newPatient, setNewPatient] = useState({});
    console.log(newPatient);
    const [loading, setLoading] = useState({});
    const {id} = useParams();
    console.log(id);
    // patient api call by their id 
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const response = await fetch(`https://hms.uniech.com/api/v1/patient/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
                }
            })
            const data = await response.json();
            setNewPatient(data);
            setLoading(false);
        };
        fetchUserData();
    }, []);
    return (
        <div>

        </div>
    );
};

export default PatientProfile;