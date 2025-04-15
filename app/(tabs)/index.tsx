import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { categories } from "@/constants";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from 'react-native-snap-carousel';
// import CarouselLib from 'react-native-snap-carousel'
import CustomText from "@/components/CustomText";

type Plant = {
  id: number;
  title: string;
  description: string;
  category: string;
  stars: number;
  image: any; // Use 'ImageSourcePropType' if you want stricter typing for images
};

const plantData: Plant[] = [
  {
    id: 1,
    title: "Succulent",
    description: "Thrives indoors all year round.",
    category: "Indoor",
    stars: 4.5,
    image: require("@/assets/plants/7.jpeg"),
  },
  {
    id: 2,
    title: "Fiddle Leaf Fig",
    description: "Perfect for home or office.",
    category: "Indoor",
    stars: 4.7,
    image: require("@/assets/plants/8.jpeg"),
  },
  {
    id: 3,
    title: "Palm Branch",
    description: "Adds a tropical vibe.",
    category: "Outdoor",
    stars: 4.3,
    image: require("@/assets/plants/1.jpeg"),
  },
  {
    id: 4,
    title: "Bird of Paradise",
    description: "Elegant and vibrant.",
    category: "Outdoor",
    stars: 4.8,
    image: require("@/assets/plants/2.jpeg"),
  },
  {
    id: 5,
    title: "Artificial Fiddle Leaf",
    description: "Low maintenance beauty.",
    category: "Indoor",
    stars: 4.6,
    image: require("@/assets/plants/3.jpeg"),
  },
  {
    id: 6,
    title: "Succulent Vase",
    description: "Compact and stylish.",
    category: "Indoor",
    stars: 4.4,
    image: require("@/assets/plants/4.jpeg"),
  },
  {
    id: 7,
    title: "Leafy Green",
    description: "Fresh and vibrant.",
    category: "Garden",
    stars: 4.2,
    image: require("@/assets/plants/5.jpeg"),
  },
  {
    id: 8,
    title: "Artificial Palm",
    description: "Tropical and evergreen.",
    category: "Outdoor",
    stars: 4.9,
    image: require("@/assets/plants/6.jpeg"),
  },
];

const renderPlantCard = ({ item }: { item: Plant }) => {
  return (
    <View className="bg-green-700 rounded-3xl p-6 px-8 ">
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={item.image} className="w-[100%] h-64 rounded-2xl" />
      </View>
      <CustomText
        className="text-3xl mt-6 text-white"
        style={{ fontFamily: "PoppinsSemiBold" }}
      >
        {item.title}
      </CustomText>
      {/* <CustomText className="text-white" style={{fontFamily:"PoppinsItalic"}} > */}
      <CustomText className="text-white" style={{ fontFamily: "Poppins" }}>
        Category: {item.category}
      </CustomText>
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2 font-bold bg-green-200 rounded-full p-2 px-4 self-start mt-2">
          <Ionicons name="star" size={12} color={"green"} />
          <Text className=" text-green-700" style={{fontFamily:""}} >
            {item.stars}
          </Text>
        </View>
        <View className="border border-white rounded-full p-1">
          <Ionicons name="cart-outline" size={20} color={"white"}/>
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textInput: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
    },
    text: {
      fontFamily: "PoppinsSemiBold",
      fontSize: 16, // Add a valid property like fontSize
      color: "#000",
    },
  });
  return (
    <>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} className="px-4">
          <View className="flex flex-col gap-y-4 py-4">
            <View style={styles.container}>
              <Ionicons
                name="menu-outline"
                size={30}
                className="rounded-full"
              />
              <Ionicons
                name="person-circle"
                size={30}
                className="rounded-full"
                // color={"green"}
              />
            </View>
            <View className="flex-1 mt-4">
              <CustomText className="text-4xl font-PoppinsSemiBold">
                Top Picks
              </CustomText>
            </View>

            <View
              className="bg-gray-200 rounded-xl p-2 px-6 flex-row items-center mx-2"
              style={{
                justifyContent: "space-between",
              }}
            >
              <Ionicons name="search-outline" size={20} color="#9ca3af" />
              <TextInput
                placeholder="Search Product"
                placeholderClassName="font-Poppins "
                className="font-Poppins text-black text-base py-2"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginHorizontal: 12,
                }}
                placeholderTextColor="#9ca3af"
              />
              <Ionicons name="mic-outline" size={20} color="#9ca3af" />
            </View>
          </View>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              // keyExtractor={(item) => item.id}
              className="overflow-visible font-Poppins"
              renderItem={({ item }) => {
                let isActive = item.id === activeCategory;
                let activeTextClass = isActive ? "text-white" : "text-gray-700";
                return (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(item.id)}
                    style={{
                      backgroundColor: isActive ? "#15803d" : "#00000012",
                    }}
                    className="p-2 px-5 rounded-full mr-2 text-green-700"
                  >
                    <CustomText
                      className={`font-PoppinsSemiBold + ${activeTextClass}`}
                    >
                      {item.title}
                    </CustomText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View style={{}} className="mt-8">
            <Carousel
              data={plantData}
              renderItem={renderPlantCard}
              inactiveSlideOpacity={0.65} // opacity of inactive slides
              inactiveSlideScale={0.77} //size of inactive slides
              sliderWidth={350}
              itemWidth={250}
              loop={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
