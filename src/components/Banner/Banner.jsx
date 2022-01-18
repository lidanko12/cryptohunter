import { Container, makeStyles, Typography } from '@material-ui/core'
import React,{Suspense} from 'react'
import Loader from '../Loader'
const Carousel = React.lazy(()=>import('../Carousel'))


const useStyles= makeStyles(()=>({
 banner:{
     backgroundImage:"url(./banner2.webp)"
 },
 bannerContent:{
     height:400,
     display:"flex",
     flexDirection:"column",
     paddingTop:25,
     justifyContent:"space-around",
 },
 tagline:{
    display:'flex',
    height:'40%',
    flexDirection:'column',
    justifyContent:'center',
    textAlign:'center',
 },
}))
const Banner = () => {
    const classes=useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
            <Typography variant='h2'
                    style={{
                        fontFamily:"Montserrat",
                        fontWeight:'bold',
                        marginBottom:15,
                    }}>Crypto Informer</Typography>
                    
        </div>
        <Suspense fallback={<Loader/>}>
        <Carousel/>
        </Suspense>
            </Container>
        </div>
    )
}

export default Banner
