import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import ratingStar from './assets/images/Frame.png';
import locationIcon from './assets/images/Vector.png';

function App() {
  const [productdata, setProductdata] = useState([]);
  const [selects, setSelects] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products${selects? "/category/" + selects:""}`)
      .then(response => response.json())
      .then(data => setProductdata(data))
      .catch(err => console.log(err))

  }, [selects])

  console.log(productdata);

  return (
    <div className="container">
      <div className="top__content">
        <h1>Today Is Only For You</h1>
        <select onChange={e=>setSelects(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="men's clothing">mens clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">womens clothing</option>
        </select>
      </div>
      <div className="App">
        {
          productdata.map(product =>
            <div key={product.id} className='card'>
              <img src={product.image} />
              <div className="card__content">
                <div className="type">
                  <span>{product.category}</span>
                </div>
                <div className="text">
                  <div className="title">
                    <p>{product.title.slice(0, 45) + (product.title.length > 45 ? "..." : "")}</p>
                  </div>
                  <div className="price-location">
                    <div className="price-rating">
                      <p>${product.price}</p>
                      <div className="rating">
                        <img src={ratingStar} />
                        <span>{product.rating.rate}</span>
                      </div>
                    </div>
                    <div className="location-sold">
                      <div className="location">
                        <img src={locationIcon} />
                        <span>Kota Bandung</span>
                      </div>
                      <span>{product.rating.count} Sold</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
