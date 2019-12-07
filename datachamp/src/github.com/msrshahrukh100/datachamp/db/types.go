package db

// GithubUserToken stores the UserId and its corresponding Github token
type GithubUserToken struct {
	User  int    `json:"user_id"`
	Token string `json:"token"`
}

// GithubUsers stores all github users with token
type GithubUsers struct {
	Users []GithubUserToken
}
