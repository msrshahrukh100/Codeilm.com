package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(saveCmd)
}

var saveCmd = &cobra.Command{
	Use:   "save",
	Short: "Fill the data for all the providers for provided or all the users",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Getting data for ")
	},
}
