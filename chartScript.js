// Cargar el archivo JSON de resultados de k6
fetch('resultado.json')  
  .then(response => response.json())
  .then(data => {
    // Verificar la estructura de los datos
    console.log(data);  // Verifica la estructura del archivo JSON
    const timestamps = data['metrics'].map(item => item.timestamp);  // Ajusta si es necesario
    const responseTimes = data['metrics'].map(item => item.response_time);  // Ajusta si es necesario

    console.log(timestamps);  // Verifica los timestamps
    console.log(responseTimes);  // Verifica los tiempos de respuesta

    // Crear el gráfico con Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',  // Tipo de gráfico: línea
        data: {
            labels: timestamps,  // El eje X será el tiempo (timestamps)
            datasets: [{
                label: 'Tiempo de Respuesta',  // Etiqueta del gráfico
                data: responseTimes,  // Los datos del gráfico (tiempo de respuesta)
                borderColor: 'rgba(75, 192, 192, 1)',  // Color de la línea
                borderWidth: 1,
                fill: false  // No llenar el área debajo de la línea
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true  // El eje Y comenzará en 0
                }
            }
        }
    });
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));