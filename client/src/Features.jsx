import { CIcon } from '@coreui/icons-react';
import { cilBathroom, cilRoom, cilBed, cilSofa, cilShower, cilFridge, cilDoor, cilGarage, cilAnimal, cilSmoke, cilSmokeSlash} from '@coreui/icons';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';

export default function Features({ selected = [], onChange }) {
    function handleCbClick(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange(selected.filter(selectedName => selectedName !== name));
        }
    }


    return(
        <>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('utilities')} name="utilities" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-7 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
                <span className="text-gold">Rent includes Utilities</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('private-room')} name="private-room" onChange={handleCbClick} />
                <CIcon icon={cilRoom} className="ml-2 size-6 text-primary"/>
                <span className="text-gold">Private Room</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('shared-room')} name="shared-room" onChange={handleCbClick} />
                <CIcon icon={cilRoom} className="ml-2 size-6 text-primary"/>
                <span className="text-gold">Shared Room</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('furnished')} name="furnished" onChange={handleCbClick} />
                <CIcon icon={cilBed} className="ml-2 size-8 text-primary"/>
                <span className="text-gold">Furnished Bedroom</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('unfurnished')} name="unfurnished" onChange={handleCbClick} />
                <CIcon icon={cilSofa} className="ml-2 size-10 text-primary"/>
                <span className="text-gold">Unfurnished / Partially furnished Bedroom</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('private-bath')} name="private-bath" onChange={handleCbClick} />
                <CIcon icon={cilBathroom} className="ml-2 size-7 text-primary"/>
                <span className="text-gold">Private Bathroom</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('shared-bath')} name="shared-bath" onChange={handleCbClick} />
                <CIcon icon={cilShower} className="ml-2 size-8 text-primary"/>
                <span className="text-gold">Shared Bathroom</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('laundry')} name="laundry" onChange={handleCbClick} />
                <LocalLaundryServiceOutlinedIcon fontSize="large" className="ml-2 text-primary"/>
                <span className="text-gold">Laundry Unit (Washer / Washer + Dryer)</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('utensils')} name="utensils" onChange={handleCbClick} />
                <CIcon icon={cilFridge} className="ml-2 size-8 text-primary"/>
                <span className="text-gold">Kitchen Utensils Included</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-7 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span className="text-gold">Wifi Available</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick} />
                <CIcon icon={cilDoor} className="ml-2 size-8 text-primary"/>
                <span className="text-gold">Private Entrance</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('garage-parking')} name="garage-parking" onChange={handleCbClick} />
                <CIcon icon={cilGarage} className="ml-2 size-7 text-primary"/>
                <span className="text-gold">Garage Parking</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('street-parking')} name="street-parking" onChange={handleCbClick} />
                <LocalParkingOutlinedIcon fontSize="medium" className="ml-2 text-primary"/>
                <span className="text-gold">Street Parking</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('smoking')} name="smoking" onChange={handleCbClick} />
                <CIcon icon={cilSmoke} className="ml-2 size-8 text-primary"/>
                <span className="text-gold">Smoking Allowed</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('no-smoke')} name="no-smoke" onChange={handleCbClick} />
                <CIcon icon={cilSmokeSlash} className="ml-2 size-7 text-primary"/>
                <span className="text-gold">No Smoking</span>
                </label>
            <label className="border border-gray-400 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('pets')} name="pets"  onChange={handleCbClick} />
                <CIcon icon={cilAnimal} className="ml-2 size-8 text-primary"/>
                <span className="text-gold">Pets Allowed</span>
            </label>
        </>
    );

}