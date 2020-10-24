#! /usr/bin/env node

require("dotenv/config");
const axios = require("axios");

async function getWeather() {
    const [arguments] = process.argv.splice(2, process.argv.length - 1);

    const response = await axios.get(
        `https://api.hgbrasil.com/weather?key=${process.env.KEY}`
    );

    const { description, city_name } = response.data.results;
    const [day] = response.data.results.forecast;

    console.log(
        `A mínima para hoje é de ${day.min}° C e a máxima é de ${
            day.max
        }° C em ${city_name} e podem haver ${day.description.toLowerCase()}`
    );
}

getWeather();
