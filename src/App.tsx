import './App.css';
import { EventsProvider } from './context/EventsList'
import EventsList from './components/EventsList';

function App() {
  return (
    <EventsProvider>
      <div className="eventsListsContainer">
        <EventsList type='unselected'/>
        <EventsList type='selected'/>
      </div>
    </EventsProvider>
  );
}

export default App;
