from django.contrib import admin
from django.utils.html import format_html

from .models import Product, SupportTicket


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "is_active", "image_preview")
    list_filter = ("category", "is_active")
    search_fields = ("name", "category", "description")
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        if not obj.image:
            return "-"

        return format_html(
            '<img src="{}" style="height: 64px; width: 64px; object-fit: cover; border-radius: 6px;" />',
            obj.image.url,
        )

    image_preview.short_description = "Image"


@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin):
    list_display = ("topic", "email", "order_number", "created_at")
    list_filter = ("topic", "created_at")
    search_fields = ("name", "email", "order_number", "message")

