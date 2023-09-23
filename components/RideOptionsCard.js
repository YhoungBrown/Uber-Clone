import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)


  const data = [
    {
      id: "Uber-X-123",
      title: "Uber X",
      multiplier: 1,
      image: "https://links.papareact.com/3pn"
    },
    {
      id: "Uber-XL-456",
      title: "Uber XL",
      multiplier: 1.2,
      image: "https://links.papareact.com/5w8"
    },
    {
      id: "Uber-LUX-789",
      title: "Uber LUX",
      multiplier: 1.75,
      image: "https://links.papareact.com/7pf"
    },
  ];

  const SURGE_CHARGE_RATE = 1.5;

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
    <View>
      <TouchableOpacity 
        onPress={() => navigation.navigate("NavigateCard")}
        style={tw`absolute top-3 left-5 p-3 rounded-full z-50`}>
        <Icon name='chevron-left' type='font-awesome'/>
        
      </TouchableOpacity> 

      <Text style={tw`text-center py-5 text-xl`}>Select A Ride - {travelTimeInformation?.distance?.text}</Text>
    </View>

    <FlatList 
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({item: {id, title, multiplier, image}, item}) => (
        <TouchableOpacity
        onPress={() => setSelected(item)}
         style={tw`flex-row justify-between items-center px-5 ${id===selected?.id && "bg-gray-200"}`}>
          <Image 
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
            source={{uri: image}}
          />
          <View style={tw`-ml-2`}>
            <Text style={tw `text-xl font-semibold`}>{title}</Text>
            <Text style={tw`text-xs`}>{travelTimeInformation?.duration?.text} Travel Time</Text>
          </View>
          <Text style={tw`text-lg ml-2`}>

            {new Intl.NumberFormat("en-gb", {
              style: 'currency',
              currency: "GBP"
              }).format(

                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier)/100

              )}

          </Text>
        </TouchableOpacity>
      )}
    />

    <View style={tw`mt-auto border-t border-gray-200 mb-1 px-3`}>
      <TouchableOpacity
      disabled={!selected}
       style={tw`bg-black py-3 ${!selected && "bg-gray-200"}`}>
        <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})