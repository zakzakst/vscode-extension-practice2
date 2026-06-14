import * as vscode from "vscode";

export class MyRepositoriesViewProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(element: string): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const item = new vscode.TreeItem(element);
    item.command = {
      command: "my-repositories.open-folder",
      title: "コマンドサンプル",
      // arguments: [],
    };
    item.iconPath = new vscode.ThemeIcon("folder");
    item.contextValue = "context-menu";
    return item;
  }

  getChildren(element?: string | undefined): vscode.ProviderResult<string[]> {
    return ["sample"];
  }
}
