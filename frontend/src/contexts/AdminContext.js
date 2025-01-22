
import { createContext, useState } from 'react';
import {
    getUser,
    getUsers,
    createUser,
    editUser,
    deleteUser
} from '../api/admin';



const AdminContext = createContext();



const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);



    const fetchUser = async userId => {
        try {
            const data = await getUser(userId);
            return data;
        } catch (error) {
            throw error;
        }
    }


    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (err) {
            throw err;
        }
    }


    const addUser = async (username, email, password) => {
        try {
            const data = await createUser(username, email, password);
            const { user, message } = data;
            setUsers(prev => [...prev, user]);
            setAlertMessage(message);
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        } catch (err) {
            setAlertMessage(err.message);
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        }
    }


    const modifyUser = async (userId, username, role) => {
        try {
            const data = await editUser(userId, username, role);
            const { user, message } = data;
            console.log(data);
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, username: user.username, role: user.role } : u));
            setAlertMessage(message);
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        } catch (err) {
            setAlertMessage(err.message);
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        }
    }


    const removeUser = async userId => {
        try {
            const message = await deleteUser(userId);
            setUsers(prev => prev.filter(user => user._id !== userId));
            setAlertMessage(message);
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        } catch (err) {
            setAlertMessage(err.message);
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        }
    }



    return (
        <AdminContext.Provider
            value={{
                users,
                fetchUser,
                fetchUsers,
                addUser,
                modifyUser,
                alertMessage,
                removeUser
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}




export { AdminContext, AdminProvider }
