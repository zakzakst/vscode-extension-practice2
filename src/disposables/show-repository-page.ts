import type { MyRepository } from "@/types/my-repository";
import * as vscode from "vscode";

export const showRepositoryPageDisposable = vscode.commands.registerCommand(
  "my-repositories.show-repository-page",
  async (repository: MyRepository) => {
    await vscode.env.openExternal(vscode.Uri.parse(repository.repository));
  },
);
