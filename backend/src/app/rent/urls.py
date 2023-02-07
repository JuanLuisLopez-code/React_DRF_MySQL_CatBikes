from django.urls import path
from .views import RentAuthenticatedView, RentAdminView

urlpatterns = [
    path('rent', RentAuthenticatedView.as_view({"post": "rent"})),
    path('rentDashboard', RentAdminView.as_view({"get": "getAll"})),
    path('rentDashboard/<int:id>', RentAdminView.as_view({"delete": "delete"})),
    path('returnBike', RentAuthenticatedView.as_view({"post": "returnBike"})),
]
