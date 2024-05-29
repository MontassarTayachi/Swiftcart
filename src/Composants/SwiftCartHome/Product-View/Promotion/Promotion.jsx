import React from 'react'
import { Galleria } from 'primereact/galleria';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import image from '../../../../assets/images/Promation/1.png'
import image2 from '../../../../assets/images/Promation/2.png'
import image3 from '../../../../assets/images/Promation/3.png'
import image4 from '../../../../assets/images/Promation/4.png'
import image5 from '../../../../assets/images/Promation/5.png'
import image6 from '../../../../assets/images/Promation/6.png'
import image7 from '../../../../assets/images/Promation/7.png'
import image8 from '../../../../assets/images/Promation/8.png'
import image9 from '../../../../assets/images/Promation/9.png'
import image10 from '../../../../assets/images/Promation/10.png'
import image11 from '../../../../assets/images/Promation/11.png'
import image12 from '../../../../assets/images/Promation/12.png'
import './Promotion.css';
import CardGroup from './CardGroup';
import ValidateurChaine from '../../../../function/ValiderChaine'; 
import { useNavigate } from 'react-router-dom';
import {Search}from '../../../../Context/SerachBar';
import { Categories } from '../../../../Context/StoreCategories';
import StorePopular from './StorePopular';
function Promotion({product,stores}) {
    const{search,setSearch}=Search();
    const navigate=useNavigate();
    const {storeCategories} = Categories();
    const onNaviget=(categorie,include_subcategories)=>{
        if(include_subcategories && include_subcategories==true)
        {
            navigate('/Swiftcart/search?categories='+categorie)
            setSearch(
                {
                    ...search,
                    selectedCategories:[categorie]
                }
            )

        }
        else
        {
        navigate('/Swiftcart/search?supcategories='+categorie)
        setSearch(
            {
                ...search,
                supcategories:[categorie]
            }
        )

        }
        
    }
  
    const products = [
        { name: 'Promotion 1', description: 'Description for Promotion 1', image: image },
        { name: 'Promotion 2', description: 'Description for Promotion 2', image: image2 },
        { name: 'Promotion 3', description: 'Description for Promotion 3', image: image3 },
        { name: 'Promotion 4', description: 'Description for Promotion 4', image: image4 },
        { name: 'Promotion 5', description: 'Description for Promotion 4', image: image5 },
        { name: 'Promotion 4', description: 'Description for Promotion 4', image: image6 },
        { name: 'Promotion 4', description: 'Description for Promotion 4', image: image7},
        { name: 'Promotion 4', description: 'Description for Promotion 4', image: image8 },
        { name: 'Promotion 4', description: 'Description for Promotion 4', image: image9 },
        { name: 'Promotion 4', description: 'Description for Promotion 4', image: image10 },
        { name: 'Promotion 4', description: 'Description for Promotion 4', image: image11 },
        { name: 'Promotion 4', description: 'Description for Promotion 4', image: image12 }

    
    ];
    const itemTemplate = (item) => {

        return <div className='ssssspppp' ><img src={item.image} alt={item.alt} style={{ width: '100%' ,objectFit:"cover"}}/></div>;
    }

  return (
   <div className='xzihedpiu9858949848'>
     <Galleria value={products}  
     autoPlay transitionInterval={2000}
             className='Galleria'   showThumbnails={false}   showItemNavigators={true} circular={true} item={itemTemplate}  />
    {product&&<div className='ssiiidjij'>
    <div className='sniijsi556'>
   
    <CardGroup cardTitel={'Refresh your space'}
       List={
        [
        {photo:product[0]?.media[0],titre:ValidateurChaine.reduireEtValiderChaine(product[0]?.name,12),onClik:()=>{navigate('/Swiftcart/product/'+product[0]?.id)}},
        {photo:product[1]?.media[0],titre:ValidateurChaine.reduireEtValiderChaine(product[1]?.name,12),onClik:()=>{navigate('/Swiftcart/product/'+product[1]?.id)}},
        {photo:product[2]?.media[0],titre:ValidateurChaine.reduireEtValiderChaine(product[2]?.name,12),onClik:()=>{navigate('/Swiftcart/product/'+product[2]?.id)}},
        {photo:product[3]?.media[0],titre:ValidateurChaine.reduireEtValiderChaine(product[3]?.name,12),onClik:()=>{navigate('/Swiftcart/product/'+product[3]?.id)}}
    ]

     }/>
     <StorePopular store={stores[0]}/>
     <CardGroup cardTitel={'Spring deals by category'} 
        List={[
            {photo:storeCategories[0]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[0]?.name,12),onClik:()=>onNaviget(storeCategories[0]?.name)},
            {photo:storeCategories[1]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[1]?.name,12),onClik:()=>onNaviget(storeCategories[1]?.name)},
            {photo:storeCategories[2]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[2]?.name,12),onClik:()=>onNaviget(storeCategories[2]?.name)},
            {photo:storeCategories[3]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[3]?.name,12),onClik:()=>onNaviget(storeCategories[3]?.name)}
        ]}

     />
     <CardGroup cardTitel={'Spring deals by category'}
     List={
        [
        {photo:storeCategories[8]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[8]?.name,12),onClik:()=>onNaviget(storeCategories[8]?.name)},
        {photo:storeCategories[9]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[9]?.name,12),onClik:()=>onNaviget(storeCategories[9]?.name)},
        {photo:storeCategories[10]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[10]?.name,12),onClik:()=>onNaviget(storeCategories[10]?.name)},
        {photo:storeCategories[11]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[11]?.name,12),onClik:()=>onNaviget(storeCategories[11]?.name)}   
        ]
     }

     />
     
     
     </div>
     <div className='sssooodood'>
     <CardGroup cardTitel={'Spring deals by category'}
     List={[
            {photo:storeCategories[4]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[4]?.name,12),onClik:()=>onNaviget(storeCategories[4]?.name)},
            {photo:storeCategories[5]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[5]?.name,12),onClik:()=>onNaviget(storeCategories[5]?.name)},
            {photo:storeCategories[6]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[6]?.name,12),onClik:()=>onNaviget(storeCategories[6]?.name)},
            {photo:storeCategories[7]?.image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[7]?.name,12),onClik:()=>onNaviget(storeCategories[7]?.name)}     
    ]}

     />
     <StorePopular product={product[4]}/>
     <CardGroup cardTitel={'Spring deals by category'}
     List={
        [
            {photo:storeCategories[0].sub_categories[0].image,titre:storeCategories[0].sub_categories[0].name,onClik:()=>onNaviget(storeCategories[0].sub_categories[0].name,true)} ,
            {photo:storeCategories[0].sub_categories[1].image,titre:storeCategories[0].sub_categories[1].name,onClik:()=>onNaviget(storeCategories[0].sub_categories[1].name,true)} ,
            {photo:storeCategories[0].sub_categories[2].image,titre:storeCategories[0].sub_categories[2].name,onClik:()=>onNaviget(storeCategories[0].sub_categories[2].name,true)} ,
            {photo:storeCategories[0].sub_categories[3].image,titre:storeCategories[0].sub_categories[3].name,onClik:()=>onNaviget(storeCategories[0].sub_categories[3].name,true)} ,
            
        ]

     }

     />
    <CardGroup cardTitel={'Spring deals by category'}
     List={
        [
            {photo:storeCategories[1].sub_categories[0].image,titre:storeCategories[1].sub_categories[0].name,onClik:()=>onNaviget(storeCategories[1].sub_categories[0].name,true)} ,
            {photo:storeCategories[1].sub_categories[1].image,titre:storeCategories[1].sub_categories[1].name,onClik:()=>onNaviget(storeCategories[1].sub_categories[1].name,true)} ,
            {photo:storeCategories[1].sub_categories[2].image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[1].sub_categories[2].name,12),onClik:()=>onNaviget(storeCategories[1].sub_categories[2].name,true)} ,
            {photo:storeCategories[1].sub_categories[3].image,titre:ValidateurChaine.reduireEtValiderChaine(storeCategories[1].sub_categories[3].name,12),onClik:()=>onNaviget(storeCategories[1].sub_categories[3].name,true)} ,  
        ]

     }

     />
     
     </div>
    </div>}
    
   </div>
   
    
  )
}

export default Promotion