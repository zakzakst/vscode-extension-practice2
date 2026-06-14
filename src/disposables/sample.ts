import * as vscode from "vscode";

export const sampleDisposable = vscode.commands.registerCommand(
  "my-repositories.sample",
  () => {
    vscode.window.showInformationMessage("Sample");
  },
);
