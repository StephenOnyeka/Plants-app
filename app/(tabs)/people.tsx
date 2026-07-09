import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../_layout";
import CustomText from "@/components/CustomText";
import { people as seedPeople, Person } from "@/constants/community";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatFollowers(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

export default function People() {
  const { isDarkMode } = useContext(ThemeContext);
  const [people, setPeople] = useState<Person[]>(seedPeople);

  const toggleFollow = (id: number) => {
    setPeople((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              following: !p.following,
              followers: p.following ? p.followers - 1 : p.followers + 1,
            }
          : p
      )
    );
  };

  const renderItem = ({ item }: { item: Person }) => (
    <View
      style={[
        styles.row,
        { borderBottomColor: isDarkMode ? "#2d2d2d" : "#f3f4f6" },
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: item.color }]}>
        <Text style={styles.avatarText}>{initials(item.name)}</Text>
      </View>
      <View style={styles.info}>
        <CustomText
          style={[styles.name, { color: isDarkMode ? "white" : "black" }]}
        >
          {item.name}
        </CustomText>
        <Text
          style={[styles.handle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}
        >
          {item.handle} · {formatFollowers(item.followers)} followers
        </Text>
        <Text
          style={[styles.bio, { color: isDarkMode ? "#d1d5db" : "#374151" }]}
          numberOfLines={2}
        >
          {item.bio}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleFollow(item.id)}
        style={[
          styles.followButton,
          item.following
            ? {
                backgroundColor: "transparent",
                borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
              }
            : { backgroundColor: "#16a34a", borderColor: "#16a34a" },
        ]}
      >
        <Text
          style={[
            styles.followText,
            {
              color: item.following
                ? isDarkMode
                  ? "#d1d5db"
                  : "#374151"
                : "white",
            },
          ]}
        >
          {item.following ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      <FlatList
        data={people}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <CustomText
            style={[
              styles.header,
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            Discover plant lovers
          </CustomText>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  handle: {
    fontSize: 12,
    marginTop: 2,
  },
  bio: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  followButton: {
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  followText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
