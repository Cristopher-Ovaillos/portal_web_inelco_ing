import { createTheme } from "@mui/material";

// arguments: https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme
export const theme = createTheme({
    //properties de mui
    palette: {
        primary: { main: '#C41D1D', dark: '#8E1414', contrastText: '#FFFFFF' },
        error: { main: '#8E1414' },
        success: { main: '#1E6B3A' },
        warning: { main: '#7A4F00' },
        info: { main: '#1F3A5F' },
        text: { primary: '#1A1A1A', secondary: '#545B64' },
        background: { default: '#F3F5F7', paper: '#FFFFFF' },
    },
    typography: { fontFamily: 'Inter, Helvetica, Arial, sans-serif' },
    shape: { borderRadius: 8 }, //para
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
        },
        MuiOutlinedInput: { styleOverrides: { notchedOutline: { borderColor: '#6B7480' } } },
        MuiTableCell: { styleOverrides: { root: { fontVariantNumeric: 'tabular-nums' } } },
    },

});



