from django.utils import timezone


def check_user_in_group(request, group):
	users = group.users.all()
	group_user_ids = users.values_list('user__id', flat=True)
	if request.user.id in group_user_ids:
		return True
	return False


def get_group_options(request, group, app_name):
	is_time_bound = False
	is_ongoing_event = False
	is_expired_event = False
	is_future_event = False
	is_indefinite = False
	is_not_time_bound = False
	is_group_owner = request.user.has_perm('owner_of_group', group)

	if not group.start_date and not group.start_date:
		is_not_time_bound = True
	if group.start_date and group.end_date:
		is_time_bound = True
		is_ongoing_event = group.start_date < timezone.now() and group.end_date > timezone.now()
	if group.end_date:
		is_expired_event = group.end_date < timezone.now()
	else:
		is_indefinite = True
	if group.start_date:
		is_future_event = group.start_date > timezone.now()

	user_is_member = check_user_in_group(request, group)
	group_options = None
	if app_name == 'sealed-nector':
		group_options = group.ramzaan_groupoptions
	options = {
		'is_ongoing_event': is_ongoing_event,
		'is_expired_event': is_expired_event,
		'is_future_event': is_future_event,
		'user_is_member': user_is_member,
		'user_is_loggedin': request.user.is_authenticated,
		'is_private': group_options.is_private,
		'is_active': group_options.is_active,
		'show_timer': group_options.show_timer,
		'is_time_bound': is_time_bound,
		'is_indefinite': is_indefinite,
		'is_not_time_bound': is_not_time_bound,
		'is_group_owner': is_group_owner,
	}

	return options
