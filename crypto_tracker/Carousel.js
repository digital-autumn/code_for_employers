import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../../configs/api";
import { CryptoState } from "../../context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

//43:22
const useStyles = makeStyles((theme) => ({
   carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
   },
   carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
      fontFamily: 'Montserrat',
   },
}));


const item_responsiveness = {
   0: {
      items: 2,
   },
   512: {
      items: 4,
   },
};

export function addCommas (price) {
   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
   const style = useStyles();
   const [ trending, setTrending ] = useState([]);
   const { currency, symbol } = CryptoState();

   const getTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));

      setTrending(data);
   };

   console.log(trending);

   useEffect(() => {
      getTrendingCoins();
   }, [currency]);

   const items = trending.map((coin) => {
      let profit = coin.price_change_percentage_24h >= 0;
      
      return (
         <Link  className={style.carouselItem} to={`/coins/${coin.id}`}>
            <img
               src={coin?.image}
               alt={coin.name}
               height="80"
               style={{ marginBottom: 10 }}
            />
            <span>
               {coin?.symbol}
                  &nbsp;
                  <span
                     style={{
                        color: profit > 0 ? "green" : "red",
                        fontWeight: 500,
                     }}
                  >
                     {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
            </span>

            <span style={{ fontSize: 22, fontWeight: 500 }}>
               {symbol} {addCommas(coin?.current_price.toFixed(2))}
            </span>
         </Link>
      )
   });

   return (
      <div className={style.carousel}>
         <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={3000}
            animationDuration={2000}
            disableDotsControls
            disableButtonsControls
            responsive={item_responsiveness}
            autoPlay
            items={items}
         />
      </div>
   );
};

export default Carousel;