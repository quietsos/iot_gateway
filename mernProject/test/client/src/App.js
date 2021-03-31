import React from 'react';
import { Container, AppBar, Typography, Grow,Grid} from '@material-ui/core';

import memories from './images/memories.jpg';


import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import useStyles from './styles';



const App= () =>{
    const classes = useStyles();
    return(

        // <div>
        //     <h1>This is an App</h1>
        // </div>

        <Container maxWidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Memories</Typography>
                <img  src={memories} alt="memories" height="200" />

            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={10}>
                            <Grid item xs={12} sm={7}>
                                <Posts />
                                 

                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Form />
                                 
                            </Grid>
                    </Grid>
                </Container>
            </Grow>

        </Container>
    )
}


export default App;