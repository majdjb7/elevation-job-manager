import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [cohort, setCohort] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        
        await fetch('http://localhost:8888/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                mobileNo,
                cohort,
                password
            })
        });
        setRedirect(true)
    }

    if(redirect) {
        return <Redirect to="/"/>;
    }

  return (
    <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        
        <input className="form-control" placeholder="First Name" required
            onChange={e => setFirstName(e.target.value)}
        />

        <input className="form-control" placeholder="Last Name" required
            onChange={e => setLastName(e.target.value)}
        />

        <input type="email" className="form-control" placeholder="Email address" required
            onChange={e => setEmail(e.target.value)}
        />

        <input className="form-control" placeholder="Phone Number" required
            onChange={e => setMobileNo(e.target.value)}
        />

        <input className="form-control" placeholder="Cohort" required
            onChange={e => setCohort(e.target.value)}
        />

        <input type="password" className="form-control" placeholder="Password" required
            onChange={e => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

    </form>
    
  )
}