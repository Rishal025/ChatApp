import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UseAuth from '../Hooks/UseAuth';

function ForgotPassword() {

    const [values, setValues] = useState({
        email: '',
        password: '',
        cpassword: ''
    })

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate()

    const id = 'secret'

    const validate = (values) => {
        console.log(values)
        const errors = {}

        if (!values.email) {
            errors.email = 'email is required!';
        }
        if (!values.password) {
            errors.password = 'password is required';
        }
        if (!values.cpassword) {
            errors.cpassword = 'password is required';
        } else if(values.password != values.cpassword) {
            errors.cpassword = 'password not matching';
        }
        return errors;
    }

    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log('ok');
            axios.put("http://localhost:8800/api/users/forgotpsd", { ...values, }, { withCredentials: true }).then((data) => {
                console.log(data)

                if (data.data.userNotFound) {
                    toast.error("Email is not existing", {
                        toastId: id,
                        theme: "light"
                    });
                } else if(data.data.success) {
                    toast.success("successfully changed!", {
                        toastId: id,
                        theme: "light"
                    });

                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            }).catch((error) => {
                console.log(error)
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
                        Forgot Password
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
                                New Password
                            </label>
                            <input
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                type="password"
                                name='password'
                                className="block w-full px-4 py-2 mt-2 text-blue-900 bg-white border rounded-md focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <p className='text-red-700'>{formErrors.password}</p>

                        <div className="mb-2">
                            <label
                                for="cpassword"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Confirm new password
                            </label>
                            <input
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                type="password"
                                name='cpassword'
                                className="block w-full px-4 py-2 mt-2 text-blue-900 bg-white border rounded-md focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <p className='text-red-700'>{formErrors.cpassword}</p>

                        <div className="mt-6">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-900 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-blue-900">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </React.Fragment>
    )
}


export default ForgotPassword