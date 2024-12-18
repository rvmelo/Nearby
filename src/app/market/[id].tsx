import { Button } from '@/components/button'
import { Loading } from '@/components/loading'
import { Coupon } from '@/components/market/coupon'
import { Cover } from '@/components/market/cover'
import { Details, PropsDetails } from '@/components/market/details'
import { api } from '@/services/api'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { View, Alert, Modal, StatusBar, ScrollView } from 'react-native'

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  console.log(params.id)

  const [data, setData] = useState<DataProps>()
  const [isLoading, setIsLoading] = useState(true)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [couponIsFetching, setCouponIsFetching] = useState(false)

  const qrLock = useRef(false)

  const requestPermission = useCameraPermissions()[1]

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert('Mercado', 'Não foi possível carregar o mercado', [
        { text: 'Ok', onPress: () => router.back() },
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        return Alert.alert(
          'Permissão',
          'Você precisa permitir o acesso a câmera',
        )
      }

      qrLock.current = false
      setIsVisibleCameraModal(true)
    } catch (error) {
      Alert.alert('Camera', 'Não foi possível abrir a câmera')
      console.log(error)
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)
      const { data } = await api.patch('/coupons/' + id)
      Alert.alert('Cupom', data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert('Cupom', 'Não foi possível gerar o cupom')
    } finally {
      setIsVisibleCameraModal(false)
    }
  }

  function handleUserCoupon(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert(
      'Cupom',
      'Não é possível reutilizar um coupon resgatado. Deseja realmente resgatar o coupon?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => getCoupon(id),
        },
      ],
    )
  }

  useEffect(() => {
    fetchMarket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, coupon])

  if (isLoading) return <Loading />

  if (!data) return <Redirect href="/home" />

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => {
                handleUserCoupon(data)
              }, 500)
            }
          }}
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
