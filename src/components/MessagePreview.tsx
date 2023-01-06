import { close } from 'ionicons/icons';
import { IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { useEffect } from 'react';

import { Message } from '../data/messages';

export interface MessagePreviewProps {
	message: Message | null;
	onDismiss: () => void;
}

const PRIMARY_COLOR = 'white';
const SECONDARY_COLOR = 'black';

export const MessagePreview: React.FC<MessagePreviewProps> = ({ message, onDismiss }) => {
	useEffect(() => {
		const messagePreviewContainer = document.getElementById('message-preview-container');
		const messagePreviewText = document.getElementById('message-preview-text');

		const timer = setInterval(() => {
			messagePreviewContainer?.classList.toggle(`bg-${PRIMARY_COLOR}`);
			messagePreviewContainer?.classList.toggle(`bg-${SECONDARY_COLOR}`);
			messagePreviewText?.classList.toggle(`text-${PRIMARY_COLOR}`);
			messagePreviewText?.classList.toggle(`text-${SECONDARY_COLOR}`);
		}, 1000);

		return () => clearInterval(timer as NodeJS.Timeout);
	}, []);

	return (
		<>
			<IonContent>
				<div
					id="message-preview-container"
					className={`h-full flex flex-col items-center justify-center bg-${PRIMARY_COLOR}`}
				>
					<div className="flex-1 flex items-center">
						<h1
							id="message-preview-text"
							className={`text-6xl font-semibold rotate-90 message-heading text-center text-${SECONDARY_COLOR}`}
						>
							{message?.message}
						</h1>
					</div>
				</div>
			</IonContent>
			<IonFab vertical="bottom" horizontal="end">
				<IonFabButton color="danger" onClick={onDismiss} className="border-4 rounded-full">
					<IonIcon icon={close} />
				</IonFabButton>
			</IonFab>
		</>
	);
};
