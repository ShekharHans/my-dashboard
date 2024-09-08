
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import Logo from "../assets/logo.png"


export default function Navbar() {
    return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>

            <AppBar position="static" className='bg-indigo-500' sx={{ '&.MuiAppBar-root': { backgroundColor: '#525f65 !important' } }} enableColorOnDark>
                <Toolbar>

                    <div>
                        <a href="/" className='flex gap-4'>
                            {/* <img src={Logo} alt="" width={30} height={30} /> */}
                            <h1 className='hidden font-heading text-2xl font-semibold sm:inline-block'>POWER VISION</h1>
                        </a>
                    </div>
                </Toolbar>
            </AppBar>

        </Stack>
    );
}