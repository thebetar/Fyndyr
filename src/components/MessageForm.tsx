import { IonContent, IonHeader, IonItem, IonToolbar, IonTitle, IonInput, IonLabel, IonButton } from '@ionic/react';
import { useState } from 'react';
import { addMessage } from '../data/messages';

interface MessageFormProps {
	onDismiss: (change: boolean) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onDismiss }) => {
	const [message, setMessage] = useState('');

	function __save() {
		addMessage(message);
		setMessage('');
		onDismiss(true);
	}

	function __cancel() {
		setMessage('');
		onDismiss(false);
	}

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Message form</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem className="ion-padding">
					<IonLabel>Message</IonLabel>
					<IonInput onIonChange={e => setMessage(e.detail.value!)} placeholder="Message..." />
				</IonItem>
				{/* <IonItem className="ion-padding">
					<IonLabel>Primary color</IonLabel>
					<IonInput placeholder="Primary color..." />
				</IonItem>
				<IonItem className="ion-padding">
					<IonLabel>Secondary color</IonLabel>
					<IonInput placeholder="Secondary color..." />
				</IonItem> */}
				<IonItem className="ion-padding-horizontal">
					<IonLabel>
						<IonButton onClick={__save} disabled={!message} expand="block" color="success" fill="solid">
							Save
						</IonButton>
					</IonLabel>
				</IonItem>
				<IonItem className="ion-padding-horizontal">
					<IonLabel>
						<IonButton onClick={__cancel} expand="block" color="danger" fill="solid">
							Cancel
						</IonButton>
					</IonLabel>
				</IonItem>
			</IonContent>
		</>
	);
};
