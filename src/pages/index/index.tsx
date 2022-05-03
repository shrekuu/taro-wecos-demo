import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import utils from '../../utils'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index-page'>
        <Text className='page-title'>Hello WeCOS!</Text>

        <View className='usage-card usage-1'>
          <Text className='card-title'>用法 1: Image 标签</Text>
          <View className='card-body'>
            <Image className='demo-image' src={utils.cos('/cos/static/images/jugaogao.jpg')}></Image>
          </View>
        </View>

        <View className='usage-card usage-2'>
          <Text className='card-title'>用法 2: 背景图片</Text>
          <View className='card-body'></View>
        </View>

      </View>
    )
  }
}
