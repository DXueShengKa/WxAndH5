import {Text, View} from "@tarojs/components";
import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";


export function SseText({mac}) {
  const [sse, setSse] = useState('')

  useEffect(() => {
    if (!mac) return
    return sseTask(setSse)
  }, [mac])


  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <Text>收到设备数据</Text>
      <Text className='input-border' style={{width: '80%', height: 100}}>{sse}</Text>
    </View>
  )
}

function sseTask(onMsg) {
  if (process.env.TARO_ENV === 'weapp') {
    return wxSseTask(onMsg)
  } else {
    return h5SseTask(onMsg)
  }
}

function wxSseTask(onMsg) {
  const task = Taro.request({
    url: "http://localhost:8017/auth/sse",
    method: "GET",
    enableChunked: true,
    header: {
      "content-type": "text/event-stream",
    },
    responseType: 'text'
  })

  task.catch(reason => {
    console.log("sse连接错误",reason)
  })

  const textDecoder = new TextDecoder();
  const chunk = (result: { data: ArrayBuffer; }) => {
    const data = new Uint8Array(result.data)
    let str = textDecoder.decode(data)
      .split('\n')
      .find((v) => {
        return v.startsWith("data:")
      })
      ?.substring("data:".length)

    onMsg(str)
  }

  task.onChunkReceived(chunk)
  return () => {
    task.offChunkReceived(chunk)
    task.abort()
  }
}

function h5SseTask(onMsg) {
  const es = new EventSource('')
  es.onopen = event => {
    console.log("onopen", event)
  }
  es.onmessage = event => {
    console.log(event)
    onMsg(event.data)
  }
  es.onerror = errot => {
    console.log(errot)
  }
  return () => {
    console.log("close()")
    es.close()
  }
}

