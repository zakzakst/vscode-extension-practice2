import type { MyRepositoriesList, MyRepository } from "@/types/my-repository";
import * as vscode from "vscode";

export class MyRepositoriesViewProvider implements vscode.TreeDataProvider<
  MyRepository | MyRepositoriesList
> {
  getTreeItem(
    element: MyRepository | MyRepositoriesList,
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const isList = "repositories" in element;
    if (isList) {
      // リストデータの場合
      const item = new vscode.TreeItem(
        element.name,
        vscode.TreeItemCollapsibleState.Expanded,
      );
      item.iconPath = new vscode.ThemeIcon("folder");
      return item;
    } else {
      // リポジトリデータの場合
      const item = new vscode.TreeItem(
        element.name,
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
