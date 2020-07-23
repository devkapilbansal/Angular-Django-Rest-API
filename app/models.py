from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

class User(AbstractUser):
	username = models.CharField(blank=True, null=True,max_length=25)
	email = models.EmailField(_('email address'), unique=True)
	photo = models.ImageField(upload_to='uploads', blank=True)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username', 'first_name', 'last_name','photo']

	def __str__(self):
		return "{}".format(self.email)