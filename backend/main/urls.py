from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health_check, name="health-check"),
    path("products/", views.product_list, name="product-list"),
    path("support/", views.create_support_ticket, name="support-ticket-create"),
]
