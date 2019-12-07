package db

import (
	"database/sql"
	"fmt"
)

// GetSocialTokens : Gives the social user tokens
func GetSocialTokens(provider string, userIds ...int) SocialUsers {
	var token string
	var id, userID int
	var socialUsers SocialUsers
	var err error

	dataBase, _ := New()
	defer dataBase.Close()

	var accountRows *sql.Rows

	if len(userIds) == 0 {
		accountRows, err = dataBase.Table("socialaccount_socialaccount").Select("id, user_id").Where("provider = ?", provider).Rows()
	} else {
		fmt.Println("Userids provided")
		accountRows, err = dataBase.Table("socialaccount_socialaccount").Select("id, user_id").Where("provider = ?", provider).Where("user_id IN (?)", userIds).Rows()
	}

	if err != nil {
		panic(err)
	}

	for accountRows.Next() {
		accountRows.Scan(&id, &userID)
		row := dataBase.Table("socialaccount_socialtoken").Select("token").Where("account_id = ?", id).Row()
		row.Scan(&token)
		socialUsers.Users = append(socialUsers.Users, SocialUserToken{User: userID, Token: token, Provider: provider})
	}
	defer accountRows.Close()

	return socialUsers

}
