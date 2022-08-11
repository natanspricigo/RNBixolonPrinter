import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-bixolon-printer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const BixolonPrinter = NativeModules.BixolonPrinter  ? NativeModules.BixolonPrinter  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

    export function findDevices() {
      return BixolonPrinter.findDevices();
    }
    export function conectar(address: String){
      return BixolonPrinter.conectar(address);
    }

    export function configure(length: Number, width: Number){
      return BixolonPrinter.configure(length,width);
    }
    export function printZpl(zpl: String){
      return BixolonPrinter.printZpl(zpl);
    }
