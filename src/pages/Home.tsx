import { useState } from 'react';
import { add } from 'ionicons/icons';

import MessageListItem from '../components/MessageListItem';
import { Message, getMessages, initStore, loadAndGetMessages } from '../data/messages';
import {
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
	RefresherEventDetail,
	useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import { MessageForm } from '../components/MessageForm';

const Home: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [formModalToggle, setFormModalToggle] = useState<boolean>(false);

	useIonViewWillEnter(async () => {
		await initStore();

		const msgs = await loadAndGetMessages();
		setMessages(msgs);
	});

	const __refresh = async (e: CustomEvent<RefresherEventDetail>) => {
		const msgs = await loadAndGetMessages();
		setMessages(msgs);

		e.detail.complete();
	};

	const __formDismiss = async () => {
		await __getMessages();

		setFormModalToggle(false);
	};

	const __getMessages = async () => {
		const msgs = await getMessages();
		setMessages(msgs);
	};

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
						<MessageListItem onDelete={__getMessages} key={m.id} message={m} />
					))}
				</IonList>
			</IonContent>
			<IonFab vertical="bottom" horizontal="end">
				<IonFabButton onClick={() => setFormModalToggle(true)}>
					<IonIcon icon={add} />
				</IonFabButton>
			</IonFab>
			<IonModal isOpen={formModalToggle} onWillDismiss={__formDismiss}>
				<MessageForm onDismiss={__formDismiss} />
			</IonModal>
		</IonPage>
	);
};

export default Home;
