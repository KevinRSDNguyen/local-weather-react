export const createWeatherObj = (oldObj, data) => {
  const updatedWeatherData = {...oldObj};
  updatedWeatherData.location = data.name;
  updatedWeatherData.temperature = data.main.temp;
  updatedWeatherData.conditions = data.weather[0].main;
  updatedWeatherData.icon = data.weather[0].icon;
  return updatedWeatherData;
};