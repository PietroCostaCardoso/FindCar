import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast, IonLoading, IonGrid, IonRow, IonCol, IonCardSubtitle, IonItem, IonLabel, IonInput, IonAlert, IonList } from '@ionic/react';
import { useState, useEffect } from 'react';
import { car, map, location, logOutOutline } from 'ionicons/icons';
import './Home.css';
import useParkingCost from './useParkingCost';
import { calculateParkingDetails } from './parkingUtils';

const Home = () => {
  const [savedLocation, setSavedLocation] = useState(null);
  const [history, setHistory] = useState([]);
  const [showClearHistoryAlert, setShowClearHistoryAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', color: '' });
  const [hourlyRate, setHourlyRate] = useState('');
  const [showCostAlert, setShowCostAlert] = useState(false);
  const [costInfo, setCostInfo] = useState({ duration: '', total: 0 });
  const currentCost = useParkingCost(savedLocation, hourlyRate);

  useEffect(() => {
    const location = localStorage.getItem('parkingLocation');
    if (location) {
      setSavedLocation(JSON.parse(location));
    }
    const storedHistory = localStorage.getItem('parkingHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const saveLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem('parkingLocation', JSON.stringify(newLocation));
        setSavedLocation(newLocation);
        setLoading(false);
        setToast({ show: true, message: 'Localização salva com sucesso!', color: 'success' });
      }, (error) => {
        console.error("Erro ao obter localização: ", error);
        setLoading(false);
        setToast({ show: true, message: 'Não foi possível obter sua localização. Verifique as permissões.', color: 'danger' });
      });
    } else {
      setLoading(false);
      setToast({ show: true, message: 'Geolocalização não é suportada por este navegador.', color: 'danger' });
    }
  };

  const viewOnMap = (location) => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    }
  };

  const handleLeave = () => {
    if (savedLocation) {
      const { duration, total } = calculateParkingDetails(
        savedLocation.timestamp,
        new Date(),
        hourlyRate || 0
      );
      setCostInfo({ duration, total });
      setShowCostAlert(true);
    }
  };

  const clearLocation = () => {
    const storedHistory = JSON.parse(localStorage.getItem('parkingHistory') || '[]');
    const newEntry = {
      ...savedLocation,
      endTime: new Date().toISOString(),
      duration: costInfo.duration,
      total: costInfo.total,
    };
    const updatedHistory = [newEntry, ...storedHistory];
    localStorage.setItem('parkingHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);

    localStorage.removeItem('parkingLocation');
    setSavedLocation(null);
    setHourlyRate('');
    setCostInfo({ duration: '', total: 0 });
    setToast({ show: true, message: 'Vaga liberada e salva no histórico.', color: 'success' });
  };

  const confirmClearHistory = () => {
    localStorage.removeItem('parkingHistory');
    setHistory([]);
    setToast({ show: true, message: 'Histórico de vagas limpo.', color: 'medium' });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="app-toolbar">
          <IonTitle>
            <div className="app-title">
              <IonIcon icon={map} />
              <span>FindCar</span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={loading} message={'Obtendo localização...'} />
        <IonToast
          isOpen={toast.show}
          onDidDismiss={() => setToast({ show: false, message: '', color: '' })}
          message={toast.message}
          duration={2000}
          color={toast.color}
        />
        <IonAlert
          isOpen={showCostAlert}
          onDidDismiss={() => setShowCostAlert(false)}
          header={'Resumo do Estacionamento'}
          message={`Tempo: ${costInfo.duration}\nTotal a Pagar: R$ ${costInfo.total.toFixed(2)}`}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'Confirmar Saída',
              handler: clearLocation
            }
          ]}
        />
        <IonAlert
          isOpen={showClearHistoryAlert}
          onDidDismiss={() => setShowClearHistoryAlert(false)}
          header={'Limpar Histórico'}
          message={'Tem certeza que deseja apagar todo o histórico de vagas?'}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Apagar', handler: confirmClearHistory }
          ]}
        />
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="app-title-large">FindCar</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8" size-lg="6">
              {!savedLocation ? (
                <IonCard className="welcome-card">
                  <IonCardHeader>
                    <IonIcon icon={car} size="large" color="primary" />
                    <IonCardTitle>Bem-vindo!</IonCardTitle>
                    <IonCardSubtitle>Nunca mais perca sua vaga</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Clique no botão abaixo para salvar a localização do seu veículo.</p>
                    <IonButton expand="block" onClick={saveLocation} className="ion-margin-top">
                      <IonIcon slot="start" icon={location} />
                      Onde eu estacionei?
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ) : (
                <IonCard className="location-card">
                  <IonCardHeader>
                    <IonCardTitle>Sua vaga está salva!</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p><strong>Latitude:</strong> {savedLocation.lat.toFixed(5)}</p>
                    <p><strong>Longitude:</strong> {savedLocation.lng.toFixed(5)}</p>
                    <p><strong>Tempo:</strong> {currentCost.duration}</p>
                    <p><strong>Custo Atual:</strong> R$ {currentCost.total.toFixed(2)}</p>
                    
                    <IonItem className="ion-margin-top">
                      <IonLabel position="stacked">Valor da Hora (R$)</IonLabel>
                      <IonInput 
                        type="number" 
                        placeholder="0.00"
                        value={hourlyRate} 
                        onIonChange={e => setHourlyRate(e.detail.value)}
                      />
                    </IonItem>

                    <IonButton expand="block" onClick={() => viewOnMap(savedLocation)} className="ion-margin-top">
                      <IonIcon slot="start" icon={map} />
                      Ver no mapa
                    </IonButton>
                    <IonButton expand="block" color="danger" onClick={handleLeave} className="ion-margin-top">
                      <IonIcon slot="start" icon={logOutOutline} />
                      Sair da Vaga
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              )}

              {history.length > 0 && (
                <IonCard className="history-card">
                  <IonCardHeader>
                    <IonCardTitle>Últimas Vagas</IonCardTitle>
                    <IonButton fill="clear" size="small" onClick={() => setShowClearHistoryAlert(true)}>
                      Limpar
                    </IonButton>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      {history.map((item, index) => (
                        <IonItem key={index} lines="none">
                          <IonLabel>
                            <h2>{new Date(item.timestamp).toLocaleString('pt-BR')}</h2>
                            <p>Duração: {item.duration}</p>
                            <p>Custo: R$ {item.total.toFixed(2)}</p>
                          </IonLabel>
                          <IonButton fill="clear" slot="end" onClick={() => viewOnMap(item)}>
                            <IonIcon icon={map} />
                          </IonButton>
                        </IonItem>
                      ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Home;
