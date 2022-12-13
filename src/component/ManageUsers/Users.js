import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Users = (props) => {
    let navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login');
        }
    }, []);

    return (
        <div>User COmponent</div>
    );
};

export default Users;