import { NativeModules } from 'react-native';
import { baseUrlPlaces, radius, apiKey } from '../utils/URLConstants';
import { getMethod } from './APIHandler';
const {MyLocation} = NativeModules;
const TAG = 'APIUtils';

const getNearestPlaces = (keyWord, type, response) => {
    MyLocation.getLatLng((gps) => {
        const url = `${baseUrlPlaces}/nearbysearch/json?location=${
            gps.latitude},${gps.longitude}&radius=${radius}&types=${type}&keyword=${keyWord.toUpperCase()}&key=${apiKey}`;
            console.log(TAG, 'url ', url);
           fetch(url)
          .then(response => response.json())
          .then(responseJson => {
            // console.log(TAG, 'suman fetchRestaurants', responseJson.results)
            response({
                code: 200,
                error: '',
                data: responseJson.results
            });
          })
          .catch(e => {
              /// console.log('suman error ', e);
              response({
                  code: 404,
                  error: e,
                  data:[],
              });
            }); 
    });
}

export {
    getNearestPlaces,
};
