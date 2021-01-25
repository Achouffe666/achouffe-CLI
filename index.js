#!/usr/bin/env node
const countryList = require('country-list');
const axios = require('axios').default;
const prompts = require('prompts');

console.log('Hello, Node.JS!');

let year = (new Date().getFullYear());
let countryListed = countryList.getNames();

(async () => {
    const response = await prompts({
      type: 'text',
      name: 'country',
      message: 'which country?',
      validate: country => countryListed.includes(country) ?  true : 'please enter a valid country'
    });

    let api_url = `https://date.nager.at/api/v2/PublicHolidays/${year}/${countryList.getCode(response.country)}`; 

        try {
          const response = await axios.get(api_url);
          response.data.forEach(element => {
            console.log(element.date);
            console.log(element.name);
          });

        } catch (error) {
          console.error(error);
        }

  })();


 






