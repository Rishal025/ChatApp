import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UseAuth from '../Hooks/UseAuth';
import Cookie from 'cookiejs'

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: '',
    })
   
    const {setAuth} = UseAuth()
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const id = 'secret'
    const id2 = 'secret'


    const validate = (values) => {
        console.log(values)
        const errors = {}

        if (!values.email) {
            errors.email = 'email is required!';
        }
        if (!values.password) {
            errors.password = 'password is required';
        }
        return errors;

    }

    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            axios.post("http://localhost:8800/api/auth/login", { ...values, }, { withCredentials: true }).then((data) => {
                console.log(data)

                if (data.data.notFound) {
                    toast.error("Email is not existing", {
                        toastId: id,
                        theme: "light"
                    });
                } else if (data.data.passwordNotMatch) {
                    toast.error("Password is not matching", {
                        toastId: id,
                        theme: "light"
                    });
                } else {
                    toast.success("successfully logged!", {
                        toastId: id,
                        theme: "light"
                    });

                    setTimeout(() => {
                        setAuth(data.data.isUser);
                        localStorage.setItem("userInfo", JSON.stringify(data.data.isUser))
                        Cookie.set('jwt', data.data.accessToken, {expires: 7});
                        navigate('/');
                    }, 2000);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [formErrors])

    const submitHandler = async (event) => {
        event.preventDefault();
        setFormErrors(validate(values));
        setIsSubmit(true);
    };
    return (
        <React.Fragment>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-2 ring-blue-900 lg:max-w-xl">
                    <h1 onClick={() => navigate('/')} className="text-3xl cursor-pointer font-semibold text-center text-blue-900 uppercase">
                        Sign in
                    </h1>
                    <form onSubmit={(e) => { submitHandler(e) }} className="mt-6">
                        <div className="mb-2">
                            <label
                                for="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                type="email"
                                name="email"
                                className="block w-full px-4 py-2 mt-2 text-blue-900 bg-white border rounded-md focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <p className='text-red-700'>{formErrors.email}</p>
                        <div className="mb-2">
                            <label
                                for="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                type="password"
                                name='password'
                                className="block w-full px-4 py-2 mt-2 text-blue-900 bg-white border rounded-md focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <p className='text-red-700'>{formErrors.password}</p>
                        <a
                            href="#"
                            className="text-xs text-blue-900 hover:underline"
                            onClick={() => navigate('/fgtpassword')}
                        >
                            Forget Password?
                        </a>
                        <div className="mt-6">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-900 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-blue-900">
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <a
                            onClick={() => navigate('/register')}
                            className="cursor-pointer font-medium text-blue-900 hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
                <ToastContainer />
            </div>
        </React.Fragment>
    )
}


export default Login