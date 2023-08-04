package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/sashabaranov/go-openai"
)

type Idea struct {
	IdeaToVisualize string `json:"ideaToVisualize"`
}

func (db *Database) generateIdeaVisualization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*, Authorization")
	godotenv.Load()

	if r.Method != "POST" {
		return
	}

	var idea Idea

	json.NewDecoder(r.Body).Decode(&idea)

	client := openai.NewClient(os.Getenv("OPENAI_KEY"))

	res, err := client.CreateImage(context.Background(), openai.ImageRequest{
		Prompt: idea.IdeaToVisualize,
		N:      3,
	})

	if err != nil {
		fmt.Println(err)
		http.Error(w, "There was an error generating images", http.StatusInternalServerError)
	}

	images, err := json.Marshal(res)

	if err != nil {
		fmt.Println(err)
	}

	w.Write(images)
}
