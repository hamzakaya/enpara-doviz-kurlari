const express = require('express');
const axios = require('axios')
const htmlParser = require('node-html-parser');
const app = express();
const PORT = process.env.PORT || 3000


app.get('/', async (_, res) => {

  const html = await axios({
    method: 'get',
    url: 'https://www.qnbfinansbank.enpara.com/hesaplar/doviz-ve-altin-kurlari'
  });
  const getColumns = (x, y) => parseFloat(htmlParser.parse(html.data).querySelector('div.enpara-gold-exchange-rates__table').childNodes[x].childNodes[y].structuredText.match('\\d+,\\d+')[0].replace(',', '.'))


  res.status(200).json({
    alis: {
      dolar: getColumns(3, 2),
      euro: getColumns(5, 2),
      altin: getColumns(7, 2)
    },
    satis: {
      dolar: getColumns(3, 4),
      euro: getColumns(5, 4),
      altin: getColumns(7, 4)
    }
  });


});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))