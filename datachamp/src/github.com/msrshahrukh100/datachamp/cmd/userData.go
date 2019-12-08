package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(usersCmd)
}

var usersCmd = &cobra.Command{
	Use:   "users",
	Short: "Get the users from databse",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("This command is no longer used")
	},
}
