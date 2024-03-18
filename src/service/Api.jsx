import axios from 'axios';

const API_KEY = 'caf88261c9fc5a5cc139d0adf90db32c';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    throw new Error('City not found');
  }
};
