import * as cheerio from 'cheerio';
import * as converter from 'json-2-csv';
import fs from 'fs';

export const getData = async (url) => {

   const data = [];
   
   const response = await fetch(url);
   const body = await response.text();
   
   const $ = cheerio.load(body);
   
   $('li.product_wrapper').each((i, e) => {

      const specs = $(e).find('div.h2').text().replace('\n', ' ').trim().split(';');  
      const sku = $(e).find('p.sku').text().replace('SKU:', '').trim();
      const price = (($(e).find('div.price').text().trim()).substring(0, 9)).replace(/[^\d.-]/g, '');
      const inStock = $(e).find('div.stock').text().trim();

      const [ name, cpu, gpu, ram, storage ] = specs;

      data.push({
         name,
         cpu,
         gpu,
         ram,
         storage,
         sku,
         price,
         inStock,
      });
   });

   fs.appendFile('e_commerce.json', JSON.stringify(data), (err) => {
      if (err) throw err;
   });

   const csv = converter.json2csv(data);
   console.log(csv);
};


