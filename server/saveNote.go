package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

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

	if strings.TrimSpace(note.NoteTitle) == "" {
		http.Error(w, "A note title is necessary", http.StatusBadRequest)
		return
	}

	// TODO: Check if note already exists
	id := r.Context().Value("id").(float64)

	stmt, err := db.db.Prepare(`
	INSERT INTO Notes(userId, lastUpdated, noteData, noteId, noteSnippet, noteTitle) VALUES(?, ?, ?, ?, ?, ?) 
	ON DUPLICATE KEY UPDATE 
	lastUpdated = VALUES(lastUpdated), noteData=VALUES(noteData), noteSnippet=VALUES(noteSnippet), noteTitle=VALUES(noteTitle) `)

	if err != nil {
		fmt.Println("There has been an error preparing notes", err)
	}

	result, err := stmt.Exec(id, note.LastUpdated, note.NoteData, note.NoteId, note.NoteSnippet, note.NoteTitle)

	if err != nil {
		fmt.Println("Error executing prepared stmt: ", err)
	}

	fmt.Println(result)
}
