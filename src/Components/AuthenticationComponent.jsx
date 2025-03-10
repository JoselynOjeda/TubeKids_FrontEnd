import React, { useState } from 'react';
import * as Components from './AuthenticationStyles';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaIdBadge, FaGlobe, FaCalendarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';



const AuthenticationComponent = () => {
    const [signIn, toggle] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        pin: '',
        name: '',
        surname: '',
        country: '',
        birthDate: '',
    });

    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e, isSignIn = false) => {
        const { name, value } = e.target;
        if (isSignIn) {
            setSignInData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };


    const validateForm = () => {
        let errors = [];
        // Common validations
        if (!formData.email.includes('@')) {
            errors.push("Invalid email format.");
        }
        if (!formData.email || !formData.password) {
            errors.push("Email and password are required.");
        }
        if (!signIn && (formData.password !== formData.confirmPassword)) {
            errors.push("Passwords do not match.");
        }
        if (!signIn && !formData.name) {
            errors.push("Name is required.");
        }
        // Registration-specific validations
        if (!signIn && !formData.phone) {
            errors.push("Phone number is required.");
        }

        if (errors.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: errors.join('<br/>'),
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (event, isSignIn = false) => {
        event.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;

        if (isSignIn) {
            // Simulate login API call here
            Swal.fire('Success!', 'You have successfully logged in.', 'success');
        } else {
            // Simulate registration API call here
            Swal.fire('Success!', 'Your registration is complete!', 'success');
        }
    };

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.SignUpForm onSubmit={handleSubmit}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.InputContainer>
                        <Components.Icon><FaUser /></Components.Icon>
                        <Components.Input type='text' placeholder='Name' name='name' value={formData.name} onChange={handleChange} />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaUser /></Components.Icon>
                        <Components.Input type='text' placeholder='Surname' name='surname' value={formData.surname} onChange={handleChange} />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaEnvelope /></Components.Icon>
                        <Components.Input type='email' placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaLock /></Components.Icon>
                        <Components.Input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaLock /></Components.Icon>
                        <Components.Input type='password' placeholder='Repeat Password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaPhone /></Components.Icon>
                        <Components.Input type='text' placeholder='Phone Number' name='phone' value={formData.phone} onChange={handleChange} />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaIdBadge /></Components.Icon>
                        <Components.Input type='text' placeholder='Pin (6 digits)' name='pin' value={formData.pin} onChange={handleChange} />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaGlobe /></Components.Icon>
                        <Components.Input type='text' placeholder='Country' name='country' value={formData.country} onChange={handleChange} />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaCalendarAlt /></Components.Icon>
                        <Components.Input type='date' placeholder='Date of Birth' name='birthDate' value={formData.birthDate} onChange={handleChange} />
                    </Components.InputContainer>
                    {Object.values(errors).map(error => (
                        <Components.Paragraph key={error} style={{ color: 'red' }}>{error}</Components.Paragraph>
                    ))}
                    <Components.Button type='submit'>Sign Up</Components.Button>
                </Components.SignUpForm>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.SignInForm onSubmit={(e) => handleSubmit(e, true)}>
                    <Components.Title>Sign In</Components.Title>
                    <Components.InputContainer>
                        <Components.Icon><FaEnvelope /></Components.Icon>
                        <Components.Input type='email' placeholder='Email' />
                    </Components.InputContainer>
                    <Components.InputContainer>
                        <Components.Icon><FaLock /></Components.Icon>
                        <Components.Input type='password' placeholder='Password' />
                    </Components.InputContainer>
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button>Sign In</Components.Button>
                </Components.SignInForm>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            Ready for more adventures? Log in with your info!
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, New Explorer!</Components.Title>
                        <Components.Paragraph>
                            Join us and discover a world of fun and learning!
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
};

export default AuthenticationComponent;
