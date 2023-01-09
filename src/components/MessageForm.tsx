import {
	IonContent,
	IonHeader,
	IonItem,
	IonToolbar,
	IonTitle,
	IonInput,
	IonLabel,
	IonButton,
	IonIcon,
	IonModal,
	IonButtons,
	IonSegment,
	IonSegmentButton
} from '@ionic/react';
import { useEffect, useState } from 'react';

import { DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR, Message, addMessage, updateMessage } from '../data/messages';
import { arrowBack, saveOutline } from 'ionicons/icons';
import MessageFormColorPicker from './MessageFormColorPicker';

interface MessageFormProps {
	message: Message | null;
	onDismiss: (change: boolean) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({ message, onDismiss }) => {
	const [messageText, setMessageText] = useState('');
	const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
	const [secondaryColor, setSecondaryColor] = useState(DEFAULT_SECONDARY_COLOR);
	const [speed, setSpeed] = useState('normal');

	const [colorModalToggle, setColorModalToggle] = useState<boolean>(false);
	const [colorModalType, setColorModalType] = useState<string>('');

	useEffect(() => {
		if (message) {
			setMessageText(message.message);
			setPrimaryColor(message.primaryColor);
			setSecondaryColor(message.secondaryColor);
			setSpeed(message.speed);
		}
	}, [message]);

	function __save() {
		if (!__validateForm()) {
			return;
		}

		if (message) {
			updateMessage(message.id!, { message: messageText, primaryColor, secondaryColor, speed });
		} else {
			addMessage({ message: messageText, primaryColor, secondaryColor, speed });
		}

		setMessageText('');
		setPrimaryColor(DEFAULT_PRIMARY_COLOR);
		setSecondaryColor(DEFAULT_SECONDARY_COLOR);
		onDismiss(true);
	}

	function __validateForm() {
		return messageText.length > 0 && primaryColor.length === 7 && secondaryColor.length === 7;
	}

	function __openModal(type: string) {
		setColorModalType(type);
		setColorModalToggle(true);
	}

	function __setColor(color: string) {
		if (colorModalType === 'primary') {
			setPrimaryColor(color);
		} else {
			setSecondaryColor(color);
		}
		setColorModalToggle(false);
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
					<IonButtons slot="start">
						<IonButton onClick={__cancel}>
							<IonIcon icon={arrowBack} slot="icon-only" />
						</IonButton>
					</IonButtons>
					<IonTitle>{message ? 'Edit message' : 'Add message'}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem className="mx-4 mt-4">
					<IonLabel position="stacked">Message</IonLabel>
					<IonInput
						onIonChange={e => setMessageText(e.detail.value!)}
						value={messageText}
						autoCapitalize="on"
						placeholder="Message..."
						className="py-2"
					/>
				</IonItem>
				<IonItem onClick={() => __openModal('primary')} className="mx-4" button>
					<IonLabel className="py-4">Select primary color</IonLabel>
					<div
						style={{ backgroundColor: `${primaryColor}` }}
						slot="end"
						className="w-8 h-8 m-auto rounded-lg"
					></div>
				</IonItem>
				<IonItem onClick={() => __openModal('secondary')} className="mx-4" button>
					<IonLabel className="py-4">Select secondary color</IonLabel>
					<div
						style={{ backgroundColor: `${secondaryColor}` }}
						slot="end"
						className="w-8 h-8 m-auto rounded-lg"
					></div>
				</IonItem>
				<IonItem className="mx-4">
					<IonLabel>Speed</IonLabel>
				</IonItem>
				<IonItem className="mb-4 mx-4">
					<IonSegment value={speed} onIonChange={e => setSpeed(e.detail.value!)}>
						<IonSegmentButton value="slow">
							<IonLabel>Slow</IonLabel>
						</IonSegmentButton>
						<IonSegmentButton value="normal">
							<IonLabel>Default</IonLabel>
						</IonSegmentButton>
						<IonSegmentButton value="fast">
							<IonLabel>Fast</IonLabel>
						</IonSegmentButton>
					</IonSegment>
				</IonItem>

				<IonItem className="mx-4">
					<IonLabel>
						<IonButton
							disabled={!__validateForm}
							expand="block"
							color="success"
							fill="solid"
							className="h-10 my-2 font-semibold"
							onClick={__save}
						>
							<IonIcon icon={saveOutline} slot="start" />
							Save
						</IonButton>
					</IonLabel>
				</IonItem>
				<IonModal isOpen={colorModalToggle}>
					<MessageFormColorPicker onDismiss={() => setColorModalToggle(false)} onSelect={__setColor} />
				</IonModal>
			</IonContent>
		</>
	);
};
