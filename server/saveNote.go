package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/Ara-O/Minim-React/models"
)

func (db *Database) saveNote(w http.ResponseWriter, r *http.Request) {
	var note models.Note

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*, Authorization")

	if r.Method != "POST" {
		return
	}

	err := json.NewDecoder(r.Body).Decode(&note)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Note: ", note)
}
