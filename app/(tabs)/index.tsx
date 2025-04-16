import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Text,
} from "react-native";
import { categories } from "@/constants";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import CustomText from "@/components/CustomText";
import RenderPlantCard from "@/components/RenderPlantCard";
import plantData from "@/constants/plantData";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({}); // Define type for favorites

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the favorite status
    }));
  };

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
          {/* <View className="flex-1 py-4">
            <CustomText className="text-3xl font-PoppinsSemiBold">
              Categories
            </CustomText>
          </View> */}
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
              renderItem={({ item }) => <RenderPlantCard item={item} />}
              inactiveSlideOpacity={0.65} // opacity of inactive slides
              inactiveSlideScale={0.77} //size of inactive slides
              sliderWidth={350}
              itemWidth={250}
              loop={true}
            />
          </View>
          <View>
            <CustomText className="text-xl my-4">New Arrival</CustomText>
          </View>
          <View className="bg-gray-300 rounded-3xl flex flex-row gap-4 items-center p-4">
            <Image
              source={require("@/assets/plants/5.jpeg")}
              className="rounded-2xl size-28"
              // className="rounded-2xl w-20 h-24"
            />
            <View className="flex-1">
              <View className="flex flex-row justify-between items-center">
                <CustomText
                  className="text-2xl"
                  style={{ fontFamily: "PoppinsSemiBold" }}
                >
                  Cactus
                </CustomText>
                <CustomText className="text-2xl font-semibold">$64</CustomText>
              </View>
              <CustomText className=" mt-2" style={{ fontFamily: "Poppins" }}>
                Category: Outdoor
              </CustomText>
              <View className="flex flex-row items-center justify-between mt-2">
                <View className="flex flex-row items-center gap-2 font-bold bg-gray-200 rounded-full p-2 px-4">
                  <Ionicons name="star" size={12} />
                  <Text className="" style={{ fontFamily: "" }}>
                    4.7
                  </Text>
                </View>
                <TouchableOpacity className="border rounded-full p-2">
                  <Fontisto name="plus-a" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="mt-8">
            <CustomText
              className="text-2xl mb-4"
              // style={{ fontFamily: "PoppinsSemiBold" }}
            >
              Hot Take
            </CustomText>
            <FlatList
              data={plantData}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2} // Display items side by side
              columnWrapperStyle={{ justifyContent: "space-between" }} // Add spacing between columns
              renderItem={({ item }) => (
                <>
                  <View className="rounded-2xl overflow-hidden w-[48%] mb-4">
                    {/* Use ImageBackground for the background image */}
                    <View className="w-full bg-white rounded-2xl">
                      <ImageBackground
                        source={item.image}
                        resizeMode="contain" // Use "cover" to ensure the image fills the section
                        className="size-44 rounded-2xl"
                      >
                        <TouchableOpacity
                          onPress={() => toggleFavorite(item.id)}
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            // zIndex: 1,
                          }}
                          // className="border rounded-full "
                          // className="border border-green-600 rounded-full "
                        >
                          <Ionicons
                            name={
                              favorites[item.id]
                                ? "heart-sharp"
                                : "heart-outline"
                            }
                            size={24}
                            color={"green"}
                            // color={favorites[item.id] ? "green" : "white"}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>

                    {/* Text and other content */}
                    <View className=" p-2 w-full">
                      <View className="flex flex-row items-center justify-between">
                        <CustomText className="rounded-full text-sm text-gray-500">
                          {item.category}
                        </CustomText>
                        <View className="flex flex-row items-center gap-1 font-bold rounded-full p-2">
                          <Ionicons name="star" size={12} color={"#6b7280"} />
                          <Text
                            className="text-gray-500"
                            style={{ fontFamily: "" }}
                          >
                            {item.stars}
                          </Text>
                        </View>
                      </View>
                      <CustomText
                        // className="text-green-600 "
                        style={{ fontFamily: "PoppinsSemiBold" }}
                      >
                        {item.title}
                      </CustomText>
                      <CustomText className="text ">${item.price}</CustomText>
                    </View>
                  </View>
                </>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

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
