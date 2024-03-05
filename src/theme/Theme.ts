import { createTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const theme = createTheme({
    components: {
        // Name of the component
        MuiSelect: {
            defaultProps: {
                IconComponent: ExpandMoreIcon,
                //there are tons of props that you can override
            },
            styleOverrides: {
                root: {
                    "& .selected": {
                        backgroundColor: "red",
                        "&:hover": {
                            backgroundColor: "green"
                        }
                    },
                },
            },
        },
    }
});


export { theme };