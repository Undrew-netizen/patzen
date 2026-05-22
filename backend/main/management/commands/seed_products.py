from django.core.management.base import BaseCommand

from main.models import Product


PRODUCTS = [
    {
        "name": "15mm Copper Elbow Pack",
        "category": "Fittings",
        "price": "18.90",
        "description": "Box of 25 copper elbows for reliable pipe turns.",
        "rating": "4.9",
        "badge": "Bulk value",
        "stock": 42,
    },
    {
        "name": "High-flow Shower Pump",
        "category": "Pumps",
        "price": "149.00",
        "description": "Quiet booster pump for better bathroom water pressure.",
        "rating": "4.8",
        "badge": "Pro pick",
        "stock": 11,
    },
    {
        "name": "PVC Waste Pipe Kit",
        "category": "Drainage",
        "price": "34.50",
        "description": "Ready-to-fit 40mm waste pipe kit with core connectors.",
        "rating": "4.7",
        "badge": "Ready to fit",
        "stock": 27,
    },
    {
        "name": "Quarter-turn Ball Valve",
        "category": "Valves",
        "price": "12.80",
        "description": "Brass isolation valve with smooth quarter-turn action.",
        "rating": "4.8",
        "badge": "In stock",
        "stock": 64,
    },
    {
        "name": "Pipe Cutter Pro 42mm",
        "category": "Tools",
        "price": "42.00",
        "description": "Clean cuts on copper, PVC, and PEX up to 42mm.",
        "rating": "4.6",
        "badge": "Best seller",
        "stock": 19,
    },
    {
        "name": "PTFE Tape Contractor Box",
        "category": "Sealants",
        "price": "21.40",
        "description": "Box of 12 sealing tape rolls for everyday installs.",
        "rating": "4.9",
        "badge": "Jobsite pack",
        "stock": 53,
    },
]


class Command(BaseCommand):
    help = "Seed the database with starter products."

    def handle(self, *args, **options):
        created = 0
        updated = 0

        for product in PRODUCTS:
            _, was_created = Product.objects.update_or_create(
                name=product["name"],
                defaults=product,
            )
            if was_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(self.style.SUCCESS(f"Seeded products. Created: {created}. Updated: {updated}."))
