// @ts-nocheck
import childProcess from "child_process";
// import { writeFileSync } from "fs";
// import path from "path";
// import fs from "fs/promises";
export default async function handler(message) {
  // Define the file path
  // const filePath = path.join(process.cwd(), "pages", "api", "database.dbml");

  // Define the new content
  const projectName = `Project AIworkshop {
    database_type: 'mySQL'
  }
  `;
  // const tableSchema = `
  // Table users as U {
  //   id int [pk, increment]
  //   full_name varchar
  //   created_at timestamp
  //   country_code int
  // }
  // `;
  const tableSchema = message;
  const newContent = projectName + tableSchema;
  console.log(message);
  // try {
  //   // Open the file, delete its content, and start writing anew
  //   // fs.writeFileSync(filePath, newContent);
  //   // await fs.writeFile(filePath, newContent);
  //   // await writeFile(filePath, newContent);
  //   // await fsPromises.writeFile(filePath, newContent);
  //   // await fs.writeFile(filePath, newContent);
  //   // await writeFile(filePath, newContent);
  //   // Return success response
  //   // await fs.promises.writeFile(filePath, newContent);
  //   // await fs.outputFile(filePath, newContent);
  //   writeFileSync(filePath, newContent);
  //   return { message: "File content updated successfully." };
  // } catch (error) {
  //   console.error(error);
  //   throw new Error("Error updating file content.");
  // }
  // Usage example:
  // const fileContent = 'This is the content of the file.';
  const fileName = "database.dbml";
  downloadFile(newContent, fileName);
  // try {
  //   // Execute the command
  //   childProcess.exec(
  //     `echo ${newContent} > /Users/han-yeeun/Documents/workspace/AI-generated-message-app/pages/api/database.dbml`,
  //     (error, stdout, stderr) => {
  //       if (error) {
  //         console.error("Error executing command:", error);
  //         //   res.status(500).json({ error: "Error executing command." });
  //         return;
  //       }
  //       // Log the command output
  //       console.log("Command output:", stdout);
  //       // res.status(200).json({ output: stdout });
  //     }
  //   );
  // } catch (error) {
  //   console.error("Error executing command:", error);
  //   // res.status(500).json({ error: "Error executing command." });
  // }
}
function downloadFile(content, filename) {
  // Create a Blob containing the file content
  const blob = new Blob([content], { type: "text/plain" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set the link's href attribute to the URL of the Blob
  link.href = url;

  // Set the filename for the downloaded file
  link.download = filename;

  // Append the link to the document body
  document.body.appendChild(link);

  // Programmatically trigger a click event on the link
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);

  // Revoke the URL to release the resources
  URL.revokeObjectURL(url);
}
