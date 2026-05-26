import json

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import viewsets

from .models import Product, SupportTicket
from .serializers import ProductSerializer


def health_check(request):
    return JsonResponse({"status": "ok"})


def user_to_dict(user):
    return {
        "id": user.id,
        "email": user.email,
        "firstName": user.first_name,
        "lastName": user.last_name,
        "name": user.get_full_name() or user.username,
    }


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


@csrf_exempt
@require_http_methods(["GET"])
def current_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({"user": None})

    return JsonResponse({"user": user_to_dict(request.user)})


@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body."}, status=400)

    first_name = str(payload.get("firstName", "")).strip()
    last_name = str(payload.get("lastName", "")).strip()
    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", ""))

    missing_fields = [
        field
        for field, value in {
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": password,
        }.items()
        if not value
    ]
    if missing_fields:
        return JsonResponse({"error": "Missing required fields.", "fields": missing_fields}, status=400)

    User = get_user_model()
    if User.objects.filter(email__iexact=email).exists():
        return JsonResponse({"error": "An account with that email already exists."}, status=400)

    user = User(username=email, email=email, first_name=first_name, last_name=last_name)

    try:
        validate_password(password, user)
    except ValidationError as error:
        return JsonResponse({"error": " ".join(error.messages)}, status=400)

    user.set_password(password)
    user.save()
    login(request, user)

    return JsonResponse({"user": user_to_dict(user)}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body."}, status=400)

    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", ""))
    if not email or not password:
        return JsonResponse({"error": "Email and password are required."}, status=400)

    user = authenticate(request, username=email, password=password)
    if user is None:
        return JsonResponse({"error": "Invalid email or password."}, status=400)

    login(request, user)
    return JsonResponse({"user": user_to_dict(user)})


@csrf_exempt
@require_http_methods(["POST"])
def logout_user(request):
    logout(request)
    return JsonResponse({"status": "signed_out"})


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
