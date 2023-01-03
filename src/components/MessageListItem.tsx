import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { trash } from 'ionicons/icons';
import moment from 'moment';

import { Message, deleteMessage } from '../data/messages';
import './MessageListItem.css';

interface MessageListItemProps {
	message: Message;
	onDelete: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message, onDelete }) => {
	const __deleteMessage = () => {
		deleteMessage(message.id);
		onDelete();
	};

	return (
		<IonItem detail={false} className="ion-padding-horizontal">
			<IonLabel>
				<h3>{message.message}</h3>
				<p>Created at {moment(message.date).format('DD-MM-YYYY HH:mm')}</p>
			</IonLabel>
			<IonIcon onClick={__deleteMessage} icon={trash} slot="end" />
		</IonItem>
	);
};

export default MessageListItem;
