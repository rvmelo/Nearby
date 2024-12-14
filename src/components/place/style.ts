import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  container: {
    height: 120,
    flexDirection: 'row',
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    gap: 16,
    alignItems: 'center',
  },
  image: {
    width: 116,
    height: 104,
    backgroundColor: colors.gray[200],
    borderRadius: 8,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
  },
  description: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
  footer: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 10,
  },
  tickets: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[400],
  },
})
