import { Container, makeStyles, Typography } 
	from "@material-ui/core";
import React from "react";
import { web_site_name, web_site_greeting } from "../../constants/text";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
   banner: {
      backgroundColor: '#5f0f40',
		minHeight: '10vh',
   },
	bannerContent: {
		height: 400,
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 25,
		justifyContent: 'space-around',
	},
	tagline: {
		display: 'flex',
		height: '40%',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
	},
}));

const Banner = () => {
   const bannerStyle = useStyles();

   return (
     <div className={bannerStyle.banner}>
      <Container className={bannerStyle.bannerContent}>
			<div className={bannerStyle.tagline}>
				<Typography
					variant="h2"
					style={{
						color: 'white',
						fontweight: 'bold',
						marginBottom: 15,
						fontFamily: 'Montserrat',
					}}
				>
					{web_site_name}
				</Typography>
				<Typography
					variant="subtitle2"
					style={{
						color: 'white',
						textTransform: 'capitalize',
						fontFamily: 'Montserrat',
					}}
				>
					{web_site_greeting}
				</Typography>
			</div>
			<Carousel />
      </Container>
     </div>
   );
};

export default Banner;