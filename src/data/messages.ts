import { Storage } from '@ionic/storage';
import { v4 } from 'uuid';

export interface Message {
	message: string;
	date: string;
	id: string;
}

export const store = new Storage();

export const initStore = async () => {
	await store.create();
};

let messages: Message[] = [];

export const loadMessages = async () => {
	const data = await store.get('messages');
	if (data) {
		messages = data;
	}
};

export const loadAndGetMessages = async () => {
	await loadMessages();
	return messages;
};

export const getMessages = async () => {
	return messages;
};

export const getMessage = (id: string) => messages.find(m => m.id === id);

export const addMessage = (message: string) => {
	const newMessage = {
		id: v4(),
		message,
		date: new Date().toISOString()
	};
	messages.push(newMessage);
	store.set('messages', messages);
};

export const deleteMessage = (id: string) => {
	messages = messages.filter(m => m.id !== id);
	store.set('messages', messages);
};
