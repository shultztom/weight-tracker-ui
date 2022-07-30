import {set} from 'lodash';

const cmToFeetInches = (height) => {
    const inches = height / 2.54;
    const feet = inches % 12;
    return `${feet};${inches}`;
}

const kgToLbs = (weight) => {
    return weight * 2.20462;
}

export function convertMetricToImperialArr (array) {
    for(let item of array) {
        // Height (cm -> feet, inches)
        const height = cmToFeetInches(item.user?.height);
        set(item, 'user.height', height);

        // Weight (kg -> lbs)
        const lbs = kgToLbs(item.weight);
        set(item, 'weight', lbs);
    }
    return array;
}