package com.reactnativebixolonprinter;

import android.os.Handler;
import android.os.Message;

import com.bixolon.labelprinter.BixolonLabelPrinter;

public class HandlerPrinter extends Handler {

    public void handleMessage(Message msg){
      switch (msg.what){
        case BixolonLabelPrinter.MESSAGE_STATE_CHANGE:
          switch (msg.arg1){
            case BixolonLabelPrinter.STATE_CONNECTED:
              break;

            case BixolonLabelPrinter.STATE_CONNECTING:
              break;

            case BixolonLabelPrinter.STATE_NONE:
              break;
          }

        case BixolonLabelPrinter.MESSAGE_READ:
          break;

        case BixolonLabelPrinter.MESSAGE_DEVICE_NAME:
          break;

        case BixolonLabelPrinter.MESSAGE_TOAST:
          break;

        case BixolonLabelPrinter.MESSAGE_LOG:
          break;

        case BixolonLabelPrinter.MESSAGE_BLUETOOTH_DEVICE_SET:

          break;

        case BixolonLabelPrinter.MESSAGE_USB_DEVICE_SET:
          break;

        case BixolonLabelPrinter.MESSAGE_NETWORK_DEVICE_SET:
          break;
      }
    }
  }
