package db


import (
	"fmt"
)

func GetUsers() {

	var accountId int
	var token string

	db, _ := New()
	defer db.Close()

	accountRows, err := db.Table("socialaccount_socialaccount").Select("id").Where("provider = ?", "GitHub").Rows()
	
	if	err != nil {
		panic(err)
	}
	
	for accountRows.Next() {
		accountRows.Scan(&accountId)
		row := db.Table("socialaccount_socialtoken").Select("token").Where("account_id = ?", accountId).Row()
		row.Scan(&token)
		fmt.Println(accountId , " ----, tokenId ", token)
	}

	defer accountRows.Close()

}