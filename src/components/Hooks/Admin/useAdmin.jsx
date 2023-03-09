// import { useEffect, useState } from "react"

// const useAdmin = () => {
//     const [isAdmin, setIsAdmin] = useState(false);
//     console.log(isAdmin);
//     const [isAdminLoading, setIsAdminLoading] = useState(true);
//     const [userInfo, setUserInfo] = useState({});
//     console.log(userInfo);
//     const role = userInfo.data.role;







//     // for profile access

//     // console.log(userInfo.data.role);
//     // const role = userInfo.data.role;
//     // fetching userInfo from backend
//     // useEffect(() => {
//     //     fetch("http://hms.uniech.com/api/v1/user/user-info", {
//     //         headers: {
//     //             Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
//     //         },
//     //     })
//     //         .then((res) => res.json())
//     //         .then((data) => setUserInfo(data))
//     //         .catch((err) => console.log(err));

//     // }, []);


//     useEffect(() => {
//         if (role === "super-admin") {
//             fetch("http://hms.uniech.com/api/v1/user/user-info", {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
//                 },
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     console.log(data);
//                     setUserInfo(data);
//                     setIsAdmin(data.isAdmin);
//                     setIsAdminLoading(false);

//                 })
//         }
//     }, [])
//     return [isAdmin, isAdminLoading]





// }
// export default useAdmin;