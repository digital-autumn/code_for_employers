import { AppBar, Container, makeStyles, 
    MenuItem, Select, Toolbar, Typography, ThemeProvider, createTheme } 
    from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CryptoState } from "../context/CryptoContext";
import { GBP, USD } from "../constants/crypto_names";
import { web_site_name } from "../constants/text";

//37:26
const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: 'black',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
}));

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#000',
        },
        type: 'light',
    }
});

const Header = () => {

    const classes = useStyles();

    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState();

    //console.log(currency);

    return(
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography 
                            onClick={() => navigate('/')}
                            className={classes.title}>
                            {web_site_name}
                        </Typography>
                        <Select     
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginLeft: 15,
                                }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >

                            <MenuItem value={USD}>USD</MenuItem>
                            <MenuItem value={GBP}>GBP</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;