from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views
from .views import ProductViewSet

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")

urlpatterns = [
    path("", include(router.urls)),
    path("health/", views.health_check, name="health-check"),
    path("auth/me/", views.current_user, name="auth-me"),
    path("auth/signup/", views.signup, name="auth-signup"),
    path("auth/login/", views.login_user, name="auth-login"),
    path("auth/logout/", views.logout_user, name="auth-logout"),
    path("support/", views.create_support_ticket, name="support-ticket-create"),
]
