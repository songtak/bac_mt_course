// src/bridge.ts
export function callFlutterBridge(command: string, payload?: any): void {
  if (window.flutter_inappwebview?.callHandler) {
    window.flutter_inappwebview.callHandler("flutterBridge", command, payload);
  } else {
    console.warn("⚠️ Flutter bridge not available");
  }
}
