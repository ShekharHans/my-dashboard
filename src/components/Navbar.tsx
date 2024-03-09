
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import Logo from "../assets/react.svg"


export default function Navbar() {
    return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>

            <AppBar position="static" color="primary" enableColorOnDark>
                <Toolbar>

                    <div>
                        <a href="/" className='flex gap-4'>
                            <img src={Logo} alt="" />
                            <h1 className='hidden font-heading text-2xl font-semibold sm:inline-block'>Your Company</h1>
                        </a>
                    </div>
                </Toolbar>
            </AppBar>

        </Stack>
    );
}