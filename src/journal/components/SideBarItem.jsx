import { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({tittle, body, id, date, imgURLs = []}) => {

    const dispatch = useDispatch()

    const newTittle = useMemo(() => {
        return (tittle.length > 17)
                ? tittle.substring(0,17) + '...'
                : tittle
    }, [tittle]);

    const onClickNote = () => {
        dispatch( setActiveNote({tittle, body, id, date, imgURLs}) )
    }

  return (
    <ListItem disablePadding>
    <ListItemButton
        onClick={ onClickNote }
    >

        <ListItemIcon>
            <TurnedInNot />
        </ListItemIcon>

            <Grid container>
                <ListItemText primary={ newTittle } />
                <ListItemText secondary={ body } />
            </Grid>

        </ListItemButton>
    </ListItem>  
)
}
