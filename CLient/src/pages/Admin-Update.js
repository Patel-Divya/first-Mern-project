import { useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const AdminUpdate = ()=>{
    const params = useParams();
    const {authToken} = useAuth();
    const {id} = params;
    const [updatedUser, updateUser] = useState({
        username:'',
        email:'',
        phone:0
    });

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        updateUser({
            ...updatedUser, // if there are any previous operator/value, it will use it.
            [name]: value,  // using [] brackets for dynamic data
        });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        updatedUser.phone = Number(updatedUser.phone);
        
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization:  authToken
                },
                body: JSON.stringify(updatedUser)
            });
            //console.log(response);
            
            if(response.ok){
                const data = await response.json();
                //console.log(data.acknowledged);

                if(data.acknowledged){
                    toast.success('Data updated successfully');
                }else{
                    toast.error(data.message? data.message : 'Cannot update data or the data is same');
                }
            }

        } catch (error) {
            console.log('An error occured: ',error);
        }
    }

    return(
        <div>
            <h1>Update user info</h1>
            <form onSubmit={handleSubmit}>
            <Table striped bordered hover variant='dark'>
            <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </thead>
                    <tbody>
                        <tr key="0">
                            <td><input 
                                    type="text" 
                                    name="username" 
                                    placeholder="Enter uername" 
                                    id="username" 
                                    value={updatedUser.username} 
                                    required 
                                    autoComplete="off"
                                    onChange={handleInput}
                                />
                            </td>
                            <td>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter email" 
                                    id="email" 
                                    value={updatedUser.email} 
                                    required 
                                    autoComplete="off"
                                    onChange={handleInput}
                                />
                            </td>
                            <td>
                                <input 
                                    type="number" 
                                    name="phone" 
                                    placeholder="Enter phone" 
                                    id="phone" 
                                    value={updatedUser.phone} 
                                    required 
                                    autoComplete="off"
                                    onChange={handleInput}
                                />
                            </td>
                        </tr>
                    </tbody>
            </Table>
            <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default AdminUpdate;