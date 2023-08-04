package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type NoteId struct {
	Note_id string `json:"note_id"`
}

func (db *Database) deleteNote(w http.ResponseWriter, r *http.Request) {
	var note_id NoteId
	user_id := r.Context().Value("id")
	json.NewDecoder(r.Body).Decode(&note_id)

	_, err := db.db.Exec("DELETE FROM Notes WHERE userId = ? AND noteId = ?", user_id, note_id.Note_id)

	if err != nil {
		fmt.Println(err)
		http.Error(w, "There has been an error deleting a note", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Note successfully deleted")
}
