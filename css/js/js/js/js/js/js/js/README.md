# Viking Village 3D - Mitologia Norrena

Un gioco affascinante di costruzione e gestione di un villaggio vichingo in 3D, basato sulla mitologia norrena e ispirato a Farmville.

## 🎮 Caratteristiche

### Sistema di Gioco
- **Costruzione Villaggio**: Costruisci vari edifici per sviluppare il tuo villaggio
- **Gestione Risorse**: Raccogli grano, legno, pietra e oro
- **Popolazione**: Gestisci gli abitanti del villaggio
- **Felicità**: Mantieni i tuoi abitanti felici costruendo taverne e templi

### Edifici Disponibili
- 🌾 **Fattoria**: Produce grano
- 🪵 **Segheria**: Produce legno
- ⛏️ **Miniera**: Produce pietra e oro
- 🍺 **Taverna**: Aumenta la felicità
- ⚔️ **Caserma**: Aumenta la difesa
- ⛩️ **Tempio Divino**: Connessione con gli dei
- 📦 **Magazzino**: Stoccaggio risorse
- 🏠 **Casa**: Abitazioni

### Mitologia Norrena
Interagisci con gli antichi dei della mitologia norrena:
- **Odino** 🧙: Saggezza e Guerra
- **Thor** ⚡: Temporale e Forza
- **Freyja** 💕: Fertilità e Amore
- **Loki** 🔥: Inganno e Cambiamento
- **Tyr** ⚔️: Guerra e Giustizia

## 🕹️ Controlli

| Tasto | Azione |
|-------|--------|
| **W/A/S/D** | Muovi camera |
| **Spazio** | Zoom avanti |
| **Ctrl** | Zoom indietro |
| **B** | Apri menu costruzione |
| **H** | Raccogli bonus |
| **S** | Impostazioni |
| **Click** | Costruisci edificio (quando in modalità costruzione) |

## 🚀 Come Giocare

1. **Raccogli Risorse**: Il tuo villaggio produce automaticamente risorse ogni secondo
2. **Costruisci Edifici**: Spendi risorse per costruire nuovi edifici
3. **Espandi**: Aumenta la popolazione e la felicità
4. **Migliora**: Aggiorna gli edifici per aumentare la produzione
5. **Prospera**: Crea un grande e prosperoso villaggio vichingo!

## 📋 Requisiti

- Browser moderno con supporto WebGL
- Three.js (caricato da CDN)
- 50MB di spazio di archiviazione

## 🎨 Tecnologie Utilizzate

- **Three.js**: Rendering 3D
- **JavaScript ES6+**: Logica di gioco
- **HTML5**: Struttura
- **CSS3**: Stile interfaccia

## 📝 Installazione

### Metodo 1: Esecuzione Locale
```bash
# Clona il repository
git clone https://github.com/Soniak85Creami/viking-village-3d.git
cd viking-village-3d

# Installa dipendenze
npm install

# Avvia il server
npm start

# Apri il browser su http://localhost:8000
```

### Metodo 2: Deploy su GitHub Pages
1. Abilita GitHub Pages nelle impostazioni del repository
2. Seleziona il branch `main` come sorgente
3. Accedi al gioco su `https://Soniak85Creami.github.io/viking-village-3d`

### Metodo 3: Deploy Online
Puoi deployare direttamente su:
- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Soniak85Creami/viking-village-3d)
- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Soniak85Creami/viking-village-3d)
- **GitHub Pages**: Enablea nelle impostazioni

## 🎮 Screenshot Descrittivo

```
┌─────────────────────────────────────────────────┐
│  🌾 100  🪵 50  ⛏️ 30  ⚔️ 20  👥 10            │
├─────────────────────────────────────────────────┤
│                                                  │
│           VISTA 3D DEL VILLAGGIO               │
│                                                  │
│         [🏠] [🌾] [⛏️] [🍺]                    │
│                                                  │
│                                                  │
└─────────────────────────────────────────────────┘
  [Costruisci] [Raccogli] [Impostazioni]
```

## 📊 Statistiche di Gioco

- **Tempo di Gioco**: 10-20 ore per completamento
- **Difficoltà**: Facile - Media
- **Scalabilità**: Infinita
- **Obiettivi**: Creare il villaggio più prospero

## 🔧 Personalizzazione

### Aggiungi Nuovi Edifici
Modifica `js/buildings.js`:
```javascript
const buildingTypes = {
    myBuilding: {
        name: 'Il Mio Edificio',
        icon: '🏛️',
        cost: { wood: 50, stone: 50 },
        production: { grain: 5 },
        population: 5,
        happiness: 10,
        scale: 1.2
    }
};
```

### Modifica Difficoltà
In `js/resources.js`, cambia i valori di produzione:
```javascript
this.production = {
    grain: 5,      // Aumenta da 2 a 5
    wood: 2.5,     // Aumenta da 1 a 2.5
    stone: 1,
    gold: 0.5
};
```

## 🐛 Troubleshooting

### "Bianca schermata"
- Verifica che il browser supporti WebGL
- Prova con un browser diverso (Chrome, Firefox, Edge)

### "Bassa Performance"
- Riduci la qualità grafica
- Chiudi altri programmi
- Aggiorna i driver della GPU

### "Errore di Caricamento"
- Svuota la cache del browser
- Verifica la connessione internet
- Controlla la console del browser (F12)

## 📝 Roadmap Futura

- [ ] Sistema di combattimento
- [ ] Commercio tra villaggi
- [ ] Campagne di gioco
- [ ] Moltiplicatore online
- [ ] Mobile optimizzazione
- [ ] Salvataggio cloud
- [ ] Achievement system
- [ ] Skin personalizzati

## 🤝 Contribuire

Le pull request sono benvenute! Per modifiche importanti:
1. Fai un fork del repository
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit i cambiamenti (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è concesso in licenza sotto la Licenza MIT - vedi il file [LICENSE](LICENSE) per dettagli.

## 🙏 Ringraziamenti

- **Three.js**: Per il meraviglioso framework 3D
- **Mitologia Norrena**: Per l'ispirazione
- **Community di Gamedev**: Per il supporto

## 📞 Contatti

- **GitHub**: [Soniak85Creami](https://github.com/Soniak85Creami)
- **Email**: soniak85creami@example.com

## 🎯 Prossimi Passi

1. **Gioca al gioco**: Scarica e prova il gioco
2. **Personalizza**: Aggiungi le tue meccaniche preferite
3. **Condividi**: Fai sapere al mondo il tuo villaggio!
4. **Contribuisci**: Aiuta a migliorare il progetto

---

**Versione**: 1.0.0  
**Data di Rilascio**: 2026-03-24  
**Status**: ✅ Pronto per la Pubblicazione

Buon divertimento costruendo il tuo leggendario villaggio vichingo! ⚔️🛡️🏰
