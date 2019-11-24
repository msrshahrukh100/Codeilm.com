package cmd

import (
	"github.com/spf13/cobra"
	"github.com/msrshahrukh100/datachamp/db"
)

func init() {
	rootCmd.AddCommand(usersCmd)
}

var usersCmd = &cobra.Command{
	Use:   "users",
	Short: "Get the users from databse",
	Run: func(cmd *cobra.Command, args []string) {
		db.GetUsers()
	},
}

