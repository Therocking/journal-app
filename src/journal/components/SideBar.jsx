import { Box, Divider, Drawer, List,Toolbar, Typography } from '@mui/material'
import {  Person2Outlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth )
    const { notes } = useSelector( state => state.journal )

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent' // temporary
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Person2Outlined color='secondary' sx={{mr: 1} }/>
                 
                <Typography variant='h6' color='secondary' noWrap component='div'>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    (notes.length === 0)
                    ? <Typography variant='h6' color='red' sx={{mt: 2, ml: 2}} > Agrega Una Nota. </Typography>
                    : notes.map( note => (
                        <SideBarItem
                            key={note.id}
                            {...note}
                        />
                    ))
                    
                }
            </List>

        </Drawer>

    </Box>
  )
}
