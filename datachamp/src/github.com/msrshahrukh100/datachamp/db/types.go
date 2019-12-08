package db

import "time"

// SocialUserToken stores the UserId and its corresponding Github token
type SocialUserToken struct {
	User      int         `json:"user_id"`
	Token     string      `json:"token"`
	Provider  string      `json:"provider"`
	ExtraData interface{} `json:"extra_data"`
}

// SocialUsers stores all github users with token
type SocialUsers struct {
	Users []SocialUserToken
}

// GithubExtraData stores the extra data for github
type GithubExtraData struct {
	ReposURL          string      `json:"repos_url"`
	GistsURL          string      `json:"gists_url"`
	ReceivedEventsURL string      `json:"received_events_url"`
	SubscriptionsURL  string      `json:"subscriptions_url"`
	NodeID            string      `json:"node_id"`
	Location          string      `json:"location"`
	Email             string      `json:"email"`
	StarredURL        string      `json:"starred_url"`
	FollowingURL      string      `json:"following_url"`
	AvatarURL         string      `json:"avatar_url"`
	PublicGists       int         `json:"public_gists"`
	Followers         int         `json:"followers"`
	Blog              string      `json:"blog"`
	Company           string      `json:"company"`
	CreatedAt         time.Time   `json:"created_at"`
	UpdatedAt         time.Time   `json:"updated_at"`
	SiteAdmin         bool        `json:"site_admin"`
	ID                int         `json:"id"`
	Login             string      `json:"login"`
	URL               string      `json:"url"`
	Hireable          interface{} `json:"hireable"`
	FollowersURL      string      `json:"followers_url"`
	Name              string      `json:"name"`
	Bio               interface{} `json:"bio"`
	HTMLURL           string      `json:"html_url"`
	Type              string      `json:"type"`
	PublicRepos       int         `json:"public_repos"`
	OrganizationsURL  string      `json:"organizations_url"`
	GravatarID        string      `json:"gravatar_id"`
	EventsURL         string      `json:"events_url"`
	Following         int         `json:"following"`
}
