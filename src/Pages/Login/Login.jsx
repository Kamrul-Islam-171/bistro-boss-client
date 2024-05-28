import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';


const Login = () => {

    const captcha = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const {logIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const pass = e.target.password.value;
        // console.log(email, pass)
        logIn(email, pass)
        .then(result => {
            console.log(result.user)
            navigate(from)
        })
        .catch(error => console.log(error))
    }

    const handleValidate = () => {
        const userCaptcha = captcha.current.value;
        if (validateCaptcha(userCaptcha) == true) {
            setDisabled(false)
        }

        else {
            setDisabled(true)
        }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input ref={captcha} type="text" name="captcha" placeholder="type the above captcha" className="input input-bordered" required />
                            <button onClick={handleValidate} className='btn btn-outline btn-xs mt-2'>validate</button>
                        </div>
                        <div className="form-control mt-6">
                            {/* <button className="btn btn-primary">Login</button> */}
                            <input disabled={disabled} className="btn btn-primary" type="submit" value="Submit" />
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                <p className='px-5 py-2'><small>New here? Create a account</small> <Link className='font-bold text-primary' to={'/signup'}>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;