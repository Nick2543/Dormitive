import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response =>{
            setPlace(response.data);
        })
    }, [id]);

    if (!place) return '';

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-lblack min-h-screen">
                <div className="bg-lblack p-8 grid gap-4">
                    <div>
                        <h2 className="text-gold font-semibold text-3xl my-2 mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-10 flex gap-1 py-2 px-4 bg-gray-300 text-black shadow shadow-black rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    {place?.pictures?.length > 0 && place.pictures.map(picture => (
                        <div>
                            <img onClick={() =>setShowAllPhotos(true)} src={'http://localhost:4000/uploads/'+picture} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const ExtraInfo = ({ place }) => (
        place.extraInfo === '' ? null : (
            <div>
                <h2 className="text-gold text-2xl font-semibold mb-1">Extra Info.</h2>
                <p className="text-primary text-gray-500">{place.extraInfo}</p>
            </div>
        )
    );

    return (
        <div className="mt-4 bg-gray-300 -mx-8 px-8 pt-8 ">
            <h1 className="text-gold font-bold text-3xl my-2">{place.title}</h1>
            <a target="_blank" href={'https://maps.google.com/?q='+place.location} className="flex gap-1 block text-primary text-sm font-semibold underline mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.location}
            </a>
            <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {place.pictures?.[0] && (
                        <div>
                            <img onClick={() =>setShowAllPhotos(true)} className="cursor-pointer object-cover aspect-squre" src={'http://localhost:4000/uploads/'+place.pictures?.[0]} alt="" />
                        </div>
                    )}
                </div>
                <div className="grid">
                    {place.pictures?.[1] && (
                    <img onClick={() =>setShowAllPhotos(true)} className="cursor-pointer object-cover aspect-squre" src={'http://localhost:4000/uploads/'+place.pictures?.[1]} alt="" />
                    )}
                    <div className="overflow-hidden">
                        {place.pictures?.[2] && (
                        <img onClick={() =>setShowAllPhotos(true)} className="cursor-pointer object-cover aspect-squre relative top-2" src={'http://localhost:4000/uploads/'+place.pictures?.[2]} alt="" />
                        )}
                    </div>
                </div>
            </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 text-black absolute bottom-3 right-2 bg-white py-1 px-3 rounded-2xl shadow shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
                    Show more photos
                </button>
            </div>
            <div className="mt-7 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="my-4">
                    <h2 className="text-gold font-semibold text-2xl mb-1">Description</h2>
                    <p className="text-primary">{place.description}</p>
                    <div className="text-primary my-4">
                        <span className="font-semibold">Move-In Date:</span>
                        <span className="font-bold"> {new Date(place.moveIn).toISOString().split('T')[0]}</span><br />
                        <span className="font-semibold">Lease Period:</span>
                        <span className="font-bold"> {place.lease}</span><br />
                        <span className="font-semibold">Max no. of students for this accomodation:</span>
                        <span className="font-bold"> {place.maxStudents}</span> <br />
                    </div>
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 mt-5 px-8 py-8 border-t">
                <ExtraInfo place={place} />
            </div>
        </div>
    );
}