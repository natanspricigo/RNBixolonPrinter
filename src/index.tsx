import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-bixolon-printer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const BixolonPrinter = NativeModules.BixolonPrinter
  ? NativeModules.BixolonPrinter
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export async function findDevices() {
  return BixolonPrinter.findDevices();
}
export async function conectar(address: String) {
  return BixolonPrinter.conectar(address);
}
export async function desconectar() {
  return BixolonPrinter.desconectar();
}
export async function configure(length: Number, width: Number) {
  return BixolonPrinter.configure(length, width);
}
export async function printZpl(zpl: String) {
  return BixolonPrinter.printZpl(zpl);
}
export async function printInformationDevice() {
  return BixolonPrinter.printInformation();
}
export async function isConected() {
  return BixolonPrinter.isConected();
}
