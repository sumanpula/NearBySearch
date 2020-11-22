import { NativeModules } from 'react-native';
import { baseUrlPlaces, radius, apiKey } from '../utils/URLConstants';
import { getMethod } from './APIHandler';
const {MyLocation} = NativeModules;
const TAG = 'APIUtils';

const getNearestPlaces = (keyWord, type, response) => {
    MyLocation.getLatLng((gps) => {
        const url = `${baseUrlPlaces}/nearbysearch/json?location=${
            gps.latitude},${gps.longitude}&radius=${radius}&types=${type}&keyword=${keyWord.toUpperCase()}&key=${apiKey}`;
            // console.log(TAG, 'suman url ', url);
           fetch(url)
          .then((response) => response.json())
          .then(responseJson => {
            // console.log(TAG, 'suman fetchRestaurants', responseJson)
            if (responseJson.results.length <= 0) {
                // console.log(TAG, 'suman message', responseJson.error_message) 
                // console.log(TAG, 'suman status', responseJson.status) 
                // console.log(TAG, 'suman results', responseJson.results) 
                response({
                    code: 200,
                    error: responseJson.status,
                    data: []
                });
            } else {
                response({
                    code: 200,
                    error: '',
                    data: responseJson.results
                });
            }
          })
          .catch(e => {
             // console.log('suman error ', e.message);
              response({
                  code: 404,
                  error: e.message,
                  data:[],
              });
            }); 
    });
}

const getData = () => {
    console.log('suman hello')
}

const getInfo = (place_id, response, ...types) => {
    // console.log('suman types ', types)
    const url = `${baseUrlPlaces}/details/json?place_id=${
        place_id}&fields=${types}&key=${apiKey}`;
        console.log(TAG, 'suman url ', url);
       fetch(url)
      .then((response) => response.json())
      .then(responseJson => {
        // console.log(TAG, 'suman getInfo', responseJson)
        if (responseJson.result.length <= 0) {
            // console.log(TAG, 'suman message', responseJson.error_message) 
            // console.log(TAG, 'suman status', responseJson.status) 
            // console.log(TAG, 'suman results', responseJson.results) 
            response({
                code: 200,
                error: responseJson.status,
                data: []
            });
        } else {
            response({
                code: 200,
                error: '',
                data: responseJson.result
            });
        }
      })
      .catch(e => {
         console.log('suman error ', e.message);
          response({
              code: 404,
              error: e.message,
              data:[],
          });
        });  
}

export {
    getNearestPlaces,
    getInfo,
    getData,
};
