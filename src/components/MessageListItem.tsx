import { IonContent, IonIcon, IonItem, IonLabel, IonPopover } from '@ionic/react';
import { ellipsisVertical, pencil, trash } from 'ionicons/icons';
import moment from 'moment';

import { Message } from '../data/messages';
import React from 'react';

interface MessageListItemProps {
	message: Message;
	onPreview: (m: Message) => void;
	onEdit: (m: Message) => void;
	onDelete: (m: Message) => void;
}

export const MessageListItem: React.FC<MessageListItemProps> = ({ message, onPreview, onEdit, onDelete }) => {
	function __editMessage(e: MouseEvent) {
		e.stopPropagation();

		onEdit(message);
	}

	function __deleteMessage(e: MouseEvent) {
		e.stopPropagation();

		onDelete(message);
	}

	return (
		<IonItem detail={false} onClick={() => onPreview(message)} button>
			<IonLabel>
				<div>
					<div
						style={{ backgroundColor: `#${message.primaryColor}` }}
						className="w-4 h-4 rounded-md inline-block mr-2"
					></div>
					<h3 className="font-semibold text-lg inline-block">{message.message}</h3>
				</div>
				<div>
					<div
						style={{ backgroundColor: `#${message.secondaryColor}` }}
						className="w-4 h-4 rounded-md inline-block mr-2"
					></div>
					<p className="text-xs inline-block">Created at {moment(message.date).format('DD-MM-YYYY HH:mm')}</p>
				</div>
			</IonLabel>
			<IonIcon
				id={`options-button-${message.id}`}
				onClick={e => e.stopPropagation()}
				icon={ellipsisVertical}
				slot="end"
			/>
			<IonPopover trigger={`options-button-${message.id}`} side="bottom" alignment="end">
				<IonContent>
					<IonItem onClick={__editMessage as any} button>
						<IonIcon icon={pencil} slot="start" />
						<IonLabel>Edit</IonLabel>
					</IonItem>
					<IonItem onClick={__deleteMessage as any} button>
						<IonIcon icon={trash} slot="start" />
						<IonLabel>Delete</IonLabel>
					</IonItem>
				</IonContent>
			</IonPopover>
		</IonItem>
	);
};
