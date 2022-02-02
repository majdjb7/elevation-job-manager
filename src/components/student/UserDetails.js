import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import { inject, observer } from "mobx-react";
const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};

const UserDetails = inject("studentStore")(
    observer((props) => {
        
        return (
            <Card >
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar
                            src={user.avatar}
                            sx={{
                                height: 64,
                                mb: 2,
                                width: 64
                            }}
                        />
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            {props.studentStore.studentData.firstName} {props.studentStore.studentData.lastName}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {props.studentStore.studentData.mobileNo}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {props.studentStore.studentData.email}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {props.studentStore.studentData.cohort}
                        </Typography>
                    </Box>
                </CardContent>
                <Divider />
            </Card>
        )
    })
)


export default UserDetails;
