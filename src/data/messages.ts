import { Storage } from '@ionic/storage';
import { v4 } from 'uuid';

export interface Message {
	id?: string;
	date?: string;
	message: string;
	primaryColor: string;
	secondaryColor: string;
	speed: string;
}

export const DEFAULT_PRIMARY_COLOR = '#000000';
export const DEFAULT_SECONDARY_COLOR = '#FFFFFF';

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

export const getMessage = (id: string): Message => messages.find(m => m.id === id)!;

export const addMessage = ({ message, primaryColor, secondaryColor, speed }: Message) => {
	const newMessage = {
		id: v4(),
		date: new Date().toISOString(),
		message,
		primaryColor,
		secondaryColor,
		speed
	};
	messages.push(newMessage);
	store.set('messages', messages);
};

export const updateMessage = async (id: string, message: Message) => {
	const index = messages.findIndex(m => m.id === id);
	messages[index] = message;
	await store.set('messages', messages);
};

export const deleteMessage = async (id: string) => {
	messages = messages.filter(m => m.id !== id);
	await store.set('messages', messages);
};
