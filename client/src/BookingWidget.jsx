import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {
    const [viewing, setViewing] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    async function bookViewing(){
        const response = await axios.post('/viewings', {
            place: place._id,
            viewing, name, email, phone
        });
        const bookingId = response.data._id;
        setRedirect(`/account/viewings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return(
        <div className="bg-white shadow p-4 rounded-2xl shadow shadow-gray-500 mt-6">
            <div className="text-gold text-xl text-center">
                <span className="font-semibold">Rent per month: </span>
                <span className="font-bold">${place.rent}</span>
            </div>
            <div className="mt-2">
                <label className="text-gold">Book a viewing date: </label>
                <input className="text-primary bg-gray-200" type="date"
                value={viewing} onChange={ev => setViewing(ev.target.value)}/>
            </div>
            {viewing && (
                <div>
                    <div>
                        <label className="text-gold">Name: </label>
                        <input
                            className="text-primary bg-gray-200"
                            type="text"
                            placeholder="Enter your name"
                            value={name} onChange={ev => setName(ev.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gold">Email: </label>
                        <input
                            className="text-primary bg-gray-200"
                            type="text"
                            placeholder="Enter your email"
                            value={email} onChange={ev => setEmail(ev.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gold">Phone Number: </label>
                        <input
                            className="text-primary bg-gray-200"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phone} onChange={ev => setPhone(ev.target.value)}
                        />
                    </div>
                </div>
            )}
            <button onClick={bookViewing} className="primary text-gold">Schedule viewing</button>
        </div>
    );
}