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
		fmt.Println(err)
	}

	fmt.Println("Note: ", note)
	id := r.Context().Value("id").(float64)

	stmt, err := db.db.Prepare("INSERT INTO Notes VALUES(?, ?, ?, ?, ?, ?)")

	if err != nil {
		fmt.Println("There has been an error preparing notes")
	}
	result, err := stmt.Exec(id, note.LastUpdated, note.NoteData, note.NoteId, note.NoteSnippet, note.NoteTitle)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result)
}
