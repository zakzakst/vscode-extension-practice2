import * as vscode from "vscode";

export class SampleProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(element: string): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const item = new vscode.TreeItem(element);
    item.command = {
      command: "my-repositories.sample",
      title: "コマンドサンプル",
      // arguments: [],
    };
    item.iconPath = new vscode.ThemeIcon("folder");
    item.contextValue = "context-sample";
    return item;
  }

  getChildren(element?: string | undefined): vscode.ProviderResult<string[]> {
    return ["sample"];
  }
}
