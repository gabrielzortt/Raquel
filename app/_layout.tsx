import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Sora_400Regular, Sora_500Medium, Sora_600SemiBold } from '@expo-google-fonts/sora';
import { LojaProviderRLI } from '../context/LojaRLI';

SplashScreen.preventAutoHideAsync();

export default function RootLayoutRLI() {
  const [fontesCarregadasRLI] = useFonts({
    Sora_400Regular, Sora_500Medium, Sora_600SemiBold,
  });

  useEffect(() => {
    if (fontesCarregadasRLI) SplashScreen.hideAsync();
  }, [fontesCarregadasRLI]);

  if (!fontesCarregadasRLI) return null;

  return (
    <LojaProviderRLI>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="produto/[id]" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="pedido-confirmado" options={{ animation: 'fade', gestureEnabled: false }} />
        <Stack.Screen name="pedidos" />
        <Stack.Screen name="notificacoes" />
        <Stack.Screen name="editar-perfil" />
        <Stack.Screen name="sobre" />
      </Stack>
    </LojaProviderRLI>
  );
}
