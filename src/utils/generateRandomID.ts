export default function generateRandomId(): string {
  // Define a string of possible characters to use in the ID
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let id: string = "";
  // Loop through ten times to add ten random characters to the ID
  for (let i = 0; i < 10; i++) {
    // Pick a random character from the string and add it to the ID
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
}
