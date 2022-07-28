import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import './loading-page-fonts.css'

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
        height: '100vh',
        background: '#0e1943'
    },
    imgLogo: {
        [theme.breakpoints.up('xs')]: {
            width: '200px',
            marginTop: '60px',
            marginLeft: '80px'
        },
        [theme.breakpoints.up('sm')]: {
            width: '300px',
            marginTop: '130px',
            marginLeft: '30px'
        },
        [theme.breakpoints.up('md')]: {
            width: '300px',
            marginTop: '130px',
            marginLeft: '30px'
        },
        [theme.breakpoints.up('lg')]: {
            width: '485px',
            marginTop: '130px',
            marginLeft: '90px'
        },
        [theme.breakpoints.up('xl')]: {
            width: '485px',
            marginTop: '130px',
            marginLeft: '90px'
        },
    },
    typography1: {
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '45px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '30px',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '47px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '44px',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '72px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '34px',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '127px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '60px',
            color: '#FFFFFF'
        },
        [theme.breakpoints.up('xl')]: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '127px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '70px',
            color: '#FFFFFF'
        },
    },
    typography2: {
        [theme.breakpoints.up('xs')]: {
            marginLeft: '48px',
            marginTop: '34px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '22px',
            color: '#FFFFFF',
            marginBottom: '45px',
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '53px',
            marginTop: '34px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '19px',
            color: '#FFFFFF',
            marginBottom: '45px',
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: '70px',
            marginTop: '34px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '19px',
            color: '#FFFFFF',
            marginBottom: '45px',
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: '150px',
            marginTop: '34px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '22px',
            color: '#FFFFFF',
            marginBottom: '45px',
        },
        [theme.breakpoints.up('xl')]: {
            marginLeft: '132px',
            marginTop: '34px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '25px',
            color: '#FFFFFF',
            marginBottom: '45px',
        },
    },
    linkText: {
        [theme.breakpoints.up('xs')]: {
            marginLeft: '51px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            color: '#C27C2C'
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '85px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '18px',
            color: '#C27C2C'
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: '76px',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '18px',
            color: '#C27C2C'
        },
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
    divImageRight: {
        [theme.breakpoints.up('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            marginTop: '-40px'
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            marginLeft: '68px',
            marginTop: '-124px'
        },
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            marginLeft: '38px',
            marginTop: '-125px'
        },
        [theme.breakpoints.up('xl')]: {
            display: 'flex',
            marginLeft: '274px',
            marginTop: '-124px'
        },
    }
}));