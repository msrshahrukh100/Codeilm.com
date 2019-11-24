package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/pkg/errors"
)

type Database struct {
	*gorm.DB
}


func New() (*Database, error) {
	config, _ := InitConfig()
	db, err := gorm.Open("mysql", config.DatabaseURI)
	if err != nil {
		return nil, errors.Wrap(err, "unable to connect to database")
	}
	return &Database{db}, nil
}