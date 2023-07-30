package models

type Note struct {
	LastUpdated int    `json:"last_updated"`
	NoteData    string `json:"note_data"`
	NoteId      string `json:"note_id"`
	NoteSnippet string `json:"note_snippet"`
	NoteTitle   string `json:"note_title"`
}
