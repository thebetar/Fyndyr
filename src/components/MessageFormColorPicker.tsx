import {
	IonButton,
	IonButtons,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
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

const colors = [
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
			</IonContent>
		</>
	);
};

export default MessageFormColorPicker;
