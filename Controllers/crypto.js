const axios = require('axios');

const CoinHistory = (req,res)=>{
  const {id} = req.params
  const {currency,from,to} = req.query

  console.log(id, currency, from, to)
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}`;
    axios.get(url, {
        headers: {
            'X-CoinAPI-Key': 'CG-5jHBqEZPddjRm4k34yJnWBCq'
        }
    })
    .then(response => {
    res.json(response.data);
    })
    .catch(error => {
    res.send(error.message);
    });
}

module.exports = {CoinHistory}