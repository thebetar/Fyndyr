import { IonContent, IonHeader, IonItem, IonToolbar, IonTitle, IonInput, IonLabel, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';

import { DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR, Message, addMessage, updateMessage } from '../data/messages';

interface MessageFormProps {
	message: Message | null;
	onDismiss: (change: boolean) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({ message, onDismiss }) => {
	const [messageText, setMessageText] = useState('');
	const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
	const [secondaryColor, setSecondaryColor] = useState(DEFAULT_SECONDARY_COLOR);

	useEffect(() => {
		if (message) {
			setMessageText(message.message);
			setPrimaryColor(message.primaryColor);
			setSecondaryColor(message.secondaryColor);
		}
	}, [message]);

	function __save(e: SubmitEvent) {
		e.preventDefault();

		if (!__validateForm()) {
			return;
		}

		if (message) {
			updateMessage(message.id!, { message: messageText, primaryColor, secondaryColor });
		} else {
			addMessage({ message: messageText, primaryColor, secondaryColor });
		}

		setMessageText('');
		setPrimaryColor(DEFAULT_PRIMARY_COLOR);
		setSecondaryColor(DEFAULT_SECONDARY_COLOR);
		onDismiss(true);
	}

	function __validateForm() {
		return (
			messageText.length > 0 &&
			primaryColor.length >= 3 &&
			primaryColor.length === 6 &&
			secondaryColor.length >= 3 &&
			secondaryColor.length === 6
		);
	}

	function __cancel() {
		setMessageText('');
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
				<form onSubmit={__save as any}>
					<IonItem className="ion-padding">
						<IonLabel position="stacked">Message</IonLabel>
						<IonInput
							onIonChange={e => setMessageText(e.detail.value!)}
							value={messageText}
							placeholder="Message..."
						/>
					</IonItem>
					<IonItem className="ion-padding">
						<IonLabel position="stacked">Primary color</IonLabel>
						<IonInput
							onIonChange={e => setPrimaryColor(e.detail.value!)}
							value={primaryColor}
							minlength={3}
							maxlength={6}
							inputMode="text"
							type="text"
							placeholder="Primary color..."
						/>
						<div
							style={{ backgroundColor: `#${primaryColor}` }}
							slot="end"
							className="w-8 h-8 m-auto"
						></div>
					</IonItem>
					<IonItem className="ion-padding">
						<IonLabel position="stacked">Secondary color</IonLabel>
						<IonInput
							onIonChange={e => setSecondaryColor(e.detail.value!)}
							value={secondaryColor}
							minlength={3}
							maxlength={6}
							placeholder="Secondary color..."
						/>
						<div
							style={{ backgroundColor: `#${secondaryColor}` }}
							slot="end"
							className="w-8 h-8 m-auto"
						></div>
					</IonItem>
					<IonItem className="ion-padding-horizontal">
						<IonLabel>
							<IonButton
								disabled={!messageText}
								expand="block"
								color="success"
								fill="solid"
								type="submit"
							>
								Save
							</IonButton>
						</IonLabel>
					</IonItem>
					<IonItem className="ion-padding-horizontal">
						<IonLabel>
							<IonButton onClick={__cancel} expand="block" color="danger" fill="solid" type="button">
								Cancel
							</IonButton>
						</IonLabel>
					</IonItem>
				</form>
			</IonContent>
		</>
	);
};
