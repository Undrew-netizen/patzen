from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "category",
            "price",
            "description",
            "imageUrl",
            "rating",
            "badge",
            "stock",
        ]

    def get_imageUrl(self, obj):
        if not obj.image:
            return None

        image_url = obj.image.url
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(image_url)

        return image_url
