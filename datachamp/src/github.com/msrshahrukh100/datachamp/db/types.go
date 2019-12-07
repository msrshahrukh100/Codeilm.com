package db

// SocialUserToken stores the UserId and its corresponding Github token
type SocialUserToken struct {
	User     int    `json:"user_id"`
	Token    string `json:"token"`
	Provider string `json:"provider"`
}

// SocialUsers stores all github users with token
type SocialUsers struct {
	Users []SocialUserToken
}
