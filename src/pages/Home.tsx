import { useEffect, useState } from 'react';
import { add } from 'ionicons/icons';
import {
	IonAlert,
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonList,
	IonModal,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonTitle,
	IonToolbar,
	RefresherEventDetail
} from '@ionic/react';

import { MessageForm } from '../components/MessageForm';
import { MessageListItem } from '../components/MessageListItem';
import { MessagePreview } from '../components/MessagePreview';

import { Message, deleteMessage, getMessages, loadAndGetMessages } from '../data/messages';

import './Home.css';

export const Home = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState<Message | null>(null);

	const [formModalToggle, setFormModalToggle] = useState<boolean>(false);
	const [previewModalToggle, setPreviewModalToggle] = useState<boolean>(false);
	const [deleteModalToggle, setDeleteModalToggle] = useState<boolean>(false);

	useEffect(() => {
		__init();
	});

	async function __init() {
		const msgs = await getMessages();
		setMessages(msgs);
	}

	async function __refresh(e: CustomEvent<RefresherEventDetail>) {
		const msgs = await loadAndGetMessages();
		setMessages(msgs);

		e.detail.complete();
	}

	async function __setPreview(m: Message) {
		setMessage(m);
		setPreviewModalToggle(true);
	}

	async function __setDelete(m: Message) {
		setMessage(m);

		setDeleteModalToggle(true);
	}

	async function __formDismiss(changed = false) {
		if (changed) {
			await __getMessages();
		}

		setFormModalToggle(false);
	}

	async function __getMessages() {
		const msgs = await getMessages();
		setMessages(msgs);
	}

	return (
		<IonPage id="home-page">
			<IonHeader>
				<IonToolbar>
					<IonTitle>Inbox</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonRefresher slot="fixed" onIonRefresh={__refresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>

				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Inbox</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonList>
					{messages.map(m => (
						<MessageListItem onPreview={__setPreview} onDelete={__setDelete} key={m.id} message={m} />
					))}
				</IonList>
			</IonContent>
			<IonFab vertical="bottom" horizontal="end">
				<IonFabButton onClick={() => setFormModalToggle(true)}>
					<IonIcon icon={add} />
				</IonFabButton>
			</IonFab>
			<IonModal isOpen={formModalToggle} onWillDismiss={__formDismiss as any}>
				<MessageForm onDismiss={__formDismiss} />
			</IonModal>
			<IonModal isOpen={previewModalToggle} onWillDismiss={() => setPreviewModalToggle(false)}>
				<MessagePreview message={message} onDismiss={() => setPreviewModalToggle(false)} />
			</IonModal>
			<IonAlert
				isOpen={deleteModalToggle}
				header={`Are you sure?`}
				message={`Are you sure that you want to delete the message with the text: "${message?.message}"`}
				buttons={[
					{
						text: 'Cancel',
						role: 'cancel',
						cssClass: 'secondary',
						handler: () => {
							setDeleteModalToggle(false);
						}
					},
					{
						text: 'Delete',
						handler: async () => {
							await deleteMessage(message!.id);
							await __getMessages();
							setDeleteModalToggle(false);
						}
					}
				]}
			/>
		</IonPage>
	);
};

export default Home;
