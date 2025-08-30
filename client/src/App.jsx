import { Routes, Route, data } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import { use, useCallback, useEffect, useState } from 'react';
import { Productsdata } from './Contexts/ProductsContext';
import { Cartegories } from './Contexts/Category';
import Footer from './components/Footer';
import { CartProvider } from './Contexts/CartContext';
import ComfirmOrder from './components/ComfirmOrder';

function App() {
  let categories = ["Miel", "Soin de la peau", "Huile"];
  let [productsData, setProductsData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [isrecive, setIsrecive] = useState(false);
  
  // hanlde confimed Order 
  let handleComfirmedOrder = useCallback((comfirmed) => {
    if(comfirmed){
      setIsrecive(false);
    }
  })
  
  let handleComfirmOrder = useCallback((isComformed) => {
    if(isComformed){
      setIsrecive(true);
    }
  });
  
  
  const fecthData = useCallback( async () => {
    try{
      setLoading(true);
      setError(null);


      let resp = await fetch('/data.json');
      if(!resp.ok){
        throw new Error(`HTTP error!status ${resp.status}`);
      }
      const jsonData = await resp.json();


      setTimeout(() =>{
        setProductsData(jsonData);
        setLoading(false);
      }, );
    }
    catch(error){
      console.error("Failed to fetch data from the /data.json");
      setError(error);
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  }, []);

  useEffect(() =>{
    fecthData();
  }, [fecthData])



  if(loading){
    return <div className='absolute top-[50%] left-[50%] text-3xl text-yellow-400 font-semibold animate-pulse'>
      Loading ... 
    </div>
  }  
  if(error){
    return <div>
      Error while loading data.. please try later;
    </div>
  }
  return (
    <>
      <NavBar />
      <CartProvider>
        <ComfirmOrder isComfirmedOrder={isrecive} comfirmedOrder={handleComfirmedOrder}/>
        <Cartegories.Provider value={categories}>
          <Productsdata.Provider value={productsData} >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart onComfirmOrderFromCart={handleComfirmOrder} />} />
            </Routes>
          </Productsdata.Provider>
        </Cartegories.Provider>
      </CartProvider>
      <Footer />
    </>
  );
}

export default App;
