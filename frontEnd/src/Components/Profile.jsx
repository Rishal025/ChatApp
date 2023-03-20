import React, { useEffect, useState } from 'react';
import UseAuth from '../Hooks/UseAuth';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
 
  const {auth} = UseAuth();
  const [userUpdated, setUserUpdated] = useState({
    id: auth?._id,
    name: auth?.name,
    email: auth?.email,
    mobile: auth?.mobile
  })

  let id = 'secret1'
  let id2 = 'secret2'
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [pass, setPass] = useState({
      id: auth?._id,
      currentPassword: '',
      newPassword: '',
      cNewPassword: ''
  });
  const [passFormErrors, setPassFormErrors] = useState({});
  const [passSubmit, setPassSubmit] = useState(false);

  const validate = (userUpdate) => {
    const errors = {}
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regexNum = /^[0-9 ]*$/

    if (!userUpdate.name) {
      errors.name = 'name is required!';
    } else if (userUpdate.name.length < 3) {
      errors.name = 'full name must contains more than 3 characters'
    }

    if (!userUpdate.email) {
      errors.email = 'email is required!';
    } else if (!regex.test(userUpdate.email)) {
      errors.email = 'this is not a valid email'
    }

    if (!userUpdate.mobile) {
      errors.mobile = 'mobile number is required!';
    } else if (userUpdate.mobile.length < 10 || userUpdate.mobile.length > 10) {
      errors.mobile = 'phone number must have 10 digits'
    } else if (!regexNum.test(userUpdate.mobile)) {
      errors.mobile = 'this is not a valid phone number'
    }

    return errors;

  }

  const passwordValidate = (pass) => {

    const errors = {};
    if (!pass.currentPassword) {
      errors.currentPassword = 'password is required!';
    } else if (pass.currentPassword.length < 3) {
      errors.currentPassword = 'password must contains atleast 3 characters'
  }
  if (!pass.newPassword) {
    errors.newPassword = 'password is required!';
  } else if (pass.newPassword.length < 3) {
    errors.newPassword = 'password must contains atleast 3 characters'
}
  if(!pass.cNewPassword) {
    errors.cNewPassword = "Confirm password is required"
  } else if (pass.cNewPassword != pass.newPassword) {
    errors.cNewPassword = 'Password is not matching'
}

return errors;
}

  useEffect(() => {
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log('inside useEffect');
      axios.put('http://localhost:8800/api/users/profile', { ...userUpdated },
      { withCredentials: true }).then((response) => {
        
        if (response.data.emailExists) {
          toast.error(`Email already exists `, {
              toastId: id,
              theme: "light"
            });
          }
          
          if (response.data.success) {
            toast.success(`successfully updated your profile details `, {
              toastId: id,
              theme: "light"
            });
          }
          
        })
      }
      
    }, [formErrors]);

    useEffect(() => {
      if (Object.keys(passFormErrors).length === 0 && passSubmit) {
        console.log('inside useEffect');
        console.log(pass);
        axios.put('http://localhost:8800/api/users/password', { ...pass,},
        { withCredentials: true }).then((response) => {
          console.log('success')
          if (response.data.passwordNotMatch) {
            toast.error(`Current password not matching, try again`, {
              toastId: id,
              theme: "light"
            });
          }
         if(response.data.success) {
          console.log('password changed successfully')
          toast.success(`Password changed successfully`, {
            toastId: id,
            theme: "light"
          });
          setTimeout(() => {
            setPasswordCheck(false)
          }, 3000)
         }
        })
      }
    },[passFormErrors])
    
    const handleChangePassword = async (e) => {
      e.preventDefault();
      setPassFormErrors(passwordValidate(pass));
      setPassSubmit(true);
       
    }

    return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">My Profile</h1>
      <form  onSubmit={(e) => { submitHandler(e) }} className="bg-white p-10 rounded-lg shadow-md w-80">
        <div className="mb-5">
          <label htmlFor="name" className="block font-semibold mb-2">Name</label>
          <input type="text" id="name" name="name" defaultValue={auth?.name} onChange={(e) => setUserUpdated({ ...userUpdated, [e.target.name]: e.target.value })} className="border-gray-300 border w-full p-2 rounded-lg" />
        </div>
        <p className='text-red-700'>{formErrors.name}</p>
        <div className="mb-5">
          <label htmlFor="email" className="block font-semibold mb-2">Email</label>
          <input type="email" id="email" name='email' defaultValue={auth?.email} onChange={(e) => setUserUpdated({ ...userUpdated, [e.target.name]: e.target.value })} className="border-gray-300 border w-full p-2 rounded-lg" />
        </div>
        <p className='text-red-700'>{formErrors.email}</p>
        <div className="mb-5">
          <label htmlFor="mobile" className="block font-semibold mb-2">Mobile</label>
          <input type="tel" id="mobile" name='mobile' defaultValue={auth?.mobile} onChange={(e) => setUserUpdated({ ...userUpdated, [e.target.name]: e.target.value })} className="border-gray-300 border w-full p-2 rounded-lg" />
        </div>
        <p className='text-red-700'>{formErrors.mobile}</p>
        <div className="flex justify-center"> 
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg">Save Changes</button>
        </div>
      </form>
      <ToastContainer />

      <div className='mt-3 flex justify-center mx-auto'>
            {
              passwordCheck ?
                <form action="" onSubmit={(e) => { handleChangePassword(e) }}>
                  <div className="mb-2">
                    <label
                      for="currentPassword"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Current Password
                    </label>
                    <input
                      onChange={(e) => setPass({ ...pass, [e.target.name]: e.target.value })}
                      type="password"
                      name='currentPassword'
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <p className='text-red-700'>{passFormErrors.currentPassword}</p>
                  <div className="mb-2">
                    <label
                      for="newPassword"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      New Password
                    </label>
                    <input
                      onChange={(e) => setPass({ ...pass, [e.target.name]: e.target.value })}
                      type="password"
                      name='newPassword'
                      className="block w-full px-4 py-2 mt-2 text-blue-900 bg-white border rounded-md focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <p className='text-red-700'>{passFormErrors.newPassword}</p>
                  <div className="mb-2">
                    <label
                      for="cnewPassword"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Confirm Password
                    </label>
                    <input
                      onChange={(e) => setPass({ ...pass, [e.target.name]: e.target.value })}
                      type="password"
                      name='cNewPassword'
                      className="block w-full px-4 py-2 mt-2 text-blue-900 bg-white border rounded-md focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <p className='text-red-700'>{passFormErrors.cNewPassword}</p>
                  <button type='submit' className="w-48 mt-2 ml-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600">
                    Change Password
                  </button>
                </form> :

                <button className="w-48 mt-2 ml-3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                  onClick={() => setPasswordCheck(true)}
                >
                  Change Password
                </button>
            }
          </div>
    </div>
  );
};

export default Profile;
