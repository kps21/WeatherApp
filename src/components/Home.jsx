import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWeatherData } from "../service/Api";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import weatherIcon from "./weather.png";
import { Input } from "@material-ui/core";

const defaultCities = ["London", "New York", "Tokyo", "Paris", "Sydney"];

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const history = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getWeatherData(city);
      setWeather(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchDataForDefaultCities = async () => {
      const defaultWeatherData = [];
      for (const city of defaultCities) {
        try {
          const data = await getWeatherData(city);
          defaultWeatherData.push({ city, data });
        } catch (error) {
          console.error(
            `Error fetching weather data for ${city}: ${error.message}`
          );
        }
      }
      setWeather(defaultWeatherData);
    };
    fetchDataForDefaultCities();
  }, []);

  return (
    <Container>
      <Typography
        variant="h6"
        style={{ paddingTop: "20px", fontFamily: "montserrat, sans-serif" }}
      >
        This Weather application is used to allow users to search for the
        weather forecast of a specific location.
      </Typography>
      <Grid
        container
        spacing={2}
        justify="flex-start"
        // alignItems="center"
        // style={{ marginTop: "10px" }}
      >
        {weather &&
          weather.map((cityWeather, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                style={{
                  marginTop: "20px",
                  maxWidth: "250px",
                  backgroundColor: "rgb(0 0 0 / 3%)",
                  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CardContent style={{ height: "40vh" }}>
                  <img
                    src={weatherIcon}
                    style={{ maxHeight: "25vh" }}
                    alt="weather icon"
                  />
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      fontFamily: " montserrat, sans-serif",
                    }}
                  >
                    {cityWeather.data?.main?.temp}°C
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ fontFamily: " montserrat, sans-serif" }}
                  >
                    {cityWeather.city}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
