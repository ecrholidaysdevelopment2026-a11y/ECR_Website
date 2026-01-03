import React from 'react'
import DestinationsChennai from './DestinationsChennai'
import TrendingSeason from './TrendingSeason'
import LuxuryBegins from './LuxuryBegins'

const Destination = () => {
    return (
        <div className="px-3 md:px-30">
            <DestinationsChennai />
            <TrendingSeason />
            <LuxuryBegins />
        </div>

    )
}

export default Destination