import { Ionicons } from '@expo/vector-icons';

export type IconeRLI = keyof typeof Ionicons.glyphMap;

export const corRLI = {
  espressoRLI: '#14122B',
  marromRLI: '#221F3D',
  marromClaroRLI: '#2F2B52',
  escuroRLI: '#272240',
  ouroRLI: '#8B5CF6',
  ouroClaroRLI: '#C9B6FF',
  ouroEscuroRLI: '#6D3FE0',
  cobreRLI: '#D98FA9',
  cremeRLI: '#F6F2FF',
  areiaRLI: '#EFE9FB',
  fundoRLI: '#F8F7FC',
  brancoRLI: '#FFFFFF',
  textoRLI: '#25223A',
  precoRLI: '#3B2F8F',
  suaveRLI: '#9490A8',
  bordaRLI: '#E6E1F2',
  erroRLI: '#E5484D',
  erroClaroRLI: '#FFB4A8',
  sucessoRLI: '#2E7D5B',
  estrelaRLI: '#FBBE21',
  inativoRLI: '#A9A5BD',
};

export const gradienteRLI = {
  ouroRLI: ['#A47BFA', '#8B5CF6', '#7440E8'] as const,
  escuroRLI: ['#14122B', '#221F3D'] as const,
  escuroVertRLI: ['#14122B', '#221F3D', '#2F2B52'] as const,
  cinzaRLI: ['#272240', '#332D55'] as const,
  promoRLI: ['#221F3D', '#3A3466'] as const,
};

export const fonteRLI = {
  regularRLI: 'Sora_400Regular',
  mediaRLI: 'Sora_500Medium',
  semiRLI: 'Sora_600SemiBold',
  tituloRLI: 'Sora_600SemiBold',
  tituloMedioRLI: 'Sora_600SemiBold',
};

export const sombraRLI = {
  suaveRLI: {
    shadowColor: '#221F3D',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  forteRLI: {
    shadowColor: '#14122B',
    shadowOpacity: 0.16,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
};
