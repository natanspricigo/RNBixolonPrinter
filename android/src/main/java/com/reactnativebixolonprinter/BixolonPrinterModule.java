package com.reactnativebixolonprinter;

import android.Manifest;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.os.Looper;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import com.bixolon.labelprinter.BixolonLabelPrinter;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;

import java.util.ArrayList;
import java.util.Set;

@ReactModule(name = BixolonPrinterModule.NAME)
public class BixolonPrinterModule extends ReactContextBaseJavaModule {
    public static final String NAME = "BixolonPrinter";
    private static final String TAG = "StartBluetoothPrinter";
    private static final String PORT_NAME = "portName";
    private static final String MAC_ADDRESS = "macAddress";
    private static final String MODULE_NAME = "moduleName";
    private BixolonLabelPrinter bixolonLabelPrinter;
    private HandlerPrinter handler;

    public BixolonPrinterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    static{
      try {
        System.mapLibraryName("bxl_common");
        System.loadLibrary("bxl_common");
      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

  @ReactMethod
  public void findDevices(final Promise promise) {
    WritableNativeMap port = new WritableNativeMap();
    WritableNativeArray result = new WritableNativeArray();
    try {
      ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH_ADMIN, Manifest.permission.BLUETOOTH,Manifest.permission.BLUETOOTH_PRIVILEGED}, 10);
      Set<BluetoothDevice> pairedDevices = BluetoothAdapter.getDefaultAdapter().getBondedDevices();

      if (pairedDevices.size() > 0) {
        // There are paired devices. Get the name and address of each paired device.
        for (BluetoothDevice device : pairedDevices) {
          port = new WritableNativeMap();
          port.putString(PORT_NAME, device.getName());
          port.putString(MAC_ADDRESS, device.getAddress());
          port.putString(MODULE_NAME, device.getName());
          result.pushMap(port);
        }
      }
      promise.resolve(result);
    } catch (Exception exception) {
      promise.reject("PORT_DISCOVERY_ERROR", exception.getMessage());
    }
  }

  @ReactMethod
  public void conectar(String address, final Promise promise) {
      try{
      if (address==null || address.isEmpty()){
        promise.resolve("EMPTY");
      }
      handler = new HandlerPrinter();
      Activity a = getReactApplicationContext().getCurrentActivity();
      Looper l =  Looper.getMainLooper();
      bixolonLabelPrinter = new BixolonLabelPrinter(a, handler, l);
      bixolonLabelPrinter.connect(address,0);
    }catch (Exception e){
      promise.resolve("ERROR: " + e.getMessage());
    }
    promise.resolve("OK: "+address);
  }

  @ReactMethod
  public void desconectar(final Promise promise) {
    try{
      bixolonLabelPrinter.disconnect();
      promise.resolve("OK");
    }catch (Exception e){
      promise.resolve("ERROR: " + e.getMessage());
    }
  }

  @ReactMethod
  public void configure(int length, int width, final Promise promise) {
    try{
      if (bixolonLabelPrinter == null) {
        promise.reject("NULL", "Impressora não conectada.");
      }
      bixolonLabelPrinter.setLength(length, 16, BixolonLabelPrinter.MEDIA_TYPE_BLACK_MARK, 5);
      bixolonLabelPrinter.setWidth(width);
      bixolonLabelPrinter.setSpeed(BixolonLabelPrinter.SPEED_25IPS);
      bixolonLabelPrinter.setPrintingType(BixolonLabelPrinter.PRINTING_TYPE_DIRECT_THERMAL);
      bixolonLabelPrinter.setMargin(8,8);
      bixolonLabelPrinter.setOffset(10);
      bixolonLabelPrinter.setCutterPosition(1);
    }catch (Exception e){
      promise.resolve("ERROR: " + e.getMessage());
    }
    promise.resolve("OK");
  }

  @ReactMethod
  public void printInformation(final Promise promise) {
    try{
      bixolonLabelPrinter.printInformation();
    }catch (Exception e){
      promise.resolve("ERROR: " + e.getMessage());
    }
    promise.resolve("OK");
  }

  @ReactMethod
  public void isConected(final Promise promise) {
    try{
      promise.resolve(bixolonLabelPrinter.isConnected());
    }catch (Exception e){
      promise.resolve("ERROR: " + e.getMessage());
    }
  }

  @ReactMethod
  public void printZpl(String zpl, final Promise promise) {
    try{
      if (zpl == null || zpl.isEmpty()) {
        promise.reject("EMPTY", "ZPL vazio");
      }
      bixolonLabelPrinter.clearBuffer();
      bixolonLabelPrinter.executeDirectIo(zpl,false,0);
      bixolonLabelPrinter.print(0,0);
    }catch (Exception e){
      promise.resolve("ERROR: " + e.getMessage());
    }
    promise.resolve("OK");
  }
}
