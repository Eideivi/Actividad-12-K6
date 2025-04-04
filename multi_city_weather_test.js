import http from 'k6/http';
import { check, sleep } from 'k6';

// Definir las opciones de la prueba
export let options = {
  vus: 100, // 100 usuarios virtuales
  duration: '30s', // Duración de la prueba, 30 segundos
};

// Lista de ciudades para hacer solicitudes aleatorias
const cities = ['London', 'Paris', 'New York', 'Tokyo', 'Berlin', 'Moscow', 'Sydney', 'Toronto'];

// El script se ejecutará con estos usuarios virtuales
export default function () {
  // Elegir una ciudad aleatoria de la lista
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  // La URL de la API de OpenWeatherMap con la clave API y la ciudad aleatoria
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec0b8cd075d2b83e869caeb6ab5de85e`;

  // Hacer una solicitud GET a la API
  const res = http.get(url);

  // Verificar que la respuesta tenga un código de estado 200 (OK)
  check(res, {
    'status es 200': (r) => r.status === 200,
  });

  // Dormir durante 1 segundo entre cada solicitud
  sleep(1);
}
