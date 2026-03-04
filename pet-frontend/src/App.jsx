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
      const res = await axios.get('https://djangonextsteps.onrender.com/api/pets/');
      setPets(res.data);
    } catch (err) { console.error("Is Django running on port 8000?"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8000/api/pets/', formData);
    setFormData({ name: '', pet_type: '', breed: '', age: '', is_vaccinated: false });
    fetchPets();
  };

  return (
    <div className="container">
      <header>
        <h1>🐾 Mweu's Pet Shelter</h1>
        <p>Full-Stack Django + React System</p>
      </header>

      <form onSubmit={handleSubmit} className="pet-form">
        <input placeholder="Pet Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input placeholder="Species" value={formData.pet_type} onChange={e => setFormData({...formData, pet_type: e.target.value})} required />
        <input placeholder="Breed" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} />
        <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
        <label className="vax-check">
          Vaccinated? 
          <input type="checkbox" checked={formData.is_vaccinated} onChange={e => setFormData({...formData, is_vaccinated: e.target.checked})} />
        </label>
        <button type="submit">Add Resident</button>
      </form>

      <div className="pet-list">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card">
            <h3>{pet.name}</h3>
            <p>{pet.breed} ({pet.pet_type}) • {pet.age} yrs</p>
            <span className={pet.is_vaccinated ? "status vax" : "status no-vax"}>
              {pet.is_vaccinated ? "Fully Vaccinated" : "Needs Vaccination"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App