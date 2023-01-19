import { useCallback, useContext, useState } from "react"
import StationService from '../services/Dashboard/StationService';
import { useNavigate } from "react-router-dom";
import StationContext from "../context/StationsContext";
import { toast } from "react-toastify";

export function useStations() {
    const navigate = useNavigate();
    const { stations, setStations } = useContext(StationContext);
    const [oneStation, setOneStation] = useState({});


    const useOneStation = useCallback((slug) => {
        const station_tmp = stations.filter(item => item.slug === slug);
        if (station_tmp.length === 1) {
            setOneStation(station_tmp[0]);
        } else {
            StationService.GetStation(slug).
                then(({ data, status }) => {
                    if (status === 200) {
                        setOneStation(data);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useDeleteStation = (slug) => {
        StationService.DeleteStation(slug)
            .then(res => {
                if (res.status === 200) {
                    toast.success(`Station ${slug} deleted`);
                };
            })
            .catch(e => console.error(e));
    }

    const useCreateStation = useCallback(data => {
        StationService.CreateStations(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    toast.success('Station created');
                    navigate('/dashboard/stations');
                    setStations([...stations, data]);
                }
            })
            .catch(e => console.error(e));
    }, []);

    const useUpdateStation = useCallback((slug, data) => {
        StationService.UpdateStation(slug, data)
            .then(({ data, status }) => {
                if (status === 200) {
                    let old_stations = [...stations];
                    const index = old_stations.findIndex(item => item.slug === slug);
                    if (index !== -1) {
                        old_stations[index] = data;
                        setStations(old_stations);
                    }
                    toast.success(`Station ${slug} updated`);
                    navigate('/dashboard/stations');
                }
            })
            .catch(e => console.error(e));
    }, []);

    return { stations, setStations, oneStation, setOneStation, useDeleteStation, useCreateStation, useUpdateStation, useOneStation };
}