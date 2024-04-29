export function fetchGnomes() {
  return fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
    .then(response => response.json())
    .then(data => {
      const types = ['Gnomes of the Depths', 'Forest Gnomes', 'Rock Gnomes'];
      data.Brastlewark = data.Brastlewark.map(gnome => {
        const randomType = types[Math.floor(Math.random() * types.length)];
        return { ...gnome, type: randomType };
      });
      return data;
    })
    .catch(error => console.error('Erreur:', error));
}