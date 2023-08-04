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

type NoteDataStruct struct {
	NoteData string `json:"noteData`
}

func (db *Database) generateTestQuestions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*, Authorization")
	godotenv.Load()

	if r.Method != "POST" {
		return
	}

	client := openai.NewClient(os.Getenv("OPENAI_KEY"))

	var noteData NoteDataStruct

	json.NewDecoder(r.Body).Decode(&noteData)

	fmt.Println("data", noteData)

	res, err := client.CreateCompletion(context.Background(), openai.CompletionRequest{
		Model:     openai.GPT3Davinci,
		Prompt:    "Create five sample test questions concerning this note. Only create questions related to things mentioned in the note. Give your results with the format of question, then answer" + noteData.NoteData,
		MaxTokens: 400,
	})

	fmt.Println("loading")

	if err != nil {
		fmt.Println("Error ", err)
		http.Error(w, "There was an error generating test questions", http.StatusInternalServerError)
	}

	fmt.Println(res.Choices[0].Text)
}
