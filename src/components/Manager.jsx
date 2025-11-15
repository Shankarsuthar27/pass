import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passswordArray, setpassswordArray] = useState([])

    useEffect(() => {
        // FIX: Corrected the key to "passwords"
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpassswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true, // Changed to true for better UX
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPass = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "icons/hidden.png";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "icons/eye.png";
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            // FIX: Create the new array first to ensure consistency
            const newPasswordArray = [...passswordArray, { ...form, id: uuidv4() }];
            setpassswordArray(newPasswordArray);
            // FIX: Use the consistent key "passwords" and the new array
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
            
            setform({ site: "", username: "", password: "" });
            toast('Password saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Please fill all fields with at least 4 characters.');
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            // FIX: Create the new array first
            const newPasswordArray = passswordArray.filter(item => item.id !== id);
            setpassswordArray(newPasswordArray);
            // FIX: Use the consistent key "passwords" and the new array
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
            
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        // Populate the form with the item to be edited
        setform(passswordArray.find(i => i.id === id));
        // Remove the item from the current list
        const newPasswordArray = passswordArray.filter(item => item.id !== id);
        setpassswordArray(newPasswordArray);
        // The password will be re-added when the user clicks "Save" again
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-green-10"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[100%] translate-y-[-20%] rounded-full bg-[rgba(157,243,129,0.83)] opacity-50 blur-[80px]"></div> </div>
            <div className="p-2 pt-3 md:mycontainer min-h-[88px]">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type=" text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type=" text" name='username' id='username' />
                        <div className='relative '>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPass}><img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="show/hide password icon" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className=' flex justify-center py-2 px-8 items-center bg-green-400 hover:bg-green-300 rounded-full w-fit gap-2 border border-green-900'>
                        <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover"></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passswordArray.length === 0 && <div>No Passwords to show</div>}
                    {passswordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className=' bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100 '>
                                {passswordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center py-2 border border-white'>
                                            <div className="flex justify-center items-center gap-2">
                                                <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                {/* FIX: Changed onClick to use an arrow function */}
                                                <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <img className='w-5' src="icons/copy.png" alt="copy icon" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className="flex justify-center items-center gap-2">
                                                <span>{item.username}</span>
                                                {/* FIX: Changed onClick to use an arrow function */}
                                                <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <img className='w-5' src="icons/copy.png" alt="copy icon" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className="flex justify-center items-center gap-2">
                                                <span>{'*'.repeat(item.password.length)}</span>
                                                {/* FIX: Changed onClick to use an arrow function */}
                                                <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <img className='w-5' src="icons/copy.png" alt="copy icon" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon src="https://cdn.lordicon.com/xyfswyxf.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager;