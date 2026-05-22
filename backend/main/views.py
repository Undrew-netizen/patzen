import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Product, SupportTicket


def health_check(request):
    return JsonResponse({"status": "ok"})


def product_list(request):
    products = Product.objects.filter(is_active=True)
    return JsonResponse({"products": [product.to_dict() for product in products]})


@csrf_exempt
@require_http_methods(["POST"])
def create_support_ticket(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body."}, status=400)

    required_fields = ["name", "email", "topic", "message"]
    missing_fields = [field for field in required_fields if not str(payload.get(field, "")).strip()]
    if missing_fields:
        return JsonResponse({"error": "Missing required fields.", "fields": missing_fields}, status=400)

    ticket = SupportTicket.objects.create(
        name=payload["name"].strip(),
        email=payload["email"].strip(),
        order_number=str(payload.get("orderNumber", "")).strip(),
        topic=payload["topic"].strip(),
        message=payload["message"].strip(),
    )

    return JsonResponse({"id": ticket.id, "status": "received"}, status=201)
