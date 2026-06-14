import type { MyRepositoriesList, MyRepository } from "@/types/my-repository";
import * as vscode from "vscode";

export const openSelectedFolderDisposable = vscode.commands.registerCommand(
  "my-repositories.open-selected-folder",
  async () => {
    const config = vscode.workspace.getConfiguration("my-repositories");
    const lists = config.get<MyRepositoriesList[]>("lists", []);
    if (!lists || !lists.length) {
      vscode.window.showInformationMessage(
        "設定ファイルで値を設定してください",
      );
      return;
    }
    const allRepositories: MyRepository[] = lists.reduce(
      (acc: MyRepository[], list) => {
        return [...acc, ...list.repositories];
      },
      [],
    );
    const allRepositoryNames = allRepositories.map(
      (repository) => repository.name,
    );
    const selectedRepositoryName =
      await vscode.window.showQuickPick(allRepositoryNames);
    if (!selectedRepositoryName) {
      return;
    }
    const targetRepository = allRepositories.find(
      (repository) => repository.name === selectedRepositoryName,
    )!!;
    await vscode.commands.executeCommand(
      "vscode.openFolder",
      vscode.Uri.file(targetRepository.localFolder),
      true,
    );
  },
);
