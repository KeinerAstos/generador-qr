
# 🌀 Generador de Códigos QR con Google Cloud Functions

## 📋 Descripción del proyecto y funcionalidades

Este proyecto implementa un **servicio serverless** en **Google Cloud Functions** que genera **códigos QR** a partir de un texto o URL enviado por el usuario mediante una solicitud HTTP `POST`.

La función recibe un JSON con el campo `"data"`, crea el código QR usando la librería `qrcode`, lo convierte a imagen PNG codificada en base64 y lo devuelve al cliente.

### Funcionalidades principales:
- Generación de códigos QR desde texto o enlaces.  
- Respuesta en formato JSON con el QR codificado en base64.  
- Compatible con solicitudes HTTP desde aplicaciones web.  
- Implementación del modelo **serverless** sin necesidad de gestionar servidores.  
- Soporte CORS para permitir acceso desde páginas externas.  

---

## 🧱 Arquitectura serverless implementada

El sistema se basa en la arquitectura **Serverless** proporcionada por Google Cloud:

```
[Frontend HTML/JS]  --->  [HTTP Request]  --->  [Google Cloud Function: generate-qr]
                                                |
                                                └──> Genera código QR (librerías Python)
```

- **Frontend:** Página web simple (`index.html`) que envía el texto mediante `fetch()` a la función.  
- **Backend:** Función Cloud (`generate-qr`) que procesa la solicitud, genera el QR y responde con JSON.  
- **Infraestructura:** Administrada por Google Cloud (sin servidores, autoescalable y facturable por uso).  

---

## ⚙️ Lista de Cloud Functions y sus propósitos

| Nombre de la función | Descripción | Trigger | Estado |
|----------------------|-------------|----------|---------|
| `generate-qr` | Genera un código QR en base64 a partir de texto o URL recibidos. | HTTP | Activa |

---

## 🌐 APIs externas utilizadas

Este proyecto no depende de APIs externas.  
Todas las funcionalidades se implementan con librerías locales de Python:  
- `qrcode` → Generación de códigos QR.  
- `Pillow` → Manipulación de imágenes.  
- `Flask-Cors` → Habilitación de CORS.  
- `functions-framework` → Interfaz con Google Cloud Functions.  

---

## ⚙️ Instrucciones de instalación y configuración

### Requisitos previos:
- Python 3.10 o superior  
- Google Cloud SDK (`gcloud`) configurado  
- Proyecto activo en Google Cloud con **Cloud Functions API** habilitada  

### Instalación local:
```bash
pip install -r requirements.txt
```

### Estructura del proyecto:
```
serverless-qr/
│
├── functions/
│   └── generate-qr/
│       ├── main.py
│       ├── requirements.txt
│       └── index.html
│
└── README.md
```

---

## 🚀 Comandos de despliegue paso a paso

1. **Autenticarse en Google Cloud**
   ```bash
   gcloud auth login
   ```

2. **Seleccionar el proyecto**
   ```bash
   gcloud config set project generador-qr-keiner-475702
   ```

3. **Desplegar la función**
   ```bash
   gcloud functions deploy generate-qr ^
     --entry-point generate_qr ^
     --runtime python310 ^
     --trigger-http ^
     --allow-unauthenticated ^
     --no-gen2 ^
     --region=us-central1
   ```

4. **Verificar el estado de la función**
   ```bash
   gcloud functions list
   ```

---

## 🌍 URLs de acceso a la aplicación funcionando

- **Endpoint principal (Cloud Function):**  
  https://us-central1-generador-qr-keiner-475702.cloudfunctions.net/generate-qr  

- **Frontend local (index.html):**  
  Abre el archivo `index.html` en el navegador y envía texto o URL para generar el código QR.

---
![alt text](image.png)

1. **Estructura del proyecto local.**  
2. **Despliegue exitoso en la terminal (status: ACTIVE).**  
3. **Prueba del endpoint mostrando el JSON con el QR en base64.**  
4. **Visualización del código QR generado desde la página HTML.**  
5. **Vista de la función activa en la consola de Google Cloud.**  

*(Las capturas deben agregarse manualmente en el repositorio o en la entrega del informe.)*

---

## 💰 Costos estimados del proyecto

El servicio **Google Cloud Functions** cobra por número de ejecuciones y tiempo de CPU utilizado.  
Dado que esta función es pequeña y se ejecuta rápidamente, el costo estimado es:

| Concepto | Costo aproximado | Observaciones |
|-----------|------------------|---------------|
| 2 millones de invocaciones/mes | **Gratis** (dentro del nivel gratuito) | Incluido en la capa gratuita |
| Tiempo de ejecución | < 0.01 USD/mes | Uso bajo |
| Transferencia de datos | 0.00 USD | Datos pequeños en JSON |

**Total estimado mensual:** 0.00 USD (nivel gratuito de GCP)

---

## ⚡ Ventajas del modelo serverless observadas

- No requiere administrar servidores ni infraestructura.  
- Escalabilidad automática según la demanda.  
- Pago únicamente por ejecución (sin costo cuando está inactiva).  
- Implementación rápida con pocos archivos.  
- Ideal para microservicios o funciones específicas (como generación de QR).  

---

## ⚠️ Limitaciones encontradas durante el desarrollo

- Los **errores de dependencias** pueden causar fallos al iniciar la función (por ejemplo, `Pillow` requerido).  
- El **tiempo de despliegue** puede ser alto (1–2 minutos por cambio).  
- Se requiere habilitar varias APIs manualmente (Cloud Functions, Cloud Build, Cloud Run).  
- Límite de tiempo de ejecución por función (60 segundos en plan gratuito).  
- Dificultad inicial para depurar errores desde los logs.  

---

## ✍️ Autor

**Keiner Astos**  
Actividad 06 – *Cloud Functions – Generador de Códigos QR*  
