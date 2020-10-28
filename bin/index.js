#! /usr/bin/env node

require("dotenv/config");

const axios = require("axios");
const { argv } = require("argh");

async function getWeather() {
    const [city] = process.argv.splice(2, process.argv.length - 1);

    const response = await axios.get(
        encodeURI(
            `https://api.hgbrasil.com/weather?key=${process.env.KEY}&city_name=${city}`
        )
    );

    const { city_name } = response.data.results;
    const [today, ...otherDays] = response.data.results.forecast;

    console.log(
        `A mínima para hoje é de ${today.min}° C e a máxima é de ${
            today.max
        }° C em ${city_name} e podem haver ${today.description.toLowerCase()}`
    );

    if (argv.table) {
        const days = [today, ...otherDays].map((day) => ({
            Dia: day.date,
            "Dia da semana": day.weekday,
            Descrição: day.description,
        }));

        console.table(days);
    }
}

getWeather();
