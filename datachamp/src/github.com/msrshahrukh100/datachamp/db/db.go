package db

import (
	"fmt"
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql" // For mysql
	"github.com/pkg/errors"
)

// Database is a database object
type Database struct { // For database
	*gorm.DB
}

// New creates a new database objeect
func New() (*Database, error) {
	databseURI := fmt.Sprintf("%s:%s@/%s?charset=utf8&parseTime=True&loc=Local", os.Getenv("MYSQL_DATABASE_USER"), os.Getenv("MYSQL_DATABASE_PASSWORD"), os.Getenv("MYSQL_DATABASE_NAME"))
	log.Info("Database uri", databseURI)
	db, err := gorm.Open("mysql", databseURI)
	fmt.Println(err)
	if err != nil {
		return nil, errors.Wrap(err, "unable to connect to database")
	}
	return &Database{db}, nil
}
