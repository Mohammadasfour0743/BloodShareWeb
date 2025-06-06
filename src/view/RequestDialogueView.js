import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { saveRequests } from '../model/firebaseModel';
import { sendNotifications } from '../model/notifications.js';
import { nanoid } from 'nanoid';
// do npm install nanoid first

const options = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

export function RequestDialogueView({
  closeEventHandler,
  addRequest,
  hospitalName,
  hospitalLocation,
  hospitalEmail,
  reactiveModel,
}) {
  const [error, setError] = useState('');
  const [bloodTypes, setBloodTypes] = useState([]);
  const [isUrgent, setUrgent] = useState(false);
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState(1);

  function submitForm() {
    setError('');
    if (bloodTypes.length === 0) {
      setError('Please select at least one blood type');
      return;
    }
    const id = /* crypto.randomUUID(); */ nanoid(10);
    const req = {
      id,
      hospitalName: reactiveModel.name,
      hospitalEmail: reactiveModel.email,
      hospitalId: reactiveModel.id,
      bloodTypes: bloodTypes,
      urgency: isUrgent,
      description: notes,
      phoneNumber: reactiveModel.phone,
      amount,
      current: true,
      latitude: reactiveModel.latitude,
      longitude: reactiveModel.longitude,
      location: reactiveModel.location,
      updatedAt: new Date().toISOString(),
    };
    closeEventHandler();
    addRequest(req);
    saveRequests(req);
    sendNotifications(id);
  }

  function toggleBloodType(option) {
    setBloodTypes((prev) => {
      if (prev.includes(option)) {
        console.log(prev.filter((el) => el !== option));
        return prev.filter((el) => el !== option);
      } else {
        console.log([...prev, option]);
        return [...prev, option];
      }
    });
  }

  return (
    <div className={'requestFormContainer'}>
      <div className={'requestForm'}>
        <div className="topBar">
          <IoClose size={21} onClick={closeEventHandler} className={'closeWindow'} />
        </div>
        <div className={'row header'}>
          <h1>Request a Donation</h1>
        </div>
        <div className={'column inputContainer'}>
          <div className="row inputRow subheaderContainer">
            <h2 className="subheader">Hospital Details</h2>
          </div>
          <div className="row inputRow">
            <label>Name</label>
            <input value={hospitalName} disabled={true} type="text" className="formInput" />
          </div>
          <div className="row inputRow">
            <label>Location</label>
            <input value={hospitalLocation} disabled={true} type="text" className="formInput" />
          </div>
          <div className="row inputRow">
            <label>Email</label>
            <input value={hospitalEmail} disabled={true} type="text" className="formInput" />
          </div>
          <div className="row inputRow">
            <label>Phone</label>
            <input disabled={true} type="text" className="formInput" value="+46 11 111 111" />
          </div>
        </div>
        <div className="column inputContainer radio-group-container">
          <div className="row inputRow subheaderContainer">
            <h2 className="subheader">Request Details</h2>
          </div>
          {error && (
            <div className="row inputrow">
              <p style={{ color: 'red' }}>{error}</p>
            </div>
          )}
          <div className="row inputRow">
            <label>Blood type</label>
          </div>
          <div className="radio-group">
            {options.map((option, index) => (
              <label
                className="radio-option"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleBloodType(option);
                }}
              >
                <input
                  type="radio"
                  name={'customRadio' + index}
                  value={option}
                  checked={bloodTypes.includes(option)}
                  onClick={(e) => e.preventDefault()}
                />
                <span className="custom-radio"></span>
                {option}
              </label>
            ))}
          </div>
          <div className="row inputRow checkbox-container">
            <label className="checkbox-label-text">Urgent request</label>
            <input
              value={isUrgent}
              onChange={(e) => setUrgent(e.target.checked)}
              type="checkbox"
              id="myCheckbox"
              class="custom-checkbox"
            />
            <label for="myCheckbox" class="checkbox-label"></label>
          </div>
          <div className="row inputRow amountRow">
            <label>Amount (in units)</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              className="formInput amountInput"
            />
          </div>
          <div className="column">
            <label>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="textarea" />
          </div>
        </div>
        <div className="formSubmitContainer">
          <button className="formSubmit" onClick={submitForm}>
            Submit
          </button>
        </div>
      </div>

      <div className={'requestFormOverlay'} onClick={closeEventHandler} />
    </div>
  );
}
