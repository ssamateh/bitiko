import { Colors } from "@/interface"
import { createTheme, ThemeProvider } from "@mui/material"
import { ReactNode } from "react"

const Theme: React.FC<{ children: ReactNode }> = ({ children }) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: Colors.primaryBg,
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
}

export default Theme