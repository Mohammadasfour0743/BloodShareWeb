import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import { AreYouSureDialog } from '../presenter/AreYouSureDialog';
import { observer } from 'mobx-react-lite';

export const CurrentRequestItemView = observer(function CurrentRequestItemView({
  request,
  hospitalName,
  idx,
  isOpen,
  setOpen,
  removeItem,
  responses,
  model,
}) {
  function onItemPressed() {
    setOpen((state) => !state);
  }

  return (
    <div onClick={onItemPressed} className="current-request-item" key={idx}>
      <div className="top-left">
        {request.urgency && (
          <div className="urgent-box">
            <p>Urgent</p>
          </div>
        )}
        <div className="responses">
          <p>{responses} responses</p>
        </div>
      </div>
      <div className="current-request-item-content">
        <div className="current-request-item-header">
          <h2>Blood types</h2>
        </div>
        <h2>{Array.isArray(request.bloodTypes) ? request.bloodTypes.join(', ') : request.bloodType}</h2>
      </div>
      <div className="arrow">
        {!isOpen && <FaChevronDown size={25} />}
        {isOpen && <FaChevronUp size={25} />}
      </div>
      <div className={`description-wrapper ${isOpen && 'open'}`}>
        {isOpen && (
          <div className="description">
            <h3>Notes</h3>
            <p>{request.description}</p>
          </div>
        )}
      </div>
      <p className="id">ID {request.id}</p>
      <AreYouSureDialog removeItem={removeItem} model={model} requestId={request.id} />
    </div>
  );
});
