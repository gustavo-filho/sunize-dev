import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import './refund-page-fonts.css'

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1200,
            lg: 1400,
            xl: 1700,
        },
    },
});

export const useStyles = makeStyles(() => ({
    root: {
        background: '#0e1943',
        height: '100vh',
        margin: '0 auto',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1',
        justifyContent: 'center',
    },
    imgLogo: {
        [theme.breakpoints.up('lg')]: {
            width: '385px',
            margin: '0 auto',
            paddingTop: '40px',
            display: 'block',
        },
        [theme.breakpoints.up('xl')]: {
            width: '385px',
            margin: '0 auto',
            paddingTop: '40px',
            display: 'block',
        },
    },
    typography1: {
        [theme.breakpoints.up('lg')]: {
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '30px',
            marginBottom: '20px',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('xl')]: {
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '35px',
            marginBottom: '15px',
            color: '#FFFFFF'
        },
    },
    typography2: {
        [theme.breakpoints.up('lg')]: {
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '1.1rem',
            marginBottom: '10px',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('xl')]: {
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '1.1rem',
            marginBottom: '10px',
            color: '#FFFFFF'
        },
    },
    typography3: {
        [theme.breakpoints.up('lg')]: {
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '1.3rem',
            marginBottom: '10px',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('xl')]: {
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '1.3rem',
            marginBottom: '10px',
            color: '#FFFFFF'
        },
    },
    typography4: {
        [theme.breakpoints.up('lg')]: {
            alignItems: 'left',
            display: 'inline-block',
            textAlign: 'left',
            marginTop: '25px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '1.3rem',
            marginBottom: '10px',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('xl')]: {
            alignItems: 'left',
            textAlign: 'left',
            display: 'inline-block',
            marginTop: '25px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '1.3rem',
            marginBottom: '10px',
            color: '#FFFFFF'
        },
    },
    box: {
        [theme.breakpoints.up('lg')]: {
            width: '800px',
            paddingLeft: '15px',
            paddingTop: '20px',
            height: '400px',
            alignItems: 'center',
            margin: '0 auto',
            marginTop: '25px',
            textAlign: 'center',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '1.1rem',
            border: '1px solid #040D2A',
            backgroundColor: '#040D2A',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('xl')]: {
            width: '800px',
            paddingLeft: '15px',
            paddingTop: '20px',
            height: '400px',
            alignItems: 'center',
            margin: '0 auto',
            marginTop: '25px',
            textAlign: 'center',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '1.1rem',
            border: '1px solid #040D2A',
            backgroundColor: '#040D2A',
            color: '#FFFFFF'
        },
    },
    textArea: {
        width: '70%',
        float: 'none',
        alignItems: 'center',
        boxSizing: 'border-box',
        border: '2px solid #434248',
        borderRadius: '4px',
        fontSize: '19px',
        background: '#010515',
        backgroundPosition: '10px 10px', 
        backgroundRepeat: 'no-repeat',
        padding: '12px 20px 12px 10px',
    },
    buttonNext: {
        backgroundColor: '#df8b2b',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '15px 2px',
        cursor: 'pointer',
        opacity: '0.8',
        transition: '0.3s',
        '&:hover': {
            opacity: '1',
        }
    },
    linkText: {
        [theme.breakpoints.up('lg')]: {
            marginLeft: '222px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            color: '#C27C2C'
        },
        [theme.breakpoints.up('xl')]: {
            marginLeft: '222px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            color: '#C27C2C'
        },
    },
}));