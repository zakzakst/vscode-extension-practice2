import type { MyRepositoriesList } from "@/types/my-repository";
import * as vscode from "vscode";

export const openNewFolderDisposable = vscode.commands.registerCommand(
  "my-repositories.open-new-folder",
  (name: string) => {
    const config = vscode.workspace.getConfiguration("my-repositories");
    const list = config.get<MyRepositoriesList[]>("list", []);
    if (!list || !list.length) {
      vscode.window.showInformationMessage(
        "設定ファイルで値を設定してください",
      );
    } else {
      vscode.window.showInformationMessage(name);
    }
  },
);
