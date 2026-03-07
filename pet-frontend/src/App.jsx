import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    name: '', pet_type: '', breed: '', age: '', is_vaccinated: false
  });

  useEffect(() => { fetchPets(); }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get('https://my-pet-api.vercel.app/api/pets/'); // Ideally your prod backend URL, or fallback to localhost
      setPets(res.data);
    } catch (err) { 
      console.warn("Could not fetch from prod URL. Trying local...");
      try {
        const localRes = await axios.get('http://127.0.0.1:8000/api/pets/');
        setPets(localRes.data);
      } catch (localErr) {
        console.error("Is Django running on port 8000?", localErr);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // For testing, sending to localhost. You should use a dynamic API_URL in prod.
      await axios.post('http://127.0.0.1:8000/api/pets/', formData);
      setFormData({ name: '', pet_type: '', breed: '', age: '', is_vaccinated: false });
      fetchPets();
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🐾 Mweu's Pet Shelter</h1>
        <p>Full-Stack Django + React System</p>
      </header>

      <form onSubmit={handleSubmit} className="pet-form">
        <div className="input-group">
          <input 
            type="text"
            placeholder="Pet Name" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            type="text"
            placeholder="Species (e.g. Dog)" 
            value={formData.pet_type} 
            onChange={e => setFormData({...formData, pet_type: e.target.value})} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="text"
            placeholder="Breed (Optional)" 
            value={formData. breed} 
            onChange={e => setFormData({...formData, breed: e.target.value})} 
          />
          <input 
            type="number" 
            placeholder="Age (Years)" 
            value={formData.age} 
            onChange={e => setFormData({...formData, age: e.target.value})} 
            required 
            min="0"
          />
        </div>
        <label className="vax-check">
          <span>Fully Vaccinated?</span>
          <input 
            type="checkbox" 
            checked={formData.is_vaccinated} 
            onChange={e => setFormData({...formData, is_vaccinated: e.target.checked})} 
          />
        </label>
        <button type="submit">Add Resident</button>
      </form>

      <div className="pet-list">
        {pets.length === 0 ? (
           <p style={{color: '#71717a'}}>No pets added yet. Be the first!</p>
        ) : (
          pets.map(pet => (
            <div key={pet.id} className="pet-card">
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>{pet.breed ? `${pet.breed} ` : ''}({pet.pet_type}) • {pet.age} {pet.age === 1 ? 'yr' : 'yrs'} old</p>
              </div>
              <div className="pet-status">
                <span className={pet.is_vaccinated ? "status vax" : "status no-vax"}>
                  {pet.is_vaccinated ? "Vaccinated" : "Not Vaccinated"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App