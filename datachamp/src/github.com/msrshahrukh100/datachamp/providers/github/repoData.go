package github

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/msrshahrukh100/datachamp/db"
	ghtypes "github.com/msrshahrukh100/datachamp/providers/github/types"
)

func getRepoData(user db.SocialUserToken) {
	var repoData []ghtypes.RepoData
	extraData := user.ExtraData.(db.GithubExtraData)
	fmt.Println(extraData.ReposURL)

	resp, err := http.Get(extraData.ReposURL)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(body, &repoData)

	if err != nil {
		panic(err)
	}

	fmt.Printf("%+v\n", repoData)
}
