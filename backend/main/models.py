from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=160)
    category = models.CharField(max_length=80)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='products/', blank=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=True, blank=True)
    badge = models.CharField(max_length=80, blank=True)
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["category", "name"]

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "category": self.category,
            "price": float(self.price),
            "description": self.description,
            "imageUrl": self.image.url if self.image else None,
            "rating": float(self.rating) if self.rating is not None else None,
            "badge": self.badge,
            "stock": self.stock,
        }


class SupportTicket(models.Model):
    TOPIC_CHOICES = [
        ("Part matching", "Part matching"),
        ("Delivery issue", "Delivery issue"),
        ("Return request", "Return request"),
        ("Trade account", "Trade account"),
    ]

    name = models.CharField(max_length=120)
    email = models.EmailField()
    order_number = models.CharField(max_length=80, blank=True)
    topic = models.CharField(max_length=80, choices=TOPIC_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.topic} - {self.email}"
