import {
	IonButton,
	IonButtons,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonRow,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React from 'react';

interface MessageFormColorPickerProps {
	onDismiss: (change: boolean) => void;
	onSelect: (color: string) => void;
}

const DEFAULT_COLORS = [
	['#000000', '#999999', '#FFFFFF'],
	['#FF0000', '#FF8000', '#FFFF00'],
	['#80FF00', '#00FF00', '#00FF80'],
	['#00FFFF', '#0080FF', '#0000FF'],
	['#7F00F    F', '#FF00FF', '#FF007F'],
	['#FF8080', '#FFC080', '#FFFF80'],
	['#80FF80', '#80FFC0', '#80FFFF'],
	['#8080FF', '#C080FF', '#FF80FF'],
	['#FFC0C0', '#FFE0C0', '#FFFFC0'],
	['#C0FFC0', '#C0FFE0', '#C0FFFF'],
	['#C0C0FF', '#E0C0FF', '#FFC0FF']
];

export const MessageFormColorPicker: React.FC<MessageFormColorPickerProps> = ({ onDismiss, onSelect }) => {
	const [colors, setColors] = React.useState(DEFAULT_COLORS);

	function addColors(amount: number) {
		const newColors = [];
		for (let i = 0; i < amount; i++) {
			const row = [];
			for (let j = 0; j < 3; j++) {
				row.push(generateHexColor());
			}
			newColors.push(row);
		}
		setColors([...colors, ...newColors]);
	}

	function generateHexColor() {
		let hexColor = '#';
		for (let i = 0; i < 6; i++) {
			hexColor += Math.floor(Math.random() * 16).toString(16);
		}
		return hexColor;
	}

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton onClick={onDismiss as any}>
							<IonIcon icon={arrowBack} slot="icon-only" />
						</IonButton>
					</IonButtons>
					<IonTitle>Color Picker</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid className="ion-no-padding">
					{colors.map((row, i) => (
						<IonRow key={i}>
							{row.map((color, j) => (
								<IonCol
									key={j}
									style={{ backgroundColor: color }}
									className="w-1/4 aspect-square"
									onClick={() => onSelect(color)}
								></IonCol>
							))}
						</IonRow>
					))}
				</IonGrid>
				<IonInfiniteScroll
					onIonInfinite={e => {
						addColors(9);
						e.target.complete();
					}}
				>
					<IonInfiniteScrollContent></IonInfiniteScrollContent>
				</IonInfiniteScroll>
			</IonContent>
		</>
	);
};

export default MessageFormColorPicker;
