const axios = require('axios')
const { google_key } = require('../config/vars')

exports.placeSearch = async () => {
  const latitude = 13.823486
  const longitude = 100.5050304
  const radius = 400
  const url = 'https://maps.googleapis.com' + '/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=restaurant&key=' + `${[google_key]}`
  const response = await axios({
    url,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.status === 200) {
    return { code: 0, data: resultsFormat(response.data.results) };
  }
  return { code: 999, data: response.data };
};

const resultsFormat = (res) => {
  let sdata = {}
  const response = []
  for (let i = 0; i < res.length; i++) {
    sdata = {
      restaurant: res[i].name,
      rating: res[i].rating || 1,
      vicinity: res[i].vicinity,
      images: res[i].icon,
      icon_mask_base_uri: res[i].icon_mask_base_uri,
      location: res[i].geometry.location
    }
    response.push(sdata)
  }
  return response
}