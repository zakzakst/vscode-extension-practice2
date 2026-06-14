import type { MyRepository } from "@/types/my-repository";
import * as vscode from "vscode";

export const openFolderDisposable = vscode.commands.registerCommand(
  "my-repositories.open-folder",
  async (repository: MyRepository) => {
    await vscode.commands.executeCommand(
      "vscode.openFolder",
      vscode.Uri.file(repository.localFolder),
      false,
    );
  },
);
