import {View, Text, Input, Textarea, InputProps, Button} from '@tarojs/components'
import {useLoad} from '@tarojs/taro'
import './index.scss'
// eslint-disable-next-line import/first
import {CommonEvent} from "@tarojs/components/types/common";
// eslint-disable-next-line import/first
import {useEffect, useState} from "react";
import {SseText} from "./SseText";

export const BaseUrl = ""

export default function Index() {
  useLoad(() => { })

  const [mac, setMac] = useState<string>('')

  const [sseMac, setSseMac] = useState<string>('')

  return (
    <View className='index-bg' style={{ display:"flex", flexDirection:'column', gap: 10}}>
      <MacInput mac={mac} onMac={setMac} />
      <Text>发送数据</Text>
      <Textarea className='send-data' />
      <SseText mac={sseMac} />
      <Button
        type='primary'
        onClick={() => {
          setSseMac(mac)
        }}
      >发送数据</Button>
    </View>
  )
}

interface MacInputProps {
  onMac: (mac: string) => void
  mac: string
}


function MacInput({mac, onMac}: MacInputProps) {

  useEffect(() => {
  })

  function onText(txt: CommonEvent<InputProps.inputEventDetail>) {
    onMac(txt.detail.value)
  }

  return (
    <View className='flex-row'>
      <Text>请输入mac</Text>
      <Input className='input-border' type='text' value={mac} onInput={onText} />
    </View>
  )
}
