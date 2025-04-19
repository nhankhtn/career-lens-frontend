"use client";

import type React from "react";

import { useCallback, useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreIcon from "@mui/icons-material/MoreVert";
import { paths } from "@/paths";
import Link from "next/link";
import RowStack from "@/components/row-stack";
import { getNavConfig } from "./get-nav-config";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth/firebase-context";

interface TopNavProps {}

const TopNav = ({}: TopNavProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const configNav = useMemo(() => getNavConfig(), []);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  }, [setAnchorEl, setMobileMoreAnchorEl]);

  const handleMobileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    },
    [setMobileMoreAnchorEl]
  );

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  console.log("user", user);
  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar>
        <Link href={paths.dashboard}>
          <Box
            component={"img"}
            src='/images/logo-transparent.png'
            width={120}
            height={48}
            sx={{
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </Link>
        <RowStack sx={{ flexGrow: 1 }} gap={2} justifyContent={"center"}>
          {configNav.map(({ title, href }, index) => (
            <Stack
              key={index}
              onClick={() => router.push(href)}
              sx={{
                cursor: "pointer",
              }}
            >
              <Typography>{title}</Typography>
            </Stack>
          ))}
        </RowStack>
        {user?.email ? (
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size='large'
              aria-label='show 4 new notifications'
              color='inherit'
            >
              <Badge badgeContent={4} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            </IconButton>
          </Box>
        ) : (
          <RowStack>
            <Button
              variant='contained'
              onClick={() => router.push(paths.auth.login)}
            >
              Đăng nhập
            </Button>
          </RowStack>
        )}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size='large'
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='inherit'
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Hồ sơ</MenuItem>
        <MenuItem onClick={handleMenuClose}>Tài khoản</MenuItem>
        <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default TopNav;
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMobileMenuOpen}
//       onClose={() => setMobileMoreAnchorEl(null)}
//     >
//       <MenuItem>
//         <IconButton
//           size='large'
//           aria-label='show 4 new notifications'
//           color='inherit'
//         >
//           <Badge badgeContent={4} color='error'>
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Thông báo</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton size='large' aria-label='settings' color='inherit'>
//           <SettingsIcon />
//         </IconButton>
//         <p>Cài đặt</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size='large'
//           aria-label='account of current user'
//           aria-controls='primary-search-account-menu'
//           aria-haspopup='true'
//           color='inherit'
//         >
//           <AccountCircleIcon />
//         </IconButton>
//         <p>Hồ sơ</p>
//       </MenuItem>
//     </Menu>
//   );
