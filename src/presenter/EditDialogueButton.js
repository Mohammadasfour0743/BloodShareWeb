import { useEffect, useState } from 'react';
import { RequestDialogueView } from '../view/RequestDialogueView';
import { observer } from 'mobx-react-lite';
import { EditDialogueButtonView } from '../view/EditDialogueButtonView';
import { EditDialogueView } from '../view/EditDialogueView';
import { saveToFirebase, updateEmailForReq } from '../model/firebaseModel';
import { useIsMobile } from '../hooks/useIsMobile';
import { MobileEditProfile } from '../view/mobile/MobileEditProfile';

export const EditDialogue = observer(function EditDialogue({ model }) {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [email, setEmail] = useState(model.email);
  const [phone, setPhone] = useState(model.phone);
  const isMobile = useIsMobile();

  useEffect(() => {
    setEmail(model.email);
    setPhone(model.phone);
  }, [model.email, model.phone]);

  function saveSettings() {
    model.setEmail(email);
    model.setPhone(phone);
    saveToFirebase(model);
    updateEmailForReq(model);
    setDialogueOpen(false);
  }

  function onEditDialogueButtonClicked() {
    setDialogueOpen(true);
  }

  function onOverlayClick() {
    setDialogueOpen(false);
  }

  if (isMobile) {
    return <MobileEditProfile email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />;
  }
  if (dialogueOpen) {
    return (
      <EditDialogueView
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        closeEventHandler={onOverlayClick}
        saveSettings={saveSettings}
      />
    );
  }

  return <EditDialogueButtonView clickEventHandler={onEditDialogueButtonClicked} />;
});
