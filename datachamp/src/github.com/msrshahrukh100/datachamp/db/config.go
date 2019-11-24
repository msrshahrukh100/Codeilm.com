package db

import (
	"fmt"
	"github.com/spf13/viper"
)


type Config struct {
	DatabaseURI string
}

func InitConfig() (*Config, error) {

	dbUserName := viper.Get("MYSQL_DATABASE_USER")
	dbName := viper.Get("MYSQL_DATABASE_NAME")
	dbPassword := viper.Get("MYSQL_DATABASE_PASSWORD")
	
	if dbPassword == nil || dbName == nil || dbUserName == nil {
		return nil, fmt.Errorf("DatabaseURI must be set")
	}
	
	dbUri := fmt.Sprintf("%s:%s@/%s?charset=utf8&parseTime=True&loc=Asia%%2FCalcutta", dbUserName, dbPassword, dbName)
	
	fmt.Println("Connecting with database url", dbUri)
	
	config := &Config{
		DatabaseURI: dbUri,
	}
	
	return config, nil
}
