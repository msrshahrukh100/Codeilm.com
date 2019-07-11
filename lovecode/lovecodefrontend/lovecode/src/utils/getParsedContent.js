const getParsedContent = (text) => {


  let result = []

  while(text){
    let regex =/\[Page(.*)\]([\S\s]*?)\[End\]/ig
    text = text.trim("\n\r")
    const match = regex.exec(text)
    let temp = {}
    if(match === null) {
      if (result.length === 0) {
        return {data: [{title: "", content: text}]}
      }
      else {
        return {data: result, msg: {text: "Some content are not within the [Page] tags", type: "error"}}
      }
    }

    text = text.slice(match[0].length,)
    let title = match[1].trim()
    title = title.slice(1,-1)
    temp.title = title
    temp.content = match[2]
    result.push(temp)
  }
  return {"data": result}
}

export default getParsedContent
