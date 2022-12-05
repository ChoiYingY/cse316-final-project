import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useHistory } from 'react-router-dom';

export default function UserNavbar() {
    const history = useHistory();

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{  backgroundColor: "lightGray" }}>
                
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div item id="container">
                            <Box
                                aria-label="home" id="home-button"
                                sx={{ cursor: 'pointer'}}
                                onClick={ () => {   console.log("jump to home screen");  history.push("/"); } }
                            >
                                <HomeOutlinedIcon
                                    size="large"
                                    fontSize="large"
                                    edge="end"
                                    aria-label="Home Button"
                                    aria-haspopup="true"
                                    sx={{  color: "black"   }}
                                />
                            </Box>

                            <Box
                                aria-label="all list" id="all-list-button"
                                sx={{ cursor: 'pointer'}}
                                onClick={ () => {   console.log("jump to all lists screen");  } }
                            >
                                <GroupsOutlinedIcon
                                    size="large"
                                    fontSize="large"
                                    edge="end"
                                    aria-label="All Lists Button"
                                    aria-haspopup="true"
                                    sx={{  color: "black"   }}
                                />
                            </Box>

                            <Box
                                aria-label="users" id="users-button"
                                sx={{ cursor: 'pointer'}}
                                onClick={ () => {   console.log("jump to users screen");  } }
                            >
                                <PersonOutlineOutlinedIcon
                                    size="large"
                                    fontSize="large"
                                    edge="end"
                                    aria-label="Users Button"
                                    aria-haspopup="true"
                                    sx={{  color: "black"   }}
                                />
                            </Box>
                        </div>

                        <TextField
                            item
                            sx={{   backgroundColor:"white", width: "60%"}}
                            placeholder="Search"
                            inputProps={{
                                style: {
                                fontSize: 15,
                                height: 45,
                                width: 272,
                                padding: '0 14px'
                            }}}
                        />

                        <Box
                            // sx={ btnHoverSx }
                            // onClick={ () => {   console.log("sort by");  } }
                            item
                        >
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Typography item color="black">SORT BY</Typography>
                                </Grid>
                                
                                <Grid item xs={3}>
                                    <Box
                                        aria-label="sort" id="sort-button"
                                        sx={{ cursor: 'pointer'}}
                                        onClick={ () => {   console.log("Choose a sorting");  } }
                                    >
                                        <SortIcon
                                            item
                                            size="large"
                                            fontSize="large"
                                            edge="end"
                                            aria-label="Sorting Button"
                                            aria-haspopup="true"
                                            sx={{  color: "black"}}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                </Toolbar>
            </AppBar>
        </Box>
    );
}