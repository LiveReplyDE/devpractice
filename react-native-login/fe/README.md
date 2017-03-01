# Frontend for the react-native-login App

### Description
This is a first look at react-native. We created a simple Login Screen that is authenticating to a node.JS Express server. You can find it in the be-Folder (Backend).

### How to run on Android
1. Open `cmd` or `bash` inside the fe-Folder (I used cygwin on Windows).
2. Run: `react-native start`, the default port is 8081, if this is already in use you need to start the server with another one `react-native start --port <YOUR-PORT>`.
3. Start a Emulator or connect your device.
4. Open another console and run: `react-native run-android`
5. (Only if you started the packager with a different port): Once the app has started press `CRTL+M` (on Windows) and select "Dev-Settings" -> "Debug server host & port for device" -> Enter: `10.0.2.2:<YOUR-PORT>` (10.0.2.2 is the default IP to connect to the host.)
6. (Only if you started the packager with a different port): Press `r+r`in the emulator to reload, everything should work now.
