// var shell = require("shelljs");
// const { promisify } = require("util");
// const exec = promisify(require("child_process").exec);
// import { spawnSync } from "child_process";
// @ts-nocheck
const { exec } = require("child_process");
// const { execFile } = require("child_process");
// const { exec } = require("child_process");
export default function command() {
  try {
    // console.log("command");
    // const exec = require("child_process").execSync;
    // Execute the command
    // exec(
    //   "dbdocs build /Users/han-yeeun/Downloads/database.dbml",
    //   (error, stdout, stderr) => {
    //     if (error) {
    //       console.error("Error executing command:", error);
    //       //   res.status(500).json({ error: "Error executing command." });
    //       return;
    //     }
    //     // Log the command output
    //     console.log("Command output:", stdout);
    //     // res.status(200).json({ output: stdout });
    //   }
    // );

    // Manually set the execPath
    exec(
      "dbdocs build /Users/han-yeeun/Downloads/database.dbml",
      { execPath: "/usr/local/bin/node" },
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing command:", error);
          return;
        }
        console.log("Command output:", stdout);
      }
    );
    // shell.exec("dbdocs build /Users/han-yeeun/Downloads/database.dbml");
    // const command = "dbdocs";
    // const args = ["build", "/Users/han-yeeun/Downloads/database.dbml"];
    // // const result = execFileSync(command, args);
    // const result = spawnSync("ls", ["-l", "-a"], { shell: true });
    // execFile(command, args, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error executing command: ${error}`);
    //     return;
    //   }

    //   console.log(`Command output: ${stdout}`);
    // });
    // const result = exec(
    //   "dbdocs build /Users/han-yeeun/Downloads/database.dbml",
    //   { encoding: "utf-8" }
    // );
    // if (result.status === 0) {
    //   console.log("Command executed successfully.");
    // } else {
    //   console.error("Error executing command:", result.error);
    // }
  } catch (error) {
    console.error("Error executing command:", error);
    // res.status(500).json({ error: "Error executing command." });
  }
}
