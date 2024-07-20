import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {Table} from 'react-bootstrap';
import { Link } from "react-router-dom";

const AdminUsers = ()=>{
    const [users, setUsers] = useState([]);
    const [toUpdate, setToUpdate] = useState(true);

    const {authToken} = useAuth();
    const getAllUsersData = async () =>{
        try {
            const response = await fetch('http://localhost:5000/api/admin/users', {
                method: 'GET',
                headers: {
                    Authorization:  authToken
                }
            });

            const data = await response.json();
            //console.log('Users: ',data);
            setUsers(data);
        } catch (error) {
            console.log('an error accued: ',error);
        }
    };

    const deleteUser = async (id)=>{
        console.log((id));

        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization:  authToken
                }
            });
    
            if(response.ok){
                getAllUsersData();
            }
        } catch (error) {
            console.log('An error occured: ',error);
        }
    }

    useEffect(()=>{
        console.log(toUpdate);
        if(toUpdate) {
            getAllUsersData();
            setToUpdate(false);
        }
    })
    return (
        <div>
            <h1>Admin users data:</h1>
            <div className="admin-user-container">
                <Table striped bordered hover variant='dark'>
                    <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Dalete</th>
                    </thead>
                    <tbody>
                        {
                            users.map((curUser, index)=>{
                                //console.log(curUser);
                                return <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                                    <td><button onClick={()=>{deleteUser(curUser._id)}}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AdminUsers;