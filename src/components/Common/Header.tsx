import { AppBar, Box, CssBaseline, Link, styled, Typography } from "@mui/material";



const CustomizedAppBar = styled(AppBar)({
  padding: '0',
  boxShadow: 'none',
  backgroundColor: '#F8F7F7',
});

const CustomizedAppBarBox = styled(Box)({
  backgroundColor: '#F8F7F7',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 40px',
});

const CustomizedTypographyImage = styled(Typography)({
  width: '52px',
  height: '52px',
  background: '#F0F0F0',
});
interface NavbarProps {
  appName: string;
  navItems: { label: string; href: string }[];
}
export default function Header({ appName, navItems }: NavbarProps) {

  return (
    
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <CustomizedAppBar
          position="fixed"
          sx={{
            zIndex: (theme: { zIndex: { drawer: number } }) => theme.zIndex.drawer + 1,
          }}
        >
          <CustomizedAppBarBox>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CustomizedTypographyImage />
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#1C1C1C',
                  marginLeft: '24px',
                }}
              >
                {appName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  underline="none"
                  sx={{
                    color: '#1C1C1C',
                    marginLeft: '24px',
                  }}
                >
                  {item.label}
                </Link>
              ))}
           
            </Box>
          </CustomizedAppBarBox>
        </CustomizedAppBar>
      </Box>
    
  );
}
