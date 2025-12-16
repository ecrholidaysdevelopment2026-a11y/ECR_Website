import React from 'react'
import DestinationsChennai from './DestinationsChennai'
import DestinationsPudhucherry from './DestinationsPudhucherry'
import TrendingSeason from './TrendingSeason'
import LuxuryBegins from './LuxuryBegins'

const Destination = () => {
    return (
        <div className="px-3 md:px-30">
            <DestinationsChennai />
            <DestinationsPudhucherry />
            <TrendingSeason />
            <LuxuryBegins />
        </div>

    )
}

export default Destination