
import { useState, useEffect } from 'react';

import useAdmin from '../../hooks/useAdmin';
import useModal from '../../hooks/useModal';
import { isUsernameValid, isEmailValid, isPasswordValid } from '../../utils/validation';


const CreateUserModal = () => {
    const { addUser, alertMessage } = useAdmin();
    const { closeModal } = useModal();

    const [formData, setFormData] = useState({
        'new-user-username': '',
        'new-user-email': '',
        'new-user-password': ''
    });

    const [formErrors, setFormErrors] = useState({
        usernameErrorMessage: '',
        passwordErrorMessage: ''
    });



    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'new-user-username') {
            if (!isUsernameValid(value)) {
                setFormErrors(prev => ({
                    ...prev,
                    usernameErrorMessage: 'Username must have minimum 4 and maximum 20 characters'
                }));
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    usernameErrorMessage: ''
                }));
            }
        }

        if (name === 'new-user-password') {
            if (!isPasswordValid(value)) {
                setFormErrors(prev => ({
                    ...prev,
                    passwordErrorMessage: 'Password must be at least 8 characters'
                }));
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    passwordErrorMessage: ''
                }));
            }
        }
    }


    const handleCreate = async e => {
        e.preventDefault();
        try {
            if (isUsernameValid(formData['new-user-username']) && isEmailValid(formData['new-user-email']) && isPasswordValid(formData['new-user-password'])) {
                await addUser(formData['new-user-username'], formData['new-user-email'], formData['new-user-password']);
                closeModal();
            } else {
                alert('Make sure your inputs are valid');
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="card-body px-5 py-3">
            <h1 className="modal-title fs-5 mb-4">Create User</h1>
            <form onSubmit={handleCreate} className="w-100">
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="signup-username">Username</label>
                    <input
                        type="text"
                        id="new-user-username"
                        name="new-user-username"
                        value={formData['new-user-username']}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                    />
                    {formErrors['usernameErrorMessage'] && <p className="text-danger">{formErrors['usernameErrorMessage']}</p>}
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="signup-email">Email address</label>
                    <input
                        type="email"
                        id="new-user-email"
                        name="new-user-email"
                        value={formData['new-user-email']}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                    />
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="signup-password">Password</label>
                    <input
                        type="password"
                        id="new-user-password"
                        name="new-user-password"
                        value={formData['new-user-password']}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                    />
                    {formErrors['passwordErrorMessage'] && <p className="text-danger">{formErrors['passwordErrorMessage']}</p>}
                </div>
                <div className="pt-1 mb-4">
                    <button type="submit" className="btn btn-primary btn-lg btn-block w-100">CREATE</button>
                </div>
            </form>
        </div>
    )
}



export default CreateUserModal;
