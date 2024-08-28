import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {

  const [places, setPlaces] = useState([]);

  useEffect(() =>{
    axios.get('/places').then(response => {
      setPlaces(response.data);
    })
  }, []);

    return(
      <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {places.length > 0 && places.map(place => (
          <Link to={'/place/'+place._id} key={`${place._id}-${Date.now()}-${Math.random()}`}>
            <div className="flex mb-2">
              {place.pictures?.[0] && (
                <img className="bg-pblue rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.pictures?.[0]} alt="" />
              )}
            </div>
            <h2 className="text-sm text-primary font-bold">{place.location}</h2>
            <h3 className="text-sm text-gold font-semibold leading-4">{place.title}</h3>
            <div className="text-primary text-sm mt-1">
              <span className="font-bold">${place.rent}</span>  per month
            </div>
            <div className="text-primary text-sm mt-2">
              Move In Date: <span className="font-bold">{new Date(place.moveIn).toISOString().split('T')[0]}</span>
            </div>
          </Link>
        )) }
      </div>
    );
}