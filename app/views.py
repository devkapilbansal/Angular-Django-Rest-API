from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import viewsets
from rest_framework.request import Request

from .models import User
from rest_framework import status
from rest_framework.decorators import api_view,renderer_classes
from rest_framework.renderers import StaticHTMLRenderer,JSONRenderer,TemplateHTMLRenderer
from .serializers import UserSerializer
from django.shortcuts import render
from rest_framework.response import Response

from .permissions import IsLoggedInUserOrAdmin,IsAdminUser

def index(request):
    return render(request, 'index.html')

# @api_view(['GET','DELETE','POST'])
# @renderer_classes([TemplateHTMLRenderer])
# def users(request,pk):
#     serializer_context = {
#     'request': request,
#     }

#     try:
#         user=User.objects.get(pk=pk)
#     except User.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND,template_name='user_detail.html')

#     if request.method=='GET':
#         serializer=UserSerializer(user,context=serializer_context)
#         return Response({'serializer':serializer},template_name='user_detail.html')

#     elif request.method == 'DELETE':
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT,template_name='user_detail.html')
#     elif request.method == 'POST':
#         serializer=UserSerializer(user,data=request.data,context=serializer_context)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_204_NO_CONTENT,template_name='user_detail.html')
#         return Response(serializer.data,status=status.HTTP_404_NOT_FOUND,template_name='user_detail.html')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]