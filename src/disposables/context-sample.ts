import * as vscode from "vscode";

export const contextSampleDisposable = vscode.commands.registerCommand(
  "my-repositories.context-sample",
  () => {
    vscode.window.showInformationMessage("右クリック コマンドサンプル");
  },
);
