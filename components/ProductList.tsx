import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductCardRLI from './ProductCard';
import { ProdutoRLI } from '../data/produtosRLI';

interface ProductListPropsRLI {
  produtosRLI: ProdutoRLI[];
  aoAbrirRLI: (idRLI: string) => void;
  cabecalhoRLI?: React.ReactElement;
  vazioRLI?: React.ReactElement;
}

export default function ProductListRLI({ produtosRLI, aoAbrirRLI, cabecalhoRLI, vazioRLI }: ProductListPropsRLI) {
  return (
    <FlatList
      data={produtosRLI}
      keyExtractor={(itemRLI) => itemRLI.idRLI}
      numColumns={2}
      columnWrapperStyle={estilosRLI.colunasRLI}
      ListHeaderComponent={cabecalhoRLI}
      ListEmptyComponent={vazioRLI}
      contentContainerStyle={estilosRLI.listaRLI}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item: itemRLI }) => (
        <View style={estilosRLI.celulaRLI}>
          <ProductCardRLI produtoRLI={itemRLI} aoAbrirRLI={aoAbrirRLI} />
        </View>
      )}
    />
  );
}

const estilosRLI = StyleSheet.create({
  listaRLI: { paddingHorizontal: 20, paddingBottom: 28 },
  colunasRLI: { gap: 16, marginBottom: 16 },
  celulaRLI: { flex: 1 },
});
