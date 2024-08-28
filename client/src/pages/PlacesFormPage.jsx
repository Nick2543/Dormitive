import { useEffect, useState } from "react";
import axios from "axios";
import Features from "../Features";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [addedPicture, setAddedPicture] = useState([]);
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [moveIn, setMoveIn] = useState(new Date());
    const [lease, setLease] = useState('');
    const [maxStudents, setMaxStudents] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [rent, setRent] = useState(700);

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setLocation(data.location);
            setDescription(data.description);
            setAddedPicture(data.pictures);
            setFeatures(data.features);
            setExtraInfo(data.extraInfo);
            setMoveIn(data.moveIn);
            setLease(data.lease);
            setMaxStudents(data.maxStudents);
            setRent(data.rent);
        })
    }, [id]);

    function inputHeader(text){
        return (
            <h2 className="text-xl mt-5 ml-2 text-gold text-semibold">{text}</h2>
        );
    }

    function inputPara(text){
        return (
            <p className="text-sm text-gray-500 mt-1 ml-2">{text}</p>
        );
    }

    function preInput(header, para){
        return(
            <>
                {inputHeader(header)}
                {inputPara(para)}
            </>
        );
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title, location, description,
            addedPicture, features, extraInfo,
            moveIn, lease, maxStudents, rent
        };
        if (id) {
            // update
            await axios.put('/places', { id, ...placeData });
            setRedirect(true);
        } else {
            // new
            await axios.post('/places', placeData);
            setRedirect(true);
        }

    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return(
        <div className="mt-2 -mb-1">
            <AccountNav />
            <form onSubmit={savePlace}>

                {preInput('Title', 'Add title for your accomodation ad posting.')}
                <input
                    type="text"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                    placeholder=" Add Title" />

                {preInput('Location', '*NOTE: DO NOT put exact location, put the area where the accomodation is located. You can give location to people after they booked an appointment with you.')}
                <input
                    type="text"
                    value={location}
                    onChange={ev => setLocation(ev.target.value)}
                    placeholder="Add location" />

                {preInput('Pictures', 'More = better, also give accurate representation of the place in these pictures.')}
                <PhotosUploader addedPicture={addedPicture} onChange={setAddedPicture}/>

                {preInput('Description', 'Give in detail description of your accomodation.')}
                <textarea value={description}
                onChange={ev => setDescription(ev.target.value)}
                placeholder="Add Description" />

                {preInput('Features', 'Select all features your place has.')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
                    <Features selected={features} onChange={setFeatures} />
                </div>

                {preInput('Extra Information', 'Give extra important information either about place or viewing appointments. Ex. Laundry once a week on fixed days, viewings only on weekends from 12pm - 3pm, etc.')}
                <textarea
                    value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}
                    placeholder=" Add Extra Info." />

                {preInput('Move-In Date, Lease Period, Number of Students, & Rent', 'Mention what is your preferred move-in date?; The minimum lease period the tenant has to sign, How many students can live in your accomodation posting?; & Rent per month')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div className="mt-2 -mb-1">
                        <h3 className="ml-2 text-gold">Move-In Date</h3>
                        <input
                            type="date"
                            value={moveIn}
                            onChange={ev => setMoveIn(ev.target.value)} />
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3 className="ml-2 text-gold">Lease Period</h3>
                        <input
                            type="text"
                            value={lease}
                            onChange={ev => setLease(ev.target.value)}
                            placeholder="Ex. 1 year / 6 months"/>
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3 className="ml-2 text-gold">Max. # of Students</h3>
                        <input
                            type="number"
                            value={maxStudents}
                            onChange={ev => setMaxStudents(ev.target.value)} />
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3 className="ml-2 text-gold">Rent per Month</h3>
                        <input
                            type="number"
                            value={rent}
                            onChange={ev => setRent(ev.target.value)} />
                    </div>
                </div>
                <button className="primary my-4 text-gold">Post Ad</button>
            </form>
        </div>
);
}