import React ,{useEffect, useState}from 'react'
import { MdReportGmailerrorred } from "react-icons/md"; 
import SunEditor from 'suneditor-react';
import Backdrop from '@mui/material/Backdrop';
import { CgClose } from "react-icons/cg";
import './style/EditProductDetails.css';
import {API_BASE_URL} from '../../../../../../config';
function Editdescription({onClose,editorState, product,setOpenSnackbar,setUpdated}) {
    const [editor, setEditorState] = useState(editorState);
    const [error, setError] = useState('');
    const [openSave, setOpenSave] = useState(false);
    
    useEffect(() => {
        if(editorState !== editor){
            setOpenSave(true);
        }else{
            setOpenSave(false);
        }
    }, [editor])
    const handelSave=async (e)=>{
        e.preventDefault();
      
        try {
          const formData = new FormData();

          formData.append('description', editor
          .replace(/'/g, "&#039;"));
          console.log(editor)
          
          const respance=  await fetch(`${API_BASE_URL}/products?store_id=${JSON.parse(localStorage.getItem('store')).id}&&id=${product.id}`, {
            method: 'PUT',
            headers: {
              contentType: 'multipart/form-data',
              Authorization: `${localStorage.getItem('token')}`
            },  
            body: formData
          });
          const res= await respance.json();
          if(res.success){
            setOpenSnackbar(true);
            setUpdated(JSON.stringify({
              description:editor
            }));
            onClose();
           
          }
          else{
            setError(res.message);
           throw new Error();
          }
        } catch (error) {
          console.log(error);
          
        }
    }

    const handleEditorChange = (content) => {
        setEditorState(content);
      };
      
  return (
    <Backdrop open={true}sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <div className='EditProductDetails'> 
    <div className='header'>
          <h1>Edit your Product details</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        {error.trim() && <div className="erreur">
            <p> <MdReportGmailerrorred size={25}/>{error}</p>
          </div> }    
        <div className="SunEditor" style={{width:'100%',display:'flex',padding:'1rem'}}>
    <SunEditor 
        setOptions={{
        buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['align', 'horizontalRule', 'list', 'table','link'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview', 'print'],
        ]
        }}
        onChange={handleEditorChange}
        setContents={editor}/>

    </div>
    <div className="button">{openSave?<button onClick={handelSave}>Save Changes</button>:<button style={{cursor:'not-allowed',background:'#d6d6d683',border:'none'}}>Save Changes</button>}</div>

    </div>
    </Backdrop>
  )
}

export default Editdescription