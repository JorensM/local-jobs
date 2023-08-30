import { useContext } from 'react'
import { PlacesContext } from '../state/PlacesContext'

const endpoint = {
    place_details: (place_id: string) => 
        "https://maps.googleapis.com/maps/api" + 
        "/place/details/output?json&place_id=" + place_id
}

export default function usePlacesAPI() {

    const placesAPI = useContext(PlacesContext)

    const getPlaceByID = (place_id: string) => {
        return new Promise<string>((resolve, reject) => {

            const geocoder = new placesAPI.Geocoder()

            console.log(geocoder)

            geocoder.geocode({
                placeId: place_id
            })
            .then((res: any) => resolve(res.results[0].formatted_address))  
            .catch(console.error)
        })
    }

    return { getPlaceByID }
}