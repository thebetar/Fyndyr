import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
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
		<IonItem detail={false} className="ion-padding-horizontal" onClick={() => onPreview(message)}>
			<IonLabel>
				<h3>{message.message}</h3>
				<p>Created at {moment(message.date).format('DD-MM-YYYY HH:mm')}</p>
			</IonLabel>
			<IonIcon onClick={__editMessage as any} icon={pencil} slot="end" />
			<IonIcon onClick={__deleteMessage as any} icon={trash} slot="end" />
		</IonItem>
	);
};
