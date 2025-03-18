import { Text, SafeAreaView, StyleSheet, ImageBackground, TextInput, View, TouchableOpacity } 
from 'react-native';
import { useState } from 'react';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(0);
  const [mensagem, setMensagem] = useState('Verifique aqui as informações sobre seu índice de massa corpórea');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const calcularImc = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum === 0) {
      setMensagem('Por favor, insira valores válidos para peso e altura.');
      setImc(0);
      return;
    }

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado);

    let classificacao = '';
    if (imcCalculado < 18.5) {
      classificacao = 'Abaixo do Peso Normal';
    } else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) {
      classificacao = 'Peso normal';
    } else if (imcCalculado >= 25 && imcCalculado <= 29.9) {
      classificacao = 'Excesso de peso.';
    } else if (imcCalculado >= 30.0 && imcCalculado <= 34.9) {
      classificacao = 'Obsidade I';
    } else if (imcCalculado >= 35.0 && imcCalculado <= 39.9) {
      classificacao = 'Obsidade II';
    } else {
      classificacao = 'Obsidade III';
    }

    setMensagem(`Seu IMC é ${imcCalculado.toFixed(2)}. Classificação: ${classificacao}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('./assets/background.png')} style={styles.background}    resizeMode="cover">
      
        <View>
          <View style={styles.containerTituloBold}>
            <Text style={styles.tituloBold}>Calcule seu IMC</Text>
          </View>

          <View style={styles.containerTituloNormal}>
            <Text style={styles.tituloNormal}>Informe seus dados nos campos abaixo</Text>
          </View>

          <View style={styles.containerNomeEmail}>
            <TextInput
              style={styles.input}
              placeholder="Informe seu nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Informe seu email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.containerPesoAltura}>
            <TextInput
              style={[styles.input, inputHorizontal]}
              placeholder="Peso (kg)"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, inputHorizontal]}
              placeholder="Altura (m)"
              value={altura}
              onChangeText={setAltura}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.containerCalcular} onPress={calcularImc}>
            <Text style={styles.txtCalcular}>Calcular</Text>
          </TouchableOpacity>

          <View style={styles.containerVerifique}>
            <Text style={styles.txtVerifique}>{mensagem}</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const inputHorizontal = { flex: 1 };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  background: {
    flex: 1,
  },
  containerTituloBold: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  containerTituloNormal: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  tituloBold: {
    fontSize: 32,
    width: 200,
    height: 140,
    color: '#ffffff',
    marginTop: 40,
    marginLeft: 25,
  },
  tituloNormal: {
    marginRight: 20,
    fontSize: 20,
    height: 50,
    width: 229,
    color: '#ffffff',
    textAlign: 'right',
  },
  input: {
    backgroundColor: '#494358',
    borderRadius: 25,
    height: 56,
    marginTop: 24,
    marginHorizontal: 11,
    paddingHorizontal: 10,
    color: '#ffffff',
    fontSize: 13,
    placeholderTextColor: '#ffffff',
  },
  containerPesoAltura: {
    flexDirection: 'row',
    height: 90,
    justifyContent: 'center',
  },
  containerNomeEmail: {},
  containerCalcular: {
    backgroundColor: '#262135',
    borderRadius: 14,
    height: 78,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 40,
  },
  txtCalcular: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'semibold',
  },
  containerVerifique: {
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    borderRadius: 34.5,
    marginTop: 20,
    marginHorizontal: 20,
    height: 185,
  },
  txtVerifique: {
    color: '#ffffff',
    fontSize: 18,
    margin: 40,
    textAlign: 'center',
  },
});