from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseAdmin
from .models import User,UserProfile
# Register your models here.

class UserProfileInline(admin.StackedInline):
	model=UserProfile
	can_delete=False

@admin.register(User)
class UserAdmin(BaseAdmin):
	ordering = ('email',)
	inlines=(UserProfileInline,)