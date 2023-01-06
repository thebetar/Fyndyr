import { close } from 'ionicons/icons';
import { IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { useEffect } from 'react';

import { Message, DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR } from '../data/messages';

export interface MessagePreviewProps {
	message: Message | null;
	onDismiss: () => void;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({ message, onDismiss }) => {
	useEffect(() => {
		let toggle = false;

		const messagePreviewContainer = document.getElementById('message-preview-container') as HTMLDivElement;
		const messagePreviewText = document.getElementById('message-preview-text') as HTMLHeadingElement;

		const timer = setInterval(() => {
			toggle = !toggle;

			messagePreviewContainer.style.backgroundColor = toggle
				? `#${message?.secondaryColor || DEFAULT_SECONDARY_COLOR}`
				: `#${message?.primaryColor || DEFAULT_PRIMARY_COLOR}`;
			messagePreviewText.style.color = toggle
				? `#${message?.primaryColor || DEFAULT_PRIMARY_COLOR}`
				: `#${message?.secondaryColor || DEFAULT_SECONDARY_COLOR}`;
		}, 1000);

		return () => clearInterval(timer as NodeJS.Timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<IonContent>
				<div
					id="message-preview-container"
					className="h-full flex flex-col items-center justify-center"
					style={{
						backgroundColor: `#${message?.primaryColor || DEFAULT_PRIMARY_COLOR}`
					}}
				>
					<div className="flex-1 flex items-center">
						<h1
							id="message-preview-text"
							className="text-6xl font-semibold rotate-90 message-heading text-center"
							style={{
								color: `#${message?.secondaryColor || DEFAULT_SECONDARY_COLOR}`
							}}
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
