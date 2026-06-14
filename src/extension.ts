import { SampleProvider } from "./providers/sample";
import { sampleDisposable } from "@/disposables/sample";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Disposables
  context.subscriptions.push(sampleDisposable);

  // Providers
  const sampleProvider = new SampleProvider();
  vscode.window.registerTreeDataProvider("sampleView", sampleProvider);
}

export function deactivate() {}
