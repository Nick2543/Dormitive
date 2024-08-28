import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";


export default function BookingsPage(){

    const [viewings, setViewings] = useState([]);


    useEffect(() => {
        axios.get('/viewings').then(response => {
            setViewings(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="grid gap-2 grid-cols-2">
                {viewings?.length > 0 && viewings.map(viewing =>(
                    <Link to={`/account/viewings/${viewing._id}`} key={`${viewing._id}-${Date.now()}-${Math.random()}`}
                    className="flex gap-4 bg-primary text-gold rounded-2xl overflow-hidden my-4">
                        <div style={{width: 160, height: 105, objectFit: 'fill'}}>
                            <PlaceImg place={viewing.place} />
                        </div>
                        <div>
                            <div className="pt-1">
                                <h2 className="text-xl font-bold truncate">{viewing.place.title}</h2>
                            </div>
                            <div className="pt-2 flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                                <span className="text-md">Viewing Date: </span>
                                <span className="text-md font-semibold">{new Date(viewing.viewing).toISOString().split('T')[0]}</span>
                            </div>
                            <div className="pt-3">
                                <a target="_blank" href={'https://maps.google.com/?q=' + viewing.place.location} className="flex gap-1 block text-gold text-md underline items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    {viewing.place.location}
                                </a>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
