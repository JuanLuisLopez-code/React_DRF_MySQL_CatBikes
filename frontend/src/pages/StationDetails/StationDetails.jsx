import React, { useEffect, useState } from "react";
import '../StationsClient/StationsClientList.scss';
import { useParams } from "react-router-dom";
import { useStations } from "../../hooks/useStations";
import { useSlots } from '../../hooks/useSlots';
import goodImage from '../../img/SlotEmpty.png';
import usedImage from '../../img/SlotUsed.png';
import maintenanceImage from '../../img/SlotMaintenance.png';
import { toast } from 'react-toastify'
import { useRent } from "../../hooks/useRent";
import { useNavigate } from "react-router-dom";
import IncidentModal from "../../components/Incidents/IncidentModal";


const StationDetails = () => {
    const { slug } = useParams();
    const { oneStation, useOneStation, slotStation } = useStations();
    const { setSlots } = useSlots();
    const { rentBike, returnBike, getUserRent } = useRent();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalSlot, setModalSlot] = useState(null);


    useEffect(function () {
        useOneStation(slug);
    }, [])

    const clickModal = slot_id => {
        setModalOpen(true);
        setModalSlot(slot_id);
    }

    const rentId = (data) => {
        if (localStorage.getItem("token")) {
            if (data.status == 'used') {
                rentBike(data);
            } else if (data.status == 'unused') {
                returnBike(data);
            }
            else {
                toast.error("This slot is in manteinance, take another one")
            }
        } else {
            toast.error("You must be logged")
            setTimeout(() => {
                navigate("/login")
            }, 1000);
        }
    }

    let SlotCard = null;
    if (slotStation.length > 0) {
        SlotCard = slotStation.map(item => {
            const img = item.status === 'used' ? goodImage : item.status === 'unused' ? usedImage : maintenanceImage;
            return (<div className="card" key={item.id} style={{ backgroundImage: `url(${img})` }}>
                <div className="content">
                    <p className="copy">Slot: {item.status}</p>
                    <button className="btn" onClick={() => {
                        rentId(item)
                    }
                    }>{item.status == "unused" ? (<a>Return Bike</a>) : item.status == "used" ? (<a>Rent Bike</a>) : ("Manteinance")}</button>
                    <button className="btn" onClick={() => clickModal(item.id)}>Open incidence</button>
                </div>
            </div>)
        }
        )
    } else {
        SlotCard = <p>No slots available</p>
    }

    return (
        <div className="stationsClientCard">
            <IncidentModal modalOpen={modalOpen} setModalOpen={setModalOpen} slot_id={modalSlot} />
            <main className="page-content">
                {SlotCard}
            </main>
        </div>
    )
}

export default StationDetails