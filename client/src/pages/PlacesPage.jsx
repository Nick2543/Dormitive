import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";


export default function PlacesPage(){

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({data}) =>{
            setPlaces(data);
        });
    }, []);

    return (
        <div className="mt-2 -mb-1">
            <AccountNav />
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-gold py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Post a new accomodation
                    </Link>
                </div>
                <div className="mt-4 ">
                    {places.length > 0 && places.map(place => (
                        <Link to={'/account/places/'+place._id} className="flex cursor-pointer gap-4 bg-primary text-gold border border-gray-500 rounded-2xl p-4 my-4"
                            key={`${place._id}-${Date.now()}-${Math.random()}`}>
                            <div className="flex w-40 h-40 grow shrink-0">
                                <PlaceImg place={place} />
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-2xl font-bold">{place.title}</h2>
                                <p className="text-white text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    );
}
