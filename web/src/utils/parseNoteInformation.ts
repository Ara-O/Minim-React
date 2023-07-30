export default function parseNoteInformation(noteData: string): string {
    const parser = new DOMParser();
    const plainText = parser.parseFromString(noteData, "text/html")
        .documentElement.textContent;
    return plainText || "";
}

