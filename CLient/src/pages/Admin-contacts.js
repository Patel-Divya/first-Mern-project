import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminContacts = ()=>{
    const {authToken} = useAuth();
    const [contactsData, setContactData] = useState([]);

    const getContactsData = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/admin/contacts', {
                method: 'GET',
                headers: {
                    Authorization:  authToken
                }
            });

            const data = await response.json();
            toast.error(data.message);

            if(response.ok){
                setContactData(data);
            }
        }catch(error){
            console.log('An error occured: ',error);
        }
    }

    const deleteContact = async (id) =>{
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authToken
                }
            });

            if(response.ok){
                const data = await response.json();

                getContactsData();
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getContactsData();
    },[]);

    return (
        <div>
            <h1>Admin contacts page</h1>
            <Table striped bordered hover variant='dark'>
                <tbody>
                    <tr key="">
                        <td>Name</td>
                        <td>Email</td>
                        <td>Message</td>
                        <td>Action</td>
                    </tr>

                    {
                        contactsData.map((data, index)=>
                            <tr key={index}>
                                <td>{data.username}</td>
                                <td>{data.email}</td>
                                <td>{data.message}</td>
                                <td><button onClick={() => {deleteContact(data._id)}}>Detele</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default AdminContacts;