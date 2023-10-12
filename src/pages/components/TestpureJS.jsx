import Head from 'next/head';
import axios from 'axios';

const ModelJs = () => {
  let apartments = [];

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/apartment');
      console.log('Apartments:', response.data);
      apartments = response.data; // Update apartments directly
      apart_01_Function_available(); // Call the function after fetching data
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

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

  // Call the fetchData function when the component mounts
  fetchData();

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
      <div>
        <h2>Fetched Apartments:</h2>
        <ul>
          {/* Assuming 'name' is a property of the apartment object */}
          {apartments.map((apartment, index) => (
            <li key={index}>{apartment.status}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ModelJs;
