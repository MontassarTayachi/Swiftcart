import { CgArrowsExchangeAlt } from "react-icons/cg"; 
import React, { useState, useRef, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import './style/EditPhotos.css';
import { CgClose } from 'react-icons/cg';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { SortableContainer, SortableElement ,sortableHandle, } from 'react-sortable-hoc';
import MediaConverter from '../../../../../../function/Media';
import { API_BASE_URL } from "../../../../../../config";
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { Close } from "@mui/icons-material";
function EditPhotos({ onClose ,product,setUpdated,setOpenSnackbar}) {
  const [openprogress, setOpenprogress] = useState(false);
  const [progress, setProgress] = useState(0);
  const[open_CircularProgress,setopen_CircularProgress]=useState(false)
  const DragHandle = sortableHandle(() => <span><CgArrowsExchangeAlt /></span>);
  const [images, setImages] = useState([]);
  console.log(product.media);
  console.log(images);
  useEffect(() => {
    const convertMedia = async () => {
      if( product.media.length === 0) return;
      setopen_CircularProgress(true)
      const conversions = product.media.map(async (fileUrl) => {
        const type = MediaConverter.determinerTypeDeLien(fileUrl);
        const file = await MediaConverter.convertUrlToFile(fileUrl, `image-${fileUrl.split('/').pop()}`, type);
        return {
          original: fileUrl,
          type,
          file
        };
      });
      const newImages = await Promise.all(conversions);
      setopen_CircularProgress(false)
      setImages(newImages);
     
    };

    convertMedia();
  }, []);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    const newImages = Array.from(files).map(file => ({
      original: URL.createObjectURL(file),
      type:file.type ,
      file:file
    }));

    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleDelete = (indexToDelete) => {
    console.log(indexToDelete);
    setImages(images.filter((_, index) => index !== indexToDelete));
  };

  const SortableItem = SortableElement(({ value, itemIndex }) => (
    <ImageListItem style={{ zIndex: '1000000000' }} cols={itemIndex === 0 ? 2 : 1} rows={itemIndex === 0 ? 2 : 1}>
      {value.type==='video' || value.type==='video/mp4' ? (
        <video controls width={'100%'}  height={'100%'}  src={value.original} alt={`img-${itemIndex}`} />
      ) : (
        <img src={value.original} alt={`img-${itemIndex}`} />
      )}
      <ImageListItemBar
        title={value.original.substring(value.original.lastIndexOf('/') + 1)}
        actionIcon={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton onClick={(event) => {
              event.stopPropagation();
              handleDelete(itemIndex);
            }} sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
              <DeleteIcon />
            </IconButton>
            <IconButton className="xciao9898">
              <DragHandle />
            </IconButton>
          </div>
        }
      />
    </ImageListItem>
  ));
  
  
const SortableGrid = SortableContainer(({ items }) => {
  return (
    <ImageList  cols={3}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} itemIndex={index} index={index}  value={value} />
      ))}
    </ImageList>
  );
});

const onSortEnd = ({ oldIndex, newIndex }) => {
  
    setImages(MediaConverter.arrayMoveImmutable(images, oldIndex, newIndex));
    console.log(images);
  };
  
const handleSave = async () => {
  const formData = new FormData();
  images.forEach(async (image, index) => {
    formData.append('product_media', image.file);
  });
  try {
    setOpenprogress(true);
    const response = await axios.put(`${API_BASE_URL}/products?store_id=${JSON.parse(localStorage.getItem('store')).id}&&id=${product.id}`,formData, {
      headers: {
        contentType: 'multipart/form-data',
        Authorization: `${localStorage.getItem('token')}`
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      },
    });
    const data =  response.data;
    console.log(data);
    if (data.success) {
      setOpenprogress(false);
      setUpdated(data);
      setOpenSnackbar(true);
      onClose();
    } else {
      setOpenprogress(false);
      console.log(data.message);
    }
  } catch (error) {
    console.log(error); 
  }
}
  return (
    <>  
     {openprogress && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }} open={true} >
     <LinearProgress
        determinate
        variant="outlined"
        color="neutral"
        size="sm"
        thickness={32}
        value={progress}
        sx={{
          '--LinearProgress-radius': '0px',
          '--LinearProgress-progressThickness': '24px',
          boxShadow: 'sm',
          borderColor: 'neutral.500'
          ,margin:'1em'
        }}
      >
        <Typography
          level="body-xs"
          fontWeight="xl"
          textColor="common.white"
          sx={{ mixBlendMode: 'difference' }}
        >
          LOADING… {`${Math.round(progress)}%`}
        </Typography>
      </LinearProgress>
        </Backdrop>}
      <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <div className='EditPhotos'>
          <div className='header'>
            <h1>Edit your Product Photos</h1>
            <button onClick={onClose}><CgClose /></button>
          </div>
          <h2>Enhance Your Product's Appeal: Edit Photos with Ease</h2>
          <div className='UploadPhotos'>
            <button onClick={handleButtonClick}>add File Media</button>
           
            <input  type="file" id="file" name="file" accept="image/*,video/*" multiple style={{display:'none'}} onChange={handleFileChange}  ref={fileInputRef}/>
          </div>

          <div className='images'>
            {open_CircularProgress&&<div className="setopen_CircularProgress"><CircularProgress /></div>}
          <SortableGrid axis="xy" useDragHandle items={images} onSortEnd={onSortEnd}  />
          </div>  
          <div className="button"><button className="onClose" onClick={onClose}>Cancel</button><button onClick={handleSave}>Save</button></div>
        </div>
      </Backdrop>
    </>
  );
}

export default EditPhotos;
