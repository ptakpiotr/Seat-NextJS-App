export const Constants = {
  urls: {
    weatherApi:
      "https://api.open-meteo.com/v1/forecast?latitude=50.0614&longitude=19.9366&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=4&past_days=1",
  },
} as const;
