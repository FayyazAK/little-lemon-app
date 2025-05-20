import { useState } from 'react';
import FormField from '../../components/ui/formField/FormField';

export default function ReservationForm( {
    availableTimes,
    submitData
}) {

    const minimumDate = new Date().toISOString().split('T')[0];
    const defaultDate = availableTimes[0];
    const minimumGuests = 1;
    const maximumGuests = 10;

    const invalidDateErrorMessage = 'Please choose a valid date';
    const invalidTimeErrorMessage = 'Please choose a valid time';
    const invalidOccasionErrorMessage = 'Please choose a valid occasion';
    const invalidNumberOfGuestsErrorMessage = `Please enter a number between ${minimumGuests} and ${maximumGuests}`;
    const invalidNameErrorMessage = 'Please enter your name';
    const invalidEmailErrorMessage = 'Please enter a valid email';

    const guestHint = `Minimum of ${minimumGuests} and max limit ${maximumGuests}`;

    const [date, setDate] = useState(minimumDate);
    const [time, setTime] = useState(defaultDate);
    const [guests, setGuests] = useState(minimumGuests);
    const [occasion, setOccasion] = useState('Birthday');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [seatingPreference, setSeatingPreference] = useState('No preference');

    const isDateValid = () => date !== '';
    const isTimeValid = () => time !== '';
    const isGuestsValid = () => guests !== '';
    const isOccasionValid = () => occasion !== '';
    const isNameValid = () => name !== '';
    const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const hasHint = () => guests < minimumGuests || guests > maximumGuests;

    function handleSumbit(e) {
        e.preventDefault();
        submitData({ 
            date, 
            time, 
            guests, 
            occasion, 
            name, 
            email, 
            specialRequests, 
            seatingPreference 
        });
        ClearForm();
    }

    const ClearForm = () => {
        setDate(minimumDate);
        setTime('17:00');
        setGuests(1);
        setOccasion('Birthday');
        setName('');
        setEmail('');
        setSpecialRequests('');
        setSeatingPreference('No preference');
    }

    return (
        <form
            className='reservation-form'
            onSubmit={handleSumbit}
        >
            <div className="form-header">
                <h2>Table Reservation</h2>
                <p>Please fill in the details to reserve your table</p>
            </div>
            
            <div className="form-group">
                <FormField
                    label='Your Name'
                    htmlFor='guest-name'
                    hasError={name !== '' && !isNameValid()}
                    errorMessage={invalidNameErrorMessage}
                >
                    <input
                        type='text'
                        id='guest-name'
                        name='guest-name'
                        value={name}
                        required={true}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="form-input"
                    />
                </FormField>

                <FormField
                    label='Email Address'
                    htmlFor='guest-email'
                    hasError={email !== '' && !isEmailValid()}
                    errorMessage={invalidEmailErrorMessage}
                >
                    <input
                        type='email'
                        id='guest-email'
                        name='guest-email'
                        value={email}
                        required={true}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="form-input"
                    />
                </FormField>
            </div>

            <div className="form-group">
                <FormField
                    label='Choose date'
                    htmlFor='reservation-date'
                    hasError={!isDateValid()}
                    errorMessage={invalidDateErrorMessage}
                >
                    <input
                        type='date'
                        id='reservation-date'
                        name='reservation-date'
                        min={minimumDate}
                        value={date}
                        required={true}
                        onChange={e => setDate(e.target.value)}
                        className="form-input"
                    />
                </FormField>
                
                <FormField
                    label='Time'
                    htmlFor='reservation-time'
                    hasError={!isTimeValid()}
                    errorMessage={invalidTimeErrorMessage}
                >
                    <select
                        id='reservation-time'
                        className='reservation-time form-input'
                        name='reservation-time'
                        value={time}
                        required={true}
                        onChange={e => setTime(e.target.value)}
                    >
                        {availableTimes.map((time) => (
                            <option key={time} value={time}>
                            {time}
                            </option>
                        ))}
                    </select>
                </FormField>
            </div>

            <div className="form-group">
                <FormField
                    label='Guests'
                    htmlFor='guests'
                    hasError={!isGuestsValid()}
                    errorMessage={invalidNumberOfGuestsErrorMessage}
                    hasHint={!hasHint()}
                    hintMessage={guestHint}
                >
                    <input
                        type='number'
                        id='guests'
                        className='guests form-input'
                        name='guests'
                        min={minimumGuests}
                        max={maximumGuests}
                        value={guests}
                        required={true}
                        onChange={(e) => setGuests(e.target.value)}
                    />
                </FormField>
                
                <FormField
                    label='Occasion'
                    htmlFor='occasion'
                    hasError={!isOccasionValid()}
                    errorMessage={invalidOccasionErrorMessage}
                >
                    <select
                        id='occasion'
                        className='occasion form-input'
                        name='occasion'
                        value={occasion}
                        required={true}
                        onChange={(e) => setOccasion(e.target.value)}
                    >
                        <option>Birthday</option>
                        <option>Anniversary</option>
                        <option>Engagement</option>
                        <option>Business Meeting</option>
                        <option>Other</option>
                    </select>
                </FormField>
            </div>

            <div className="form-group">
                <FormField
                    label='Seating Preference'
                    htmlFor='seating'
                >
                    <select
                        id='seating'
                        className='form-input'
                        name='seating'
                        value={seatingPreference}
                        onChange={(e) => setSeatingPreference(e.target.value)}
                    >
                        <option>No preference</option>
                        <option>Indoor</option>
                        <option>Outdoor</option>
                        <option>Bar</option>
                    </select>
                </FormField>
            </div>

            <FormField
                label='Special Requests'
                htmlFor='special-requests'
            >
                <textarea
                    id='special-requests'
                    className='form-input textarea'
                    name='special-requests'
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any allergies or special requests?"
                    rows="3"
                />
            </FormField>
            
            <button
                className='submit-btn'
                type='submit'
                aria-label='Make your reservation'
            >
                <span className="btn-text">Reserve Now</span>
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </button>
        </form>
    );
}