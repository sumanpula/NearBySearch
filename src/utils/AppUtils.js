import {
    RESTAURANTS,
    STORES,
    BARS,
    ESHTABLISHEMENTS,
    HOTELS,
    HOSPITALS,
} from './AppConstants';

import {
    hospitals,
    restaurants,
    hotels,
    stores,
    bars,
    defaultIcon,
} from '../icons';

const getIcon = (type) => {
    switch(type) {
        case RESTAURANTS:
        return restaurants;
        case STORES:
        return stores;
        case BARS:
        return bars;
        case HOSPITALS:
        return hospitals;
        case HOTELS:
        return hotels;
    }
    return defaultIcon;
}

const getType = (type) => {
    switch(type) {
        case RESTAURANTS:
        return RESTAURANTS;
        case STORES:
        return STORES;
        case BARS:
        return BARS;
        case HOSPITALS:
        return HOSPITALS;
        case HOTELS:
        return HOTELS;
    }
    return 'location';
}

export {
    getIcon,
    getType,
};