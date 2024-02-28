import { useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';


import { fetchProduct } from '../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';


export default function ProductDetails() {

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products', params.id],
    queryFn: ({ signal }) => fetchProduct({ signal, id: params.id }),
  });

  let content;

  if (isPending) {
    content = (
      <div id="product-details-content" className="center">
        <p>Fetching product data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="product-details-content" className="center">
        <ErrorBlock
          title="Failed to load product"
          message={
            error.info?.message ||
            'Failed to fetch product data, please try again later.'
          }
        />
      </div>
    );
  }

  if (data) {
    
    

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
        </header>
        <div id="product-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="product-details-info">
            <p id="product-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      
        <Link to="/products" className="nav-item">
          View all Events
        </Link>
      
      <article id="product-details">{content}</article>
      <p></p>
    </>
  );
}