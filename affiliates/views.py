from django.shortcuts import render

# Create your views here.

def get_static_files(request):
	return render(request, "affiliate.html", {})