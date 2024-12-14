import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { s } from './style'
import { IconTicket } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'

export type PlaceProps = {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}

type Props = TouchableOpacityProps & {
  data: PlaceProps
}

export function Place({
  data: { address, coupons, cover, description, id, name },
  ...rest
}: Props) {
  return (
    <TouchableOpacity style={s.container} {...rest}>
      <Image style={s.image} source={{ uri: cover }} alt={name} />
      <View style={s.content}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.description}>{description}</Text>

        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={s.tickets}>
            {coupons} {coupons !== 1 ? 'coupons' : 'coupon'} disponíveis
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
