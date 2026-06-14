import * as vscode from "vscode";

export const sampleDisposable = vscode.commands.registerCommand(
  "my-repositories.sample",
  () => {
    const config = vscode.workspace.getConfiguration("my-repositories");
    const sample = config.get<string>("sample", "");
    if (!sample) {
      vscode.window.showInformationMessage(
        "設定ファイルで値を設定してください",
      );
    } else {
      vscode.window.showInformationMessage(sample);
    }
  },
);
