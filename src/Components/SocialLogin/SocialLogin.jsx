import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSingIn } = useContext(AuthContext);
    // console.log(googleLogin)
    const navigate = useNavigate();

    const handleLogin = () => {
        googleSingIn()
            .then((res) => {
                console.log(res.user)
                // navigate('/')
            })
            .catch(error => console.log(error))

    }
    return (
        <div className='p-8'>
            <button onClick={handleLogin} className='btn btn-primary'>Google</button>
        </div>
    );
};

export default SocialLogin;