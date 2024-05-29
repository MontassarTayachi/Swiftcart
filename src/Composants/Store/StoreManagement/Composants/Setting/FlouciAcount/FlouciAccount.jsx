import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CgClose } from "react-icons/cg"; 
import React from 'react'
import { Backdrop, IconButton, InputAdornment, TextField } from "@mui/material";
import './FlouciAccount.css'
import { API_BASE_URL } from '../../../../../../config';
function FlouciAccount({onClose}) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [errorid, setErrorid] = React.useState(false);
    const [errorpublic, setErrorpublic] = React.useState(false);
    const [errorprivate, setErrorprivate] = React.useState(false);
    const [error, setError] = React.useState('');
    const store=JSON.parse(localStorage.getItem('store'));
    const [data, setData] = React.useState({
        flouci_app_id:store.flouci_app_id,
        flouci_public_token:store.flouci_public_token,
        flouci_private_token:store.flouci_private_token
    });
    const Validate = () => {
      let isValid=true;
        if (data.flouci_app_id === '') {
            setErrorid(true);
            isValid=false;
        } else {
            setErrorid(false);
        }
        if (data.flouci_public_token === '') {
            setErrorpublic(true);
            isValid=false;
        } else {
            setErrorpublic(false);
        }
        if (data.flouci_private_token === '') {
            setErrorprivate(true);
            isValid=false;
        } else {
            setErrorprivate(false);
        }
        return isValid;
      };
      const Save = async () => {
        if (Validate()) {
          const formData = new FormData();
          formData.append('flouci_app_id', data.flouci_app_id);
          formData.append('flouci_public_token', data.flouci_public_token);
          formData.append('flouci_private_token', data.flouci_private_token);
          try {
            const respance = await fetch(
              `${API_BASE_URL}/stores?id=${store.id}`,
              {
                method: 'PUT',
                headers: {
                    contentType: 'multipart/form-data', 
                  Authorization: `${localStorage.getItem('token')}`,
                },
                body: formData,
              }
            );
            const data = await respance.json();
            console.log(data);
            if (data.success) {
              localStorage.setItem('store', JSON.stringify(data.updated_stores[0]));
              onClose();
            } else {
              throw new Error(data.message);
            }
          } catch (error) {
            console.log(error);
            setError(error.message);
          }
        }
      }
  return (
    <Backdrop open={true} style={{zIndex:1000}}>
        <div className="settingssssmsmms">
            <div className="setting__header">
           <h2>Flouci Account</h2> 
            <button  onClick={onClose}><CgClose /></button>             
            </div>
            <div className="setting__content">
            <div className="setting__content__item">
                <div className="setting__content__item__title">Flouci App ID</div>
                <TextField className='setting__content__item__input' type="text"
                value={data.flouci_app_id}
                error={errorid}
                helperText={errorid ? 'This field is required' : ''}
                onChange={(e) => {
                    setData({...data, flouci_app_id: e.target.value});
                }}
                sx={{ '& .MuiInputBase-input': {fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',fontSize: '15px',  padding: '0.8rem 1rem', } }} placeholder="Flouci App ID" />
              
            </div>
            <div className="setting__content__item">
                <div className="setting__content__item__title">Flouci Public Token</div>
                <TextField type={showPassword ? 'text' : 'password'} placeholder=" Flouci Public Token"
                className='setting__content__item__input'
                value={data.flouci_public_token}
                error={errorpublic}
                helperText={errorpublic ? 'This field is required' : ''}
                onChange={(e) => {
                    setData({...data, flouci_public_token: e.target.value});
                }}
                  sx={{ '& .MuiInputBase-input': {fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif', fontSize: '15px',  padding: '0.8rem 1rem', },  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton aria-label='toggle password visibility' className='setting__content__item__input' onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
            </div>
            <div className="setting__content__item">
                <div className="setting__content__item__title">Flouci Private Token</div>
                  <TextField
                    type={showPassword1 ? 'text' : 'password'}
                    placeholder="Flouci Private Token"
                    error={errorprivate}
                    helperText={errorprivate
                        ? 'This field is required'
                        : ''}
                    className='setting__content__item__input'
                    value={data.flouci_private_token}
                    onChange={(e) => {
                        setData({...data, flouci_private_token: e.target.value});
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                        fontSize: '15px',
                        padding: '0.8rem 1rem',
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton aria-label='toggle password visibility' onClick={() => setShowPassword1(!showPassword1)}>
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    />
            </div>
            </div>
            <div className="setting__footer">
            <button className="setting__footer__button" onClick={Save}>Save</button>
            </div>
        </div>
    </Backdrop>
  )
}

export default FlouciAccount