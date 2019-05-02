import re
import json

class LearnMdParser:
    def __init__(self):
        self.page = re.compile(
            r'\[Page(.*)\]'
            r'([\S\s]*?)'
            r'\[\/Page\]'
            , re.IGNORECASE | re.MULTILINE
        )
        self.code = re.compile( 
            r'([\S\s]*?)' 
            r'\[Code(.*)\]' 
            r'([\S\s]*?)' 
            r'\[\/Code\]' 
            , re.IGNORECASE | re.MULTILINE 
        ) 
        self.parsed_data = []


    def code_match(self, content):
        return re.match(self.code, content)


    def get_content(self, content):
        result = []
        while content:
            match = self.code_match(content)
            if match:
                result.append({"type": "md", "value": match.group(1)})
                result.append({"type": "code", "value": match.group(3), "config": json.loads(match.group(2))})
                content = content[len(match.group(0)):]
            else:
                result.append({"type": "md", "value": content})
                break
        return result

    def get_parsed_content(self, text):
        while text:
            text = text.strip("\n\r")
            match = re.match(self.page, text)
            temp = {}
            if not match:
                print("Unable to parse")
            text = text[len(match.group(0)):]
            title = match.group(1).strip().strip("'").strip('"')
            temp["title"] = title
            temp["slug"] = title
            content = self.get_content(match.group(2))
            temp["content"] = content
            self.parsed_data.append(temp)

        return {"data": self.parsed_data}
