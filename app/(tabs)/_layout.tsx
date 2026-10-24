import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { corRLI, fonteRLI } from '../../constants/temaRLI';
import { useLojaRLI } from '../../context/LojaRLI';

export default function TabsLayoutRLI() {
  const { usuarioRLI, quantidadeTotalRLI, prontoRLI } = useLojaRLI();

  if (prontoRLI && !usuarioRLI) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: corRLI.ouroRLI,
        tabBarInactiveTintColor: corRLI.inativoRLI,
        tabBarStyle: {
          backgroundColor: corRLI.brancoRLI,
          borderTopWidth: 0,
          height: 68,
          paddingTop: 10,
          shadowColor: '#22140E',
          shadowOpacity: 0.1,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: -6 },
          elevation: 16,
        },
      }}
    >
      <Tabs.Screen name="inicio" options={{ tabBarIcon: ({ color: colorRLI }) => <Ionicons name="home" size={26} color={colorRLI} /> }} />
      <Tabs.Screen name="favoritos" options={{ tabBarIcon: ({ color: colorRLI }) => <Ionicons name="heart" size={26} color={colorRLI} /> }} />
      <Tabs.Screen
        name="carrinho"
        options={{
          tabBarBadge: quantidadeTotalRLI > 0 ? quantidadeTotalRLI : undefined,
          tabBarBadgeStyle: { backgroundColor: corRLI.ouroRLI, color: corRLI.brancoRLI, fontFamily: fonteRLI.semiRLI, fontSize: 10 },
          tabBarIcon: ({ color: colorRLI }) => <Ionicons name="bag" size={26} color={colorRLI} />,
        }}
      />
      <Tabs.Screen name="perfil" options={{ tabBarIcon: ({ color: colorRLI }) => <Ionicons name="person" size={26} color={colorRLI} /> }} />
    </Tabs>
  );
}
