from django.contrib import admin

from .models import Product, SupportTicket


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("name", "category", "description")


@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin):
    list_display = ("topic", "email", "order_number", "created_at")
    list_filter = ("topic", "created_at")
    search_fields = ("name", "email", "order_number", "message")

# Register your models here.
