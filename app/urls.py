from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet,index,users

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('users_new/<int:pk>',users,name="users_new"),
    path('auth/',include('rest_auth.urls')),
]