package github

import "github.com/msrshahrukh100/datachamp/db"

// Datasetter gets the data from all the possible endpoints and saves them
func Datasetter(user db.SocialUserToken) {
	getRepoData(user)
}
