import React, { useEffect, useState } from 'react';
import { fetchGnomes } from './api';
import SearchBar from './SearchBar';
import './GnomeList.css';
import emptyStarImage from './images/Star.png';
import filledStarImage from './images/Empty Star.png';

function GnomeList() {
  const [gnomes, setGnomes] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedGnome, setSelectedGnome] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gnomesPerPage] = useState(10);
  const [favorites, setFavorites] = useState([]);
  const [paginationStart, setPaginationStart] = useState(0);
  const [filteredGnomes, setFilteredGnomes] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setLoading(true); 
    fetchGnomes().then(data => {
      setGnomes(data.Brastlewark);
      setFilteredGnomes(data.Brastlewark);
      setLoading(false);
    });
  }, []);
  const gnomesByProfession = gnomes.reduce((acc, gnome) => {
    gnome.professions.forEach(profession => {
      if (!acc[profession]) {
        acc[profession] = [];
      }
      acc[profession].push(gnome);
    });
    return acc;
  }, {});

  const addToFavorites = (gnome) => {
    if (favorites.some(favorite => favorite.id === gnome.id)) {
      setFavorites(favorites.filter(favorite => favorite.id !== gnome.id));
      console.log(`Removed ${gnome.name} from favorites.`);
    } else {
      setFavorites([...favorites, gnome]);
      console.log(`Added ${gnome.name} to favorites.`);
    }
  };

  const professions = Object.keys(gnomesByProfession);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const filterGnomes = (searchString) => {
    const filtered = gnomes.filter(gnome => {
      return gnome.name.toLowerCase().includes(searchString.toLowerCase()) ||
        gnome.age.toString() === searchString ||
        gnome.weight.toString().startsWith(searchString) ||
        gnome.height.toString().startsWith(searchString) ||
        gnome.hair_color.toLowerCase() === searchString.toLowerCase() ||
        gnome.friends.some(friend => friend.toLowerCase().includes(searchString.toLowerCase()));
    });
    setFilteredGnomes(filtered);
  };

  const filterGnomesByAttribute = (searchString, attribute) => {
    const filtered = gnomes.filter(gnome => {
      return gnome[attribute].toString().toLowerCase().includes(searchString.toLowerCase());
    });
    setFilteredGnomes(filtered);
  };

  const toggleProfession = (profession) => {
    let newSelectedProfessions;
    
    if (selectedProfessions.includes(profession)) {
      newSelectedProfessions = selectedProfessions.filter(p => p !== profession);
    } else {
      newSelectedProfessions = [...selectedProfessions, profession];
    }
  
    setSelectedProfessions(newSelectedProfessions);
  
    if (newSelectedProfessions.length > 0) {
      setFilteredGnomes(gnomes.filter(gnome => gnome.professions.some(p => newSelectedProfessions.includes(p))));
    } else {
      setFilteredGnomes(gnomes);
    }
  };


  return (
    <div className="gnome-container">
<div className="search-and-filter-section">
  <SearchBar onSearch={filterGnomes} />

  <div className="filter-section">
    <input type="number" placeholder="age" onChange={(e) => filterGnomesByAttribute(e.target.value, 'age')} />
    <input type="number" placeholder="weight" onChange={(e) => filterGnomesByAttribute(e.target.value, 'weight')} />
    <input type="number" placeholder="height" onChange={(e) => filterGnomesByAttribute(e.target.value, 'height')} />
    <input type="text" placeholder="hair color" onChange={(e) => filterGnomesByAttribute(e.target.value, 'hair_color')} />
  </div>
</div>
      <div className="profession-buttons">
        {professions.filter(profession => 
          profession.toLowerCase().includes(search.toLowerCase()) ||
          gnomesByProfession[profession].some(gnome => gnome.name.toLowerCase().includes(search.toLowerCase()))
        ).map(profession => (
          <button key={profession} onClick={() => toggleProfession(profession)} style={{ backgroundColor: selectedProfessions.includes(profession) ? '#004d00' : '#008000' }}>
          {profession}
        </button>
        ))}
      </div>

      <div className="gnome-content">
        <div className="gnome-list">
          <div>
            <h2>{selectedProfessions.length > 0 ? selectedProfessions.join(', ') : 'All Gnomes'}</h2>
            <table>
              <thead>
                <tr> 
                  <th>Profile picture</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
  {filteredGnomes.slice((currentPage - 1) * gnomesPerPage, currentPage * gnomesPerPage).length > 0 ? (
    filteredGnomes.slice((currentPage - 1) * gnomesPerPage, currentPage * gnomesPerPage).map(gnome => (
      <tr key={gnome.id}>                  
        <td>
          <div onClick={() => { console.log(gnome); setSelectedGnome(gnome); }} style={{ cursor: 'pointer' }}>
            <img src={gnome.thumbnail} loading='lazy' alt={gnome.name} style={{ width: '100px', height: '100px' }} />
          </div>
        </td>
        <td>
          <div onClick={() => { console.log(gnome); setSelectedGnome(gnome); }} style={{ cursor: 'pointer' }}>
            {gnome.name}
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2">No matching gnome found</td>
    </tr>
  )}
</tbody>
        </table>
      </div>
          
          {favorites.length > 0 && (
            <div className="favorites-list">
              <div>
                <h2>Favorites</h2>
                <table>
                  <thead>
                    <tr> 
                      <th>Profile picture</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map(gnome => (
                      <tr key={gnome.id}>                  
                        <td><div onClick={() => { console.log(gnome); setSelectedGnome(gnome); }} style={{ cursor: 'pointer' }}><img src={gnome.thumbnail} alt={gnome.name} style={{ width: '100px', height: '100px' }} /></div></td>
                        <td><div onClick={() => { console.log(gnome); setSelectedGnome(gnome); }} style={{ cursor: 'pointer' }}>{gnome.name}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        {selectedGnome && (
    <div className="gnome-details">
      <div>
        <button onClick={() => addToFavorites(selectedGnome)}>
          <img 
            className="top-right" 
            src={favorites.some(favorite => favorite.id === selectedGnome.id) ? filledStarImage:  emptyStarImage} 
            alt="star" 
          />
        </button>
        <h2>{selectedGnome.name}</h2>    
        <p>Age: {selectedGnome.age}</p>
        <img src={selectedGnome.thumbnail} loading='lazy' alt={selectedGnome.name} style={{ width: '100%', height: '250px' }} />
        <p>Weight: {selectedGnome.weight}</p>
        <p>Height: {selectedGnome.height}</p>
        <p>Hair Color: {selectedGnome.hair_color}</p>
        <p>Gender: {selectedGnome.type}</p>
        <p className="friends">Friends:<br />{selectedGnome.friends.join(', ')}</p>            
      </div>
    </div>
  )}
<div className="footer">
  <div className="pagination">
    <button onClick={() => {
      paginate(1);
      setPaginationStart(0);
    }}>
      1
    </button>
    {paginationStart > 0 && <span>...</span>}
    {Array(Math.ceil(filteredGnomes.length / gnomesPerPage)).fill().map((_, i) => {
      const totalPages = Math.ceil(filteredGnomes.length / gnomesPerPage);
      if ((i >= paginationStart && i < paginationStart + 9) || i === totalPages - 1 || i === paginationStart - 1) {
        return (
          <button key={i} onClick={() => { 
            paginate(i + 1); 
            if (i < paginationStart) {
              setPaginationStart(Math.max(0, paginationStart - 9));
            } else {
              setPaginationStart(i);
            }
          }}>
            {i + 1}
          </button>
        );
      }
      if (i === paginationStart + 9) {
        return <span>...</span>;
      }
      return null;
    })}
    {paginationStart + 9 < Math.ceil(filteredGnomes.length / gnomesPerPage) - 1 && <span></span>}
  </div>
</div>
        </div>
      </div>
  );
}

export default GnomeList;