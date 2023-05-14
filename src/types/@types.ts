export type Note = {
  note_id: string;
  note_title: string;
  note_data: string;
  note_snippet: string;
  last_updated: number;
};

export type SidebarSection = "Notes" | "AI";

export type AIFeature =
  | "Generate Idea Visualization"
  | "Generate Test Questions"
  | "Summarize Notes"
  | "Speak Notes"
  | "";
