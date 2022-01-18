import { LinearProgress } from '@material-ui/core'
import { Box } from '@mui/system'
import React from 'react'


const Loader = () => {
    return (
        <Box>
         <LinearProgress style={{
             backgroundColor:'gold'
         }}/>   
        </Box>
    )
}

export default Loader
