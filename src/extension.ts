import { openFolderDisposable } from "@/disposables/open-folder";
import { openNewFolderDisposable } from "@/disposables/open-new-folder";
import { openSelectedFolderDisposable } from "@/disposables/open-selected-folder";
import { showCurrentRepositoryPageDisposable } from "@/disposables/show-current-repository-page";
import { showRepositoryPageDisposable } from "@/disposables/show-repository-page";
import { MyRepositoriesViewProvider } from "@/providers/my-repositories-view";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Disposables
  context.subscriptions.push(openFolderDisposable);
  context.subscriptions.push(openSelectedFolderDisposable);
  context.subscriptions.push(openNewFolderDisposable);
  context.subscriptions.push(showRepositoryPageDisposable);
  context.subscriptions.push(showCurrentRepositoryPageDisposable);

  // Providers
  const myRepositoriesViewProvider = new MyRepositoriesViewProvider();
  vscode.window.registerTreeDataProvider(
    "my-repositories-view",
    myRepositoriesViewProvider,
  );
}

export function deactivate() {}
