import { CgClose } from 'react-icons/cg'
import { BiImageAdd } from 'react-icons/bi'
import { BiUpload } from 'react-icons/bi'
import { BiError } from 'react-icons/bi'
import { IoMdArrowRoundBack } from 'react-icons/io'
import React, { useEffect, useState } from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import './AddProduct.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InputAdornment from '@mui/material/InputAdornment'
import { FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc'
import { CgArrowsExchangeAlt } from 'react-icons/cg'
import { API_BASE_URL } from '../../../../../../config'
import MediaConverter from '../../../../../../function/Media'
import { useProductCategories } from '../../../../../../Context/product_categories'
import Backdrop from '@mui/material/Backdrop'
import { Link } from 'react-router-dom'
import LinearProgress from '@mui/joy/LinearProgress'
import Typography from '@mui/joy/Typography'
import Snackbar from '@mui/material/Snackbar'
import axios from 'axios'
function AddProduct() {
    const [progress, setProgress] = React.useState(0)
    const [openprogress, setOpenprogress] = React.useState('')
    const { productCategories } = useProductCategories()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [stock, setStock] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState({ 'id': null, 'name': '', 'description': null, 'super_category_id': null })
    const [deliveryPrice, setDeliveryPrice] = useState('')
    const [editorState, setEditorState] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([])
    const [titleError, setTitleError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)

    const initData = () => {
        setTitle('')
        setStock('')
        setPrice('')
        setCategory({
            'id': null,
            'name': '',
            'description': null,
            'super_category_id': null
        })
        setDeliveryPrice('')
        setEditorState('')
        setSelectedFiles([])
    }

    useEffect(() => {
        const timeout = () => {
            if (title.trim() !== '' || stock || price || category.name.trim() !== '' || deliveryPrice || editorState || selectedFiles.length > 0) {
                setOpen(true)
            } else {
                setOpen(false)
            }
        }
        timeout()
    }, [title, stock, price, category, deliveryPrice, editorState, selectedFiles])

    const handleEditorChange = content => {
        setEditorState(content)
    }

    const handleFileChange = e => {
        const newFiles = Array.from(e.target.files)
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles])
    }

    const handleDelete = index => {
        setSelectedFiles(selectedFiles.filter((file, i) => i !== index))
    }

    const validateForm = () => {
        let isValid = true

        if (!title.trim()) {
            // Checks if title is empty or only whitespace
            setTitleError(true)
            isValid = false
        } else {
            setTitleError(false)
        }

        if (!category.name.trim()) {
            // Checks if category is null or undefined
            setCategoryError(true)
            isValid = false
        } else {
            setCategoryError(false)
        }

        return isValid
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        // Préparation des données du formulaire à envoyer
        const formData = new FormData()
        formData.append('store_id', JSON.parse(localStorage.getItem('store')).id)
        formData.append('name', title)
        formData.append('subcategory_id', category.id)
        formData.append('stock', stock || 0)
        formData.append('price', price || 0)
        formData.append('delivery_price', deliveryPrice || 0)
        formData.append('description', editorState)

        // Ajout des fichiers sélectionnés au formData
        selectedFiles.forEach(file => {
            formData.append('product_media', file)
        })

        try {
            setOpenprogress('openprogress') // Affiche le backdrop de progression

            const response = await axios.post(`${API_BASE_URL}/products`, formData, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    // Content-Type doit être multipart/form-data pour l'envoi de fichiers
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgress(percentCompleted)
                }
            })

            setOpenprogress('') // Cache le backdrop de progression une fois le téléversement terminé

            const data = response.data
            if (data.success) {
                initData()
                console.log(data)
                setOpenprogress('openSnackbar')
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            setOpenprogress(false)
            console.error(error)
            setError(error.message)
        }
        initData()
    }

    const DragHandle = sortableHandle(() => (
        <span>
            <CgArrowsExchangeAlt />
        </span>
    ))
    const SortableItem = SortableElement(({ value, itemIndex }) =>
        value.type.startsWith('video/') ? (
            <ImageListItem key={itemIndex} cols={itemIndex == 0 ? 2 : 1} rows={itemIndex == 0 ? 2 : 1}>
                <video controls width={'100%'} height={'100%'} src={URL.createObjectURL(value)} />
                <ImageListItemBar
                    title={value.name}
                    actionIcon={
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton
                                onClick={event => {
                                    event.stopPropagation()
                                    handleDelete(itemIndex)
                                }}
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton className='xciao9898'>
                                <DragHandle />
                            </IconButton>
                        </div>
                    }
                />
            </ImageListItem>
        ) : (
            <ImageListItem key={itemIndex} cols={itemIndex == 0 ? 2 : 1} rows={itemIndex == 0 ? 2 : 1}>
                <img src={URL.createObjectURL(value)} alt={value.name} />
                <ImageListItemBar
                    title={value.name}
                    actionIcon={
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton
                                onClick={event => {
                                    event.stopPropagation()
                                    handleDelete(itemIndex)
                                }}
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton className='xciao9898'>
                                <DragHandle />
                            </IconButton>
                        </div>
                    }
                />
            </ImageListItem>
        )
    )

    const SortableGrid = SortableContainer(({ items }) => {
        return (
            <ImageList cols={3}>
                {selectedFiles.map((value, index) => (
                    <SortableItem key={`item-${index}`} itemIndex={index} index={index} value={value} />
                ))}
            </ImageList>
        )
    })

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setSelectedFiles(MediaConverter.arrayMoveImmutable(selectedFiles, oldIndex, newIndex))
    }

    return (
        <>
            {openprogress === 'openSnackbar' && (
                <Snackbar
                    open={true}
                    autoHideDuration={5000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    onClose={() => {
                        setOpenprogress('')
                    }}
                    message='Product created successfully.'
                />
            )}
            {openprogress === 'openprogress' && (
                <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
                    <LinearProgress
                        determinate
                        variant='outlined'
                        color='neutral'
                        size='sm'
                        thickness={32}
                        value={progress}
                        sx={{
                            '--LinearProgress-radius': '0px',
                            '--LinearProgress-progressThickness': '24px',
                            boxShadow: 'sm',
                            margin: '2em',
                            borderColor: 'neutral.500'
                        }}
                    >
                        <Typography level='body-xs' fontWeight='xl' textColor='common.white' sx={{ mixBlendMode: 'difference' }}>
                            LOADING… {`${Math.round(progress)}%`}
                        </Typography>
                    </LinearProgress>
                </Backdrop>
            )}

            <div className='AddProduct'>
                <div className='header'>
                    <Link to={'../Product'}>
                        <button>
                            {' '}
                            <IoMdArrowRoundBack />
                        </button>{' '}
                    </Link>{' '}
                    <h2>Add product</h2>
                </div>
                <form>
                    <div className='card'>
                        {error.trim() && (
                            <div className='error'>
                                <button
                                    onClick={() => {
                                        setError('')
                                    }}
                                >
                                    <CgClose />{' '}
                                </button>
                                <p>{error}</p>
                            </div>
                        )}
                        <div className='Input'>
                            <label htmlFor='name'>Title</label>
                            <TextField
                                type='text'
                                name='name'
                                value={title}
                                onChange={e => {
                                    setTitle(e.target.value)
                                }}
                                error={titleError}
                                helperText={titleError ? 'Title is required.' : ''}
                                FormHelperTextProps={{ style: { color: 'red' } }}
                                placeholder='Enter the Product Title'
                                InputProps={{
                                    endAdornment: titleError && (
                                        <InputAdornment position='end'>
                                            <IconButton aria-label='error' edge='end'>
                                                <ErrorOutlineIcon color='error' />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <p>Enter the name of the product you want to add to the online store.</p>
                        </div>
                        <div>
                            <label htmlFor='description'>Description</label>
                            <div className='SunEditor'>
                                <SunEditor
                                    height='100%'
                                    setOptions={{
                                        buttonList: [['undo', 'redo'], ['font', 'fontSize', 'formatBlock'], ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'], ['fontColor', 'hiliteColor', 'textStyle'], ['removeFormat'], ['align', 'horizontalRule', 'list', 'table', 'link'], ['fullScreen', 'showBlocks', 'codeView'], ['preview', 'print']]
                                    }}
                                    onChange={handleEditorChange}
                                    setContents={editorState}
                                />
                            </div>
                            <p>Describe the product in detail, including its features, benefits and uses.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='Input input'>
                            <label htmlFor='category'>Category</label>

                            <Autocomplete
                                id='category'
                                options={productCategories}
                                getOptionLabel={option => option.name}
                                renderInput={params => <TextField {...params} error={categoryError} helperText={categoryError ? 'Select Category existed in the list' : ''} FormHelperTextProps={{ style: { color: 'red' } }} placeholder='Choose a Category' />}
                                freeSolo
                                value={category}
                                onChange={(e, value) => {
                                    if (value) {
                                        setCategory(value)
                                    } else {
                                        setCategory({ 'id': null, 'name': '', 'description': null, 'super_category_id': null })
                                    }
                                }}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                                        padding: '0.35rem 1.5rem !important',
                                        fontSize: '0.9rem',
                                        fontWeight: 400
                                    }
                                }}
                            />
                            <p>Select the category that best fits your product.</p>
                        </div>
                    </div>
                    <div className='card '>
                        <div className='price'>
                            <div className='Input input'>
                                <label htmlFor='stock'>Stock</label>
                                <TextField
                                    type='number'
                                    name='stock'
                                    value={stock}
                                    onChange={e => {
                                        setStock(e.target.value)
                                    }}
                                    placeholder='Quantity available'
                                />
                                <p>Specify the number of units available for this product.</p>
                            </div>
                        </div>
                        <div className='price'>
                            <div className='Input input'>
                                <label htmlFor='price'>Price</label>
                                <TextField
                                    type='number'
                                    name='price'
                                    value={price}
                                    onChange={e => {
                                        setPrice(e.target.value)
                                    }}
                                    placeholder=' Enter the Product price.'
                                />
                                <p>Indicate the price of the product in local currency or any other unit of your choice.</p>
                            </div>
                            <div className='Input input'>
                                <label htmlFor='price'>Delivery price</label>
                                <TextField
                                    type='number'
                                    name='price'
                                    value={deliveryPrice}
                                    onChange={e => {
                                        setDeliveryPrice(e.target.value)
                                    }}
                                    placeholder='Enter the delivery price.'
                                />
                                <p>Specify the delivery price of the product in local currency or any other unit of your choice.</p>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <label htmlFor='image'>Media</label>
                        <div className='Uploadimages'>
                            {selectedFiles.length !== 0 && (
                                <div className='add'>
                                    {' '}
                                    <label htmlFor='input-files'>
                                        <BiImageAdd /> add
                                    </label>
                                </div>
                            )}
                            <div className='images'>
                                <SortableGrid axis='xy' useDragHandle items={selectedFiles} onSortEnd={onSortEnd} />
                            </div>
                            {selectedFiles.length === 0 && (
                                <div className='input-files'>
                                    <label htmlFor='input-files'>
                                        <BiUpload /> upload new
                                    </label>
                                    <p>Accept images, videos,</p>
                                </div>
                            )}
                            <FormControl sx={{ m: 1 }}>
                                <TextField style={{ display: 'none' }} id='input-files' type='file' multiple onChange={handleFileChange} InputProps={{ inputProps: { multiple: true, accept: 'image/*,video/*' } }} />
                            </FormControl>
                        </div>
                        <p>Upload images of the product to give customers a clear view of what they are buying.</p>
                    </div>
                    {open && (
                        <div className='Save'>
                            <h1>
                                {' '}
                                <BiError /> Unsaved Product
                            </h1>
                            <div className='button'>
                                <button
                                    onClick={e => {
                                        e.preventDefault()
                                        initData()
                                    }}
                                >
                                    Discard
                                </button>
                                <button onClick={handleSubmit} className='Saveb'>
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </>
    )
}

export default AddProduct
