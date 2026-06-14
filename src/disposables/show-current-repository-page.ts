import type { MyRepositoriesList, MyRepository } from "@/types/my-repository";
import * as vscode from "vscode";

const formatPath = (path: string): string => {
  const result = path.replace(/^.*?:/, "").replace(/\\/g, "");
  return result;
};

export const showCurrentRepositoryPageDisposable =
  vscode.commands.registerCommand(
    "my-repositories.show-current-repository-page",
    async () => {
      const config = vscode.workspace.getConfiguration("my-repositories");
      const lists = config.get<MyRepositoriesList[]>("lists", []);
      if (!lists || !lists.length) {
        vscode.window.showInformationMessage(
          "設定ファイルで値を設定してください",
        );
        return;
      }
      const folders = vscode.workspace.workspaceFolders;
      if (!folders || folders.length === 0) {
        vscode.window.showWarningMessage("フォルダが開かれていません");
        return;
      }
      const folder = folders[0].uri.fsPath;
      const allRepositories: MyRepository[] = lists.reduce(
        (acc: MyRepository[], list) => {
          return [...acc, ...list.repositories];
        },
        [],
      );
      const targetRepository = allRepositories.find((repository) => {
        // NOTE: VS Codeの設定値とworkspaceFoldersで取得する文字列の表示方法の差分をなくしてから比較する
        return formatPath(repository.localFolder) === formatPath(folder);
      });
      if (!targetRepository) {
        vscode.window.showWarningMessage(
          "現在開いているフォルダのリポジトリ情報が見つかりません",
        );
        return;
      }
      await vscode.env.openExternal(
        vscode.Uri.parse(targetRepository.repository),
      );
    },
  );
