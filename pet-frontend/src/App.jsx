import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'

// --- COMPONENT 1: The Dashboard (Your List View) ---
const Dashboard = ({ pets }) => (
  <div className="container fade-in">
    <header>
      <h1>Resident Dashboard</h1>
      <p>Current Shelter Occupancy: {pets.length}</p>
      <Link to="/add" className="nav-button primary-btn">➕ Register New Pet</Link>
    </header>

    <div className="pet-list">
      {pets.length > 0 ? (
        pets.map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="card-header">
              <h3>{pet.name}</h3>
              <span className={pet.is_vaccinated ? "status vax" : "status no-vax"}>
                {pet.is_vaccinated ? "Protected" : "Needs Vax"}
              </span>
            </div>
            <p><strong>{pet.breed || "Unknown Breed"}</strong> ({pet.pet_type})</p>
            <p className="pet-age">Age: {pet.age} years</p>
          </div>
        ))
      ) : (
        <div className="empty-state">
           <p>No residents found. Time to check someone in!</p>
        </div>
      )}
    </div>
  </div>
);

// --- COMPONENT 2: The Multi-Step Form (The Journey) ---
const MultiStepForm = ({ fetchPets }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', pet_type: '', breed: '', age: '', is_vaccinated: false });
  const navigate = useNavigate();

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/pets/', formData);
      fetchPets();
      navigate('/'); // Redirect to dashboard after success
    } catch (err) {
      alert("Error saving pet. Is Django running?");
    }
  };

  return (
    <div className="container fade-in">
      <header>
        <h1>Mweu's Pet Shelter</h1>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${(step/3)*100}%` }}></div>
          <span className="step-text">Step {step} of 3</span>
        </div>
      </header>

      <div className="pet-form">
        {step === 1 && (
          <div className="form-step">
            <h3>Identity Basics</h3>
            <input placeholder="Pet Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input placeholder="Species (e.g., Dog, Cat, Rabbit)" value={formData.pet_type} onChange={e => setFormData({...formData, pet_type: e.target.value})} />
            <button className="nav-button" onClick={nextStep} disabled={!formData.name || !formData.pet_type}>Next Profile Details →</button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Bio & Origin</h3>
            <input placeholder="Breed (Optional)" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} />
            <input type="number" placeholder="Age in Years" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
            <div className="button-row">
              <button className="nav-button secondary" onClick={prevStep}>← Back</button>
              <button className="nav-button" onClick={nextStep} disabled={!formData.age}>Next Health Status →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3>Health Records</h3>
            <label className="vax-check-row">
              Is this resident vaccinated?
              <input type="checkbox" checked={formData.is_vaccinated} onChange={e => setFormData({...formData, is_vaccinated: e.target.checked})} />
            </label>
            <div className="button-row">
              <button className="nav-button secondary" onClick={prevStep}>← Back</button>
              <button className="nav-button finish-btn" onClick={handleSubmit}>Complete & Save</button>
            </div>
          </div>
        )}
      </div>
      <Link to="/" className="cancel-link">Cancel and return to Dashboard</Link>
    </div>
  );
};

// --- MAIN APP (The Wrapper) ---
function App() {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/pets/');
      setPets(res.data);
    } catch (err) { console.error("Database connection failed."); }
  };

  useEffect(() => { fetchPets(); }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard pets={pets} />} />
          <Route path="/add" element={<MultiStepForm fetchPets={fetchPets} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App