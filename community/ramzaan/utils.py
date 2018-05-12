from .models import RamzaanUserProgress
from django.contrib import messages


def add_user_to_group(request, user, group):
		group.users.add(user)
		obj = RamzaanUserProgress.objects.create(user=user, group=group)
		obj.save()
		messages.success(request, 'You have successfully joined this group')



# def send_motivation_to_user(user_id)