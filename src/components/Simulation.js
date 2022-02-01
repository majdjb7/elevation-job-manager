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
                        <Container size="sm">
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                component="h2"
                                gutterBottom
                                className={classes.Container}
                            >
                                Create a New Interview
                            </Typography>

                            <form
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                className={classes.Container}
                            >
                                <FormControl className={classes.field}>
                                    <FormLabel>Type</FormLabel>
                                    <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
                                        <FormControlLabel value="HR" control={<Radio />} label="HR" />
                                        <FormControlLabel
                                            value="Telephone"
                                            control={<Radio color="primary" />}
                                            label="Telephone"
                                        />
                                        <FormControlLabel
                                            value="Technical"
                                            control={<Radio color="primary" />}
                                            label="Technical"
                                        />
                                        <FormControlLabel
                                            value="Home Assignment"
                                            control={<Radio color="primary" />}
                                            label="Home Assignment"
                                        />
                                        <FormControlLabel
                                            value="Home Test"
                                            control={<Radio color="primary" />}
                                            label="Home Test"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <TextField
                                    onChange={(e) => setTime(e.target.value)}
                                    id="datetime-local"
                                    label="Time"
                                    type="datetime-local"
                                    required
                                    error={timeError}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    className={classes.field}
                                    onChange={(e) => setInterviewerName(e.target.value)}
                                    label="InterviewerName"
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={interviewerNameError}
                                />

                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    endIcon={<KeyboardArrowRightIcon />}
                                >
                                    Submit
                                </Button>
                                <p id="error">
                                    {error}
                                </p>
                            </form>
                        </Container>
                    </Box>
                </CardContent>
                <Divider />
            </Card>
        )
    })
)


export default UserDetails;
