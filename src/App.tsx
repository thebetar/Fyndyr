import { IonApp, IonPage, IonSpinner, setupIonicReact } from '@ionic/react';

import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import { initStore, loadMessages } from './data/messages';

setupIonicReact();

const App: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		__init();
	});

	async function __init() {
		await initStore();

		await loadMessages();
		setLoading(false);
	}

	return (
		<IonApp>
			{loading ? (
				<IonPage className="h-full w-full flex justify-center items-center">
					<IonSpinner className="w-20 h-20" />
				</IonPage>
			) : (
				<Home />
			)}
		</IonApp>
	);
};

export default App;
