package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Ara-O/Minim-React/models"
)

func (db *Database) loadNotes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	var notes []models.Note

	userId := r.Context().Value("id")
	fmt.Println(userId)

	rows, err := db.db.Query("SELECT lastUpdated, noteData, noteId, noteSnippet, noteTitle FROM Notes WHERE userId = ?", userId)
	if err != nil {
		http.Error(w, "There was an error fetching notes", http.StatusBadRequest)
	}
	defer rows.Close()

	for rows.Next() {
		var note models.Note
		if err = rows.Scan(&note.LastUpdated, &note.NoteData, &note.NoteId, &note.NoteSnippet, &note.NoteTitle); err != nil {
			http.Error(w, "There was an error retrieving your notes", http.StatusInternalServerError)
		}

		notes = append(notes)
	}

	test, err := json.Marshal(notes)

	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	fmt.Println(test)
	w.Write(test)
}
