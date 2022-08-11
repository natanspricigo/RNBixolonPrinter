import * as React from 'react';

import { StyleSheet, View, Text, Button, TouchableOpacity, PermissionsAndroid } from 'react-native';
import {findDevices, conectar, configure, prinZpl, printZpl} from 'react-native-bixolon-printer';
type BluetoothDevice = {
  macAddress: string;
  portName: string;
  moduleName : String;
};

export default function App() {
  const [result, setResult] = React.useState<any>([]);
  const [err, setErr] = React.useState<String>("");

  React.useEffect(() => {
    setTimeout(() => {
      requestPermission();
    }, 1000);
  }, []);
  
  const requestPermission = async () => {
    try {
      PermissionsAndroid.requestMultiple(['android.permission.BLUETOOTH_SCAN', 
      'android.permission.BLUETOOTH_CONNECT',
      'android.permission.BLUETOOTH_ADVERTISE',
      'android.permission.ACCESS_COARSE_LOCATION']);
      find();
    } catch (err) {
      console.warn(err);
    }
  };
   
  async function find() {
    findDevices().then((data: any)=>{
        setResult(data);
        console.log(data);
    }).catch((error: String)=>{
        setErr(error.toString());
    });
  
  }
  
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Button title='buscar' onPress={async () => {
          await find();
        }}>Buscar...</Button>
        <Button title='imprimir' onPress={async () => {
          printZpl(`^XA
          ^CI28
          ^LH0,0
          ^FX tamanho de fonte
          ^CF0,3
          ^MNM
          ^MTT
          ^PR4,9,A
          ^PQ1,0,0,N,Y
          ^A@N,16,16,E:ARI000.FNT
          
          ^FX informacoes do pagador
          ^FO30,205 ^A0,20^FDAmilton dos Santos^FS
          ^FO400,205 ^A0,20^FDRua Henrique Dias, 898, Matinho. Xanxere^FS
        
          ^FO464,128 ^A0,24^FD2^FS 
          ^FO650,128 ^A0,24^FD8/2022^FS
          
          ^FO30,270 ^A0,20^FD2^FS
          ^FO312,270 ^A0,20^FD^FS
          ^FO360,270 ^A0,20^FD^FS
          ^FO472,270 ^A0,15^FDE1 - COMERCIAL / 1 - INDUSTRIAL^FS
          
          ^FO30,330 ^A0,20^FD^FS
          ^FO256,330 ^A0,20^FD^FS
          ^FO424,330 ^A0,20^FD^FS
          ^FO616,330 ^A0,20^FD^FS
          
          ^FX Historico
          ^FO20,420 ^GB390,250,3,B,0^FS
          ^FO30,430 ^A0,30^FDHistorico^FS
          
          ^FO30,460 ^A0,18 ^FB320,20,0,L,0 ^FDMes ............ Consumo^FS
          ^FO30,480 ^A0,15 ^FB370,20,0,L,0
          ^FD03/2022..................... 12\&02/2022..................... 0\&06/2022..................... 1310\&05/2022..................... 10\&03/2022..................... 12\&02/2022..................... 0\&
          ^FS
          ^FX Itens
          ^FO30,690 ^A0,30^FDItens^FS
          ^FO30,720 ^A0,20 ^FD Conservacao de Hidrometro^FS ^FO720,720 ^A0,20 ^FDR$ 3,25^FS ^FO30,742 ^A0,20 ^FD Coleta de Lixo^FS ^FO720,742 ^A0,20 ^FDR$ 15,00^FS ^FO30,764 ^A0,20 ^FD Servico (Esgoto) (80 % de (R$ 86,00))^FS ^FO720,764 ^A0,20 ^FDR$ 68,80^FS ^FO30,786 ^A0,20 ^FD Tarifa de Agua (HIDROMETRO) 0 mts³ / 2 pontos)^FS ^FO720,786 ^A0,20 ^FDR$ 86,00^FS ^FS
        
          ^FX Analise 
          ^FO30,900 ^A0,30^FDAnalise^FS
          ^FO30,930 ^A0,20 ^FDParametro^FS   ^FO300,930 ^A0,20 ^FDMin^FS   ^FO450,930 ^A0,20 ^FDMax^FS  ^FO650,930 ^A0,20 ^FDValor^FS
          
        
          ^FO30,1240 ^A0,20^FD04/08/2022^FS
          ^FO480,1240 ^A0,30^FDR$ 176,43^FS
          
          ^FO20,1336 ^FB780,20,1,J,1^A0,18^FD^FS
        
          ^FT310,1700 ^A0,20^FD2^FS
          ^FT440,1700 ^A0,20^FD8/2022^FS
          ^FT560,1700 ^A0,20^FD04/08/2022^FS
          ^FT690,1700 ^A0,20^FDR$ 176,43^FS
          
          ^FO20,1740^BY2
          ^B2N,100,Y,N,N^FD826117643000000000002024209150000000000000018912^FS
        
          ^XZ`)
        }}>Imprimir</Button>
      </View>
        <View>
          <Text style={{fontSize:20, paddingBottom:3, paddingTop: 5}}>Lista de dispositivos Pareados no telefone</Text>
        </View>
        <View>
          <Text>Clique para conectar</Text>
          <Text>{err}</Text>
        </View>
        <View>
          {result.map((e:any,i:any)=>{
            return <View style={{marginTop:10}}>
              <TouchableOpacity key={i} onPress={()=>{
                conectar(e.macAddress).then(()=>{
                configure(1850,840);
                });
              }}>
                <Text>{'-'} {e.portName} - {e.macAddress}</Text>
              </TouchableOpacity>
            </View>
          })}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
