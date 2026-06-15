import type { MyRepositoriesList, MyRepository } from "@/types/my-repository";
import * as vscode from "vscode";

const formatPath = (path: string): string => {
  const result = path.replace(/^.*?:/, "").replace(/\\/g, "");
  return result;
};

export class MyRepositoriesViewProvider implements vscode.TreeDataProvider<
  MyRepository | MyRepositoriesList
> {
  getTreeItem(
    element: MyRepository | MyRepositoriesList,
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const config = vscode.workspace.getConfiguration("my-repositories");
    const listExpand = config.get<boolean>("list-expand", true);
    const isList = "repositories" in element;
    if (isList) {
      // リストデータの場合
      const collapsibleState = listExpand
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.Collapsed;
      const item = new vscode.TreeItem(element.name, collapsibleState);
      item.iconPath = new vscode.ThemeIcon("folder");
      return item;
    } else {
      // リポジトリデータの場合
      const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
      const isCurrent = workspaceFolders.some(
        // NOTE: VS Codeの設定値とworkspaceFoldersで取得する文字列の表示方法の差分をなくしてから比較する
        (f) => formatPath(f.uri.fsPath) === formatPath(element.localFolder),
      );
      const label = isCurrent ? `【*】${element.name}` : element.name;
      const item = new vscode.TreeItem(
        label,
        vscode.TreeItemCollapsibleState.None,
      );
      item.command = {
        command: "my-repositories.open-folder",
        title: "フォルダを開く",
        arguments: [element],
      };
      item.contextValue = "context-menu";
      return item;
    }
  }

  getChildren(
    element?: MyRepository | MyRepositoriesList,
  ): vscode.ProviderResult<MyRepository[] | MyRepositoriesList[]> {
    if (!element) {
      // 初回は設定ファイルから取得
      const config = vscode.workspace.getConfiguration("my-repositories");
      const lists = config.get<MyRepositoriesList[]>("lists", []);
      return lists;
    }

    const isList = "repositories" in element;
    if (isList) {
      return element.repositories;
    } else {
      return [];
    }
  }
}
