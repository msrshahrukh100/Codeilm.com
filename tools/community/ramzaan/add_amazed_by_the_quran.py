import requests
from community.ramzaan.models import RamzaanGroup, RamzaanUnitDescription


url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLutdSTmJ7bAI7_C4iDzJWpHhGlnqHUI_f&key=AIzaSyCc4V_a5G_wnllgV54mkJKwsFIXtSzvB1w"
data = requests.get(url)
data_dict = data.json()
print(data_dict.keys())

group = RamzaanGroup.objects.get(id=5)
index = 1
for video in data_dict.get("items"):
	RamzaanUnitDescription.objects.create(
		group=group,
		unit=index,
		unit_title=video["snippet"]["title"].split('-')[0],
		unit_text=video["snippet"]["title"]
	)
	index += 1