import functions_framework
import qrcode
import base64
from io import BytesIO
from flask_cors import cross_origin

@functions_framework.http
@cross_origin()
def generate_qr(request):
    try:
        request_json = request.get_json(silent=True)
        data = request_json.get("data") if request_json else None

        if not data:
            return {"error": "No data provided"}, 400
        # Generar QR
        qr = qrcode.make(data)
        buffered = BytesIO()
        qr.save(buffered, format="PNG")  # ahora sí con format porque usamos Pillow
        qr_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {"qr": qr_base64}, 200

    except Exception as e:
        return {"success": False, "error": str(e)}, 500
