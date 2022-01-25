import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import axios from 'axios'

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

function AddInterview() {
    const location = useLocation();
    const classes = useStyles()
    const history = useHistory()
    const [type, setType] = useState('')
    const [typeError, setTypeError] = useState(false)
    const [time, setTime] = useState('')
    const [timeError, setTimeError] = useState(false)
    const [interviewerName, setInterviewerName] = useState('')
    const [interviewerNameError, setInterviewerNameError] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault()
        setTypeError(false)
        setTimeError(false)
        setInterviewerNameError(false)
        if (type == '') {
            setTypeError(true)
        }
        if (time == '') {
            setTimeError(true)
        }
        if (interviewerName == '') {
            setInterviewerNameError(true)
        }
      
        if (type && time && interviewerName) {
           let id= location.state
            const res = await axios.post("http://localhost:8888/jobs/"+id+"/interviews",
                { type, time, interviewerName})
            history.push({
                pathname: '/',
                state: res.data._id,
            })
        }
    }

    return (
        <Container size="sm">
            <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Create a New Interview
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.field}
                    onChange={(e) => setType(e.target.value)}
                    label="Type"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={typeError}
                />
                <TextField className={classes.field}
                    onChange={(e) => setTime(e.target.value)}
                    label="Time"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={timeError}
                />
                <TextField className={classes.field}
                    onChange={(e) => setInterviewerName(e.target.value)}
                    label="InterviewerName"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={interviewerNameError}
                />

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}>
                    Submit
                </Button>
            </form>


        </Container>
    )
}
export default AddInterview;