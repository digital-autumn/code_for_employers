import * as converter from 'json-2-csv';
import * as url from '../bin/urls.js';
import * as consts_vars from '../env/constants.js'; 
import * as env_creds from '../env/env_creds.js';
import base64 from 'base-64';
import fs from 'fs';

const getData = async (url) => {

  const auth = `Basic ${base64.encode(`${env_creds.API_USERNAME}:${env_creds.API_KEY}`)}`;
  //console.log(auth);
  
  try {
    const response = await fetch(url, 
      {
        headers: {
          "Authorization": auth,
          "Content-Type": "application/json"
        }
      });

      data = await response.json();
      console.log(data);
      
      return data;

  } catch (error) {
    console.error(error);
  }
};

export const shopify_formatter = () => {
  
  const prods = getData(url.all_prods);
  const styles = getData(url.all_styles);
  const style_map = styles_map(styles);

  const formatted_data = [];

  prods.map((e) => {

    const Handle = add_hyphens(style_map[e.styleID].title);
    const Title = style_map[e.styleID].title;
    const BrandName = e.brandName;
    const Body = style_map[e.styleID].description;
    const Vendor = consts_vars.VENDOR_NAME;
    const ProductCategory = "Apparel & Accessories"+" > "+"Clothing Accessories"+" > "+style_map[e.styleID].baseCategory;
    const Option1Name = e.color1;
    const Option1Value = e.colorName;
    const Published = 'true';
    const Variant_SKU = e.sku;
    const Variant_Weight = Math.trunc(e.unitWeight * 1000);
    const Variant_Price = Math.trunc(((e.piecePrice * .50) + e.piecePrice) + 8) + .99;
    const Variant_Weight_Unit = 'g';
    const Variant_Inventory = e.qty;
    const Variant_Inventory_Policy = 'deny';
    const Variant_Image = url.activewear_web+set_image(e);
    const Status = 'active';

    formatted_data.push({
      Handle,
      Title,
      BrandName,
      Body,
      Vendor,
      ProductCategory,
      Option1Name,
      Option1Value,
      Published,
      Variant_Price,
      Variant_SKU,
      Variant_Weight,
      Variant_Weight_Unit,
      Variant_Inventory,
      Variant_Inventory_Policy,
      Variant_Image,
      Status
    });
  });

  fs.writeFile('Products.csv', converter.json2csv(formatted_data), (err) => {
    if (err) throw err;
  });
};

const add_hyphens = (str) => { return str.trim().replace(/\s+/g,'-').toLowerCase(); };

const set_image = (obj) => {
  let image_src = "";

  if (obj.colorFrontImage !== "") image_src = obj.colorFrontImage;

  else if (obj.colorBackImage !== "") image_src = obj.colorBackImage;

  else if (obj.colorSideImage !== "") image_src = obj.colorSideImage;
  
  else if (obj.colorDirectSideImage !== "") image_src = obj.colorDirectSideImage;

  else if (obj.colorOnModelFrontImage !== "") image_src = obj.colorOnModelFrontImage;

  else if (obj.colorOnModelSideImage !== "") image_src = obj.colorOnModelSideImage;

  else if (obj.colorOnModelBackImage !== "") image_src = obj.colorOnModelBackImage;

  return image_src;
};

const styles_map = (arr) => {
  const sMap = {};

  arr.map((e) => {
    sMap[e.styleID] = e;
  });

  return sMap;
};

