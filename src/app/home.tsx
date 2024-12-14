import { Categories, CategoriesProps } from '@/components/categories'
import { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { View, Alert } from 'react-native'

type MarketProps = PlaceProps

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState('')
  const [markets, setMarkets] = useState<MarketProps[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) {
      Alert.alert('Categorias', 'Não foi possível carregar as categorias')
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return

      const { data } = await api.get('/markets/category/' + category)
      setMarkets(data)
    } catch (error) {
      Alert.alert('Mercados', 'Não foi possível carregar os mercados')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <View style={{ flex: 1, backgroundColor: '#cecece' }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />
      <Places data={markets} />
    </View>
  )
}
