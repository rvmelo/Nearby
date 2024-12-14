import { FlatList } from 'react-native'
import { Category } from '../category'
import { s } from './styles'

export type CategoriesProps = {
  id: string
  name: string
}[]

type Props = {
  data: CategoriesProps
  selected: string
  onSelect: (id: string) => void
}

export function Categories({ data, onSelect, selected }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          iconId={item.id}
          name={item.name}
          isSelected={item.id === selected}
          onPress={() => onSelect(item.id)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.content}
      style={s.container}
    />
  )
}
