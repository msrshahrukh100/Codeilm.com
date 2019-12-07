package providers

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/msrshahrukh100/datachamp/db"
)

func parseIntegers(s []string) ([]int, error) {
	var ints []int
	for _, str := range s {
		i, err := strconv.Atoi(str)
		if err != nil {
			return nil, err
		}
		ints = append(ints, i)
	}

	return ints, nil
}

// Save Saves the data for all providers
func Save(args []string) {

	var userIds []int
	var err error

	if len(args) != 0 {
		userIds, err = parseIntegers(args)
		if err != nil {
			fmt.Println("Error parsing integers", userIds, args)
			return
		}
	}

	githubuser := db.GetSocialTokens("Github", userIds...)
	gu, _ := json.Marshal(githubuser)
	fmt.Println(string(gu))

}
