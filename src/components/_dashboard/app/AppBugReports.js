import { Icon } from '@iconify/react';
import dataIcon from '@iconify/icons-ant-design/snippets-outlined';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.success.darker,
  backgroundColor: theme.palette.success.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.success.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.success.dark, 0)} 0%, ${alpha(
    theme.palette.success.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 16;

export default function AppBugReports() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={dataIcon} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Consultas en proceso
      </Typography>
    </RootStyle>
  );
}
