import axios from 'axios';
const apiKey = '3c2b581a031744038af101917230610';

const foreCastEndPoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=yes&alerts=no`;

const apiCall = async (enpoint) => {
    const options = {
        method: 'GET',
        url: enpoint,
    }
    try {
        const response = await axios(options);
        return response.data;
    }catch(error) {
        console.log('error', error);
        return null;
    }
}

export const fetchWeatherForecast = params => {
    return apiCall(foreCastEndPoint(params));
}
