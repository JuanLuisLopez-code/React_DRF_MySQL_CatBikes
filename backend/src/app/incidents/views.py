from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import (IsAuthenticated)
from src.app.core.permissions import IsAdmin
from .models import Incident
# from .serializers import 
from rest_framework.permissions import (
    AllowAny)


class IncidentView(viewsets.GenericViewSet):

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAdmin]
        return super(IncidentView, self).get_permissions()

    def get(self, request):
        return Response({'a': 'a'})
