import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import cog from '@iconify/icons-eva/settings-2-fill';

// import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton, Modal, Card, Alert } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import {useSelector} from "react-redux"

import {useAuth} from "../../auth/AuthProvider"

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Inicio',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Perfil',
    icon:   personFill,
    linkTo: '/dashboard/ACcoUNt/prOfile'
  },
  /*
  {
    label:  'Settings',
    icon:   settings2Fill,
    linkTo: '#'
  }
  */
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef       = useRef(null);
  const [open, setOpen] = useState(false);
  const [openChangeRole, setOpenChangeRole] = useState(false);

  const userData            = useSelector(state => state.session.userData.data);
  const dashboard           = useSelector(state => state.dashboard);

  let {logout}            = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  }

  const handleCloseModalChangeRole = () => {
    setOpenChangeRole(false);
  }

  const handleShowModalChangeRole = () => {
    setOpenChangeRole(true);
    handleClose();
  }

  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 5),
    width: "95%",
    margin: "auto",
    maxWidth: "600px",
    backgroundColor: "#fff",
  }));

  const roleList = userData.role;
  console.log(roleList);

  return (
    <>
      <Modal
        open={openChangeRole}
        onClose={handleCloseModalChangeRole}
        aria-labelledby="modal-modal-change-role-title"
        aria-describedby="modal-modal-change-role-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <RootStyle>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Seleccione un rol
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 0, color: "text.secondary" }}>
            El rol seleccionado determina las opciones del menú, los permisos y las limitaciones generales del usuario dentro del sistema.
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2, color: "text.secondary" }}>
            Rol actual: <Typography component="span" color="primary.main"> {dashboard.role.name} </Typography>
          </Typography>
          <div>
            {!(roleList >= 2) &&
              <Alert variant="filled" severity="info">
                El usuario no posee roles adicionales a "{dashboard.role.name}" por lo cual no es posible cambiarlo.
              </Alert>
            }
          </div>
        </RootStyle>
      </Modal>

      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {userData.people.firstName+' '+userData.people.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userData.account.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.main' }} noWrap>
            {dashboard.role.name}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

          <MenuItem
            key="changeRole"
            onClick={handleShowModalChangeRole}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={cog}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            Cambiar Rol
          </MenuItem>

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={() => handleLogout()} fullWidth color="primary" variant="outlined">
            Cerrar sesión
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
