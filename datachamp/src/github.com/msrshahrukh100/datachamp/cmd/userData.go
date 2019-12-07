package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/msrshahrukh100/datachamp/db"
	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(usersCmd)
}

var usersCmd = &cobra.Command{
	Use:   "users",
	Short: "Get the users from databse",
	Run: func(cmd *cobra.Command, args []string) {
		githubuser := db.GetGitHubTokens()
		gu, _ := json.Marshal(githubuser)
		fmt.Println(string(gu))
	},
}
