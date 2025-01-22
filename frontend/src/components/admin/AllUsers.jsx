
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

import EditUserModal from './EditUserModal';
import CreateUserModal from './CreateUserModal';

import Modal from '../common/Modal';


const AllUsers = () => {
    const navigate = useNavigate();
    const { users, fetchUsers } = useAdmin();
    const { user } = useAuth();
    const { openModal } = useModal();


    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                await fetchUsers();
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllUsers();
    }, [users, fetchUsers]);



    const handleGoToUserProfile = e => {
        const userId = e.target.getAttribute('data-user-id');
        if (user && userId === jwtDecode(user).id) {
            navigate('/admin/profile');
        } else {
            navigate(`/admin/users/${userId}`);
        }
    }



    const handleOpenModal = () => {
        openModal(
            <CreateUserModal />
        )
    }


    
    return (
        <div className="container mt-4">
            <h3 className="my-5">All Users</h3>
            <div className="container d-flex justify-content-end mb-5">
                <button className="btn btn-primary" onClick={handleOpenModal}>Create New User</button>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <img src={user.profileImageUrl} alt={user.username} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }} />
                                <button data-user-id={user._id} onClick={handleGoToUserProfile} type="button" className="btn btn-link">{user.username}</button>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td
                                data-bs-toggle="modal"
                                data-bs-target={`#userModal-${user._id}`}
                                title="Edit User"
                                className="fa-edit-user-td"
                            >
                                <i className="fa fa-user-edit"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {users.map((user) => (
                <div key={user._id}>
                    <EditUserModal userData={user} />
                </div>
            ))}
            <Modal />
        </div>
    )
}




export default AllUsers;
