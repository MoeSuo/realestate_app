import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

const Model = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/apartment');
        console.log('Apartments:', response.data);
        setApartments(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, []); // Empty dependency array ensures the effect runs once after initial render



  /**************************************test 3dvista */
  useEffect(() => {
    function apart_01_Function_available() {
      if (apartments && apartments.length > 0) {
        const status = apartments[0].status;

        if (status === "Available") {
          tour.setOverlaysVisibilityByTags(['A01_go'], true);
          tour.setObjectsVisibilityByID(['34'], true);
        } else if (status === "Sold") {
          tour.setOverlaysVisibilityByTags(['A01_go'], false);
          tour.setObjectsVisibilityByID(['36'], true);
        }
      }
    }
}, []); 
  /**************************************test 3dvista */
  return (
    <>
      <Head>
        <title>Interactive Real Estate App</title>
        {/* Add your external CSS and JavaScript files here */}
        {/* ... */}
      </Head>

      <div id="preloadContainer" className="fill-viewport">
        {/* Preloader content */}
      </div>

      <div id="viewer" className="fill-viewport">
        {/* Viewer content */}
      </div>

      {/* WhatsApp and Share button */}
      <div id="whatsapp">
        {/* ... */}
      </div>

      {/* Display fetched data */}
      {/* <div className='text-white justify-center items-center '>
        <h2>Fetched Apartments:</h2>
        <ul>
          
          {apartments.map((apartment) => (
            <li key={apartment.id}>{apartment.status}</li> 
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default Model;
