import {
	IonContent,
	IonHeader,
	IonItem,
	IonToolbar,
	IonTitle,
	IonInput,
	IonLabel,
	IonButton,
	IonIcon
} from '@ionic/react';
import { useEffect, useState } from 'react';

import { DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR, Message, addMessage, updateMessage } from '../data/messages';
import { closeOutline, saveOutline } from 'ionicons/icons';

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
		setPrimaryColor(DEFAULT_PRIMARY_COLOR);
		setSecondaryColor(DEFAULT_SECONDARY_COLOR);
		onDismiss(false);
	}

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{message ? 'Edit message' : 'Add message'}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form onSubmit={__save as any}>
					<IonItem className="ion-margin-horizontal mt-4">
						<IonLabel position="stacked">Message</IonLabel>
						<IonInput
							onIonChange={e => setMessageText(e.detail.value!)}
							value={messageText}
							autoCapitalize="on"
							placeholder="Message..."
							className="py-2"
						/>
					</IonItem>
					<IonItem className="ion-margin-horizontal">
						<IonLabel position="stacked">Primary color</IonLabel>
						<IonInput
							onIonChange={e => setPrimaryColor(e.detail.value!)}
							value={primaryColor}
							minlength={3}
							maxlength={6}
							inputMode="text"
							type="text"
							placeholder="Primary color..."
							className="py-2"
						/>
						<div
							style={{ backgroundColor: `#${primaryColor}` }}
							slot="end"
							className="w-8 h-8 m-auto rounded-lg"
						></div>
					</IonItem>
					<IonItem className="ion-margin-horizontal mb-4">
						<IonLabel position="stacked">Secondary color</IonLabel>
						<IonInput
							onIonChange={e => setSecondaryColor(e.detail.value!)}
							value={secondaryColor}
							minlength={3}
							maxlength={6}
							placeholder="Secondary color..."
							className="py-2"
						/>
						<div
							style={{ backgroundColor: `#${secondaryColor}` }}
							slot="end"
							className="w-8 h-8 m-auto rounded-lg"
						></div>
					</IonItem>
					<IonItem className="ion-margin-horizontal">
						<IonLabel>
							<IonButton
								disabled={!messageText}
								expand="block"
								color="success"
								fill="solid"
								type="submit"
								className="h-10 my-2 font-semibold"
							>
								<IonIcon icon={saveOutline} slot="start" />
								Save
							</IonButton>
							<IonButton
								onClick={__cancel}
								expand="block"
								color="danger"
								fill="solid"
								type="button"
								className="h-10 my-2 font-semibold"
							>
								<IonIcon icon={closeOutline} slot="start" />
								Cancel
							</IonButton>
						</IonLabel>
					</IonItem>
				</form>
			</IonContent>
		</>
	);
};
