import { contextSampleDisposable } from "@/disposables/context-sample";
import { sampleDisposable } from "@/disposables/sample";
import { SampleProvider } from "@/providers/sample";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Disposables
  context.subscriptions.push(sampleDisposable);
  context.subscriptions.push(contextSampleDisposable);

  // Providers
  const sampleProvider = new SampleProvider();
  vscode.window.registerTreeDataProvider("sampleView", sampleProvider);
}

export function deactivate() {}
