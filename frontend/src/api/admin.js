import API_ENDPOINTS from './constants';


const getUser = async userId => {
    try {
        const response = await fetch(`${API_ENDPOINTS.ADMIN.GET_USER}/${encodeURIComponent(userId)}`);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        throw error;
    }
}



const getUsers = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.ADMIN.GET_USERS);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.users;
    } catch (error) {
        throw error;
    }
}



const createUser = async (username, email, password) => {
    const requestBody = {
        username,
        email,
        password
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }

    try {
        const response = await fetch(API_ENDPOINTS.ADMIN.CREATE_USER, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}



const editUser = async (userId, username, role) => {
    const requestBody = {
        username,
        role
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }

    try {
        const response = await fetch(`${API_ENDPOINTS.ADMIN.EDIT_USER}/${userId}`, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}



const deleteUser = async userId => {
    const options = {
        method: 'DELETE'
    }
    try {
        const response = await fetch(`${API_ENDPOINTS.ADMIN.DELETE_USER}/${userId}`, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        throw error;
    }
}




export {
    getUser,
    getUsers,
    createUser,
    editUser,
    deleteUser
}
