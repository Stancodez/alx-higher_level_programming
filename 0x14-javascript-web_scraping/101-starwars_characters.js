#!/usr/bin/node

const request = require('request');
const id = process.argv[2];

if (!id) {
  console.error('Usage: ./script.js <film_id>');
  process.exit(1);
}

const url = `https://swapi-api.alx-tools.com/api/films/${id}`;

request.get(url, (error, response, body) => {
  if (error) {
    console.error('Error fetching film:', error);
    return;
  }
  if (response.statusCode !== 200) {
    console.error(`Failed to fetch film. Status code: ${response.statusCode}`);
    return;
  }

  let content;
  try {
    content = JSON.parse(body);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return;
  }

  const characters = content.characters;
  // console.log(characters);
  characters.forEach(character => {
    request.get(character, (error, response, body) => {
      if (error) {
        console.error('Error fetching character:', error);
        return;
      }
      if (response.statusCode !== 200) {
        console.error(`Failed to fetch character. Status code: ${response.statusCode}`);
        return;
      }

      let characterData;
      try {
        characterData = JSON.parse(body);
      } catch (e) {
        console.error('Error parsing character JSON:', e);
        return;
      }

      console.log(characterData.name);
    });
  });
});

