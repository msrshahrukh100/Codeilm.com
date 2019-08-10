export function getUserId(userNameId) {
  const elements = userNameId.split("-")
  return userNameId.split("-")[elements.length-1]
}
