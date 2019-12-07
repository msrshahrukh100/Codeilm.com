package db

import (
	"database/sql"
	"fmt"
)

// GetGitHubTokens : Gives the Github user tokens
func GetGitHubTokens(userIds ...int) GithubUsers {
	var token string
	var id, userID int
	var githubUsers GithubUsers
	var err error

	dataBase, _ := New()
	defer dataBase.Close()

	var accountRows *sql.Rows

	if len(userIds) == 0 {
		accountRows, err = dataBase.Table("socialaccount_socialaccount").Select("id, user_id").Where("provider = ?", "GitHub").Rows()
	} else {
		fmt.Println("Userids provided")
		accountRows, err = dataBase.Table("socialaccount_socialaccount").Select("id, user_id").Where("provider = ?", "GitHub").Where("user_id IN (?)", userIds).Rows()
	}

	if err != nil {
		panic(err)
	}

	for accountRows.Next() {
		// var socialAccountUser SocialAccountUser
		accountRows.Scan(&id, &userID)
		row := dataBase.Table("socialaccount_socialtoken").Select("token").Where("account_id = ?", id).Row()
		row.Scan(&token)
		githubUsers.Users = append(githubUsers.Users, GithubUserToken{User: userID, Token: token})
	}
	defer accountRows.Close()

	return githubUsers

}
