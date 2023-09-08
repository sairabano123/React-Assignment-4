import { styled } from '@mui/material/styles';
import { TableCell, tableCellClasses } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const StyledCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blueGrey[800],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
export default StyledCell;
