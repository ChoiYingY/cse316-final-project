import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} style={ { marginTop: "2.5%"  }}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {' Choi Ying Yau | All right reserved'}
        </Typography>
    );
}