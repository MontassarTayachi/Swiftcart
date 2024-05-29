
import ProductItem from '../Product-Card/ProductItem';
import './Grid.css';
function Grid_Product({products}) {
    
   
  return (
    <div className='Grid_Product'>
    {products  && products.map((product) => (
        <ProductItem openSnackbar={true} className='card' product={product}/>
    ))}
    
    </div>
  )
}

export default Grid_Product