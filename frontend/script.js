const API_URL = "https://us-central1-generador-qr-keiner-475702.cloudfunctions.net/generate-qr";

document.getElementById('generateBtn').addEventListener('click', async () => {
  const text = document.getElementById('text').value.trim();
  const resultDiv = document.getElementById('result');
  const loading = document.getElementById('loading');
  resultDiv.innerHTML = '';

  if (!text) {
    alert('Por favor, ingresa un texto o URL.');
    return;
  }

  loading.classList.remove('hidden');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: text }) // 👈 el backend espera "data"
    });

    const data = await res.json();

    if (data.qr) {
      resultDiv.innerHTML = `
        <img src="data:image/png;base64,${data.qr}" alt="QR Code">
        <br>
        <a id="downloadLink" href="data:image/png;base64,${data.qr}" download="codigo_qr.png">
          Descargar QR
        </a>
      `;
    } else {
      resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p>Error: ${err.message}</p>`;
  }

  loading.classList.add('hidden');
});
