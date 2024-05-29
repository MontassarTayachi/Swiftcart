import { MdModeEditOutline } from 'react-icons/md'
import { IconButton, TextField, InputAdornment } from '@mui/material'
import React, { useState, useEffect } from 'react'
import './Style/General.css'
import Edit from './Edit'
import { useUser } from '../../Context/UserProvider'
import { Link } from 'react-router-dom'
import profile from '../../assets/images/profile.png'
function General() {
    const [editType, setEditType] = useState(null)
    const closeEditModal = () => setEditType(null)
    const { userInfo, setUserInfo } = useUser()

    return (
        <>
            <Edit open1={editType === 'firstName'} onClose={closeEditModal} FirstName={userInfo.first_name}></Edit>
            <Edit open2={editType === 'lastName'} LastName={userInfo.last_name} onClose={closeEditModal}></Edit>
            <Edit open3={editType === 'email'} Email={userInfo.email} onClose={closeEditModal}></Edit>
            <Edit open4={editType === 'image'} image={userInfo.image} onClose={closeEditModal}></Edit>

            <div className='General'>
                <div className='Title'>
                    <h1>General</h1>
                </div>
                <div className='Details'>
                    <h2>Details</h2>
                    <div className='Form'>
                        <div className='changePhoto'>
                            <img src={userInfo.image || profile}></img>
                            <button onClick={() => setEditType('image')}>Update photo</button>
                        </div>
                        <div className='changerName'>
                            <div className='Inpute'>
                                <label>First Name </label>
                                <TextField
                                    disabled
                                    value={userInfo.first_name}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setEditType('firstName')} className='tt'>
                                                    <MdModeEditOutline />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                                            fontSize: '1rem',
                                            padding: ' 0.8rem  1.5rem'
                                        }
                                    }}
                                ></TextField>
                            </div>
                            <div className='Inpute'>
                                <label>Last Name </label>
                                <TextField
                                    disabled
                                    value={userInfo.last_name}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setEditType('lastName')} className='tt'>
                                                    <MdModeEditOutline />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                                            fontSize: '1rem',
                                            padding: ' 0.8rem  1.5rem'
                                        }
                                    }}
                                ></TextField>
                            </div>
                        </div>
                        <div className='change'>
                            <div className='Inpute email'>
                                <label>Email </label>

                                <TextField
                                    disabled
                                    value={userInfo.email}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                                            fontSize: '1rem',
                                            padding: ' 0.8rem  1.5rem'
                                        }
                                    }}
                                ></TextField>
                            </div>
                            <button onClick={() => setEditType('email')}>Update</button>
                        </div>
                        <div className='change'>
                            <div className='Inpute'>
                                <label>Phone Number </label>

                                <TextField
                                    disabled
                                    type='number'
                                    value={userInfo.number || 'no number'}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                                            fontSize: '1rem',
                                            padding: ' 0.8rem  1.5rem'
                                        }
                                    }}
                                ></TextField>
                            </div>
                            <button>Update</button>
                        </div>
                    </div>
                </div>
                <div className='Details'>
                    <h2>Stores</h2>
                    <div className='Form'>
                        <Link to={'/Swiftcart/MyStores'}>View all stores</Link>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default General
