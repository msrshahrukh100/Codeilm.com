import re
import json

link_re = re.compile(r'[\s\S]*[\?\&]page\=([0-9]+)[\s\S]*\=[\'\"]([\s\S]*)[\'\"]')

def get_links_from_headers(headers):
	headers = headers.split(",")
	links = {}
	for header in headers:
		header = header.strip()
		match = re.match(link_re, header)
		if match:
			links[match.group(2)] = match.group(1)

	return links


