import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../_layout";
import CustomText from "@/components/CustomText";
import {
  conversations as seedConversations,
  Conversation,
} from "@/constants/community";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Messages() {
  const { isDarkMode } = useContext(ThemeContext);
  const [conversations, setConversations] =
    useState<Conversation[]>(seedConversations);

  // Tapping a conversation marks it read (clears the unread badge).
  const openConversation = (id: number) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const renderItem = ({ item }: { item: Conversation }) => {
    const hasUnread = item.unread > 0;
    return (
      <TouchableOpacity
        onPress={() => openConversation(item.id)}
        style={[
          styles.row,
          { borderBottomColor: isDarkMode ? "#2d2d2d" : "#f3f4f6" },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: item.color }]}>
          <Text style={styles.avatarText}>{initials(item.name)}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.topLine}>
            <CustomText
              style={[styles.name, { color: isDarkMode ? "white" : "black" }]}
              numberOfLines={1}
            >
              {item.name}
            </CustomText>
            <Text
              style={[
                styles.time,
                { color: isDarkMode ? "#9ca3af" : "#6b7280" },
              ]}
            >
              {item.time}
            </Text>
          </View>
          <View style={styles.bottomLine}>
            <Text
              style={[
                styles.preview,
                {
                  color: hasUnread
                    ? isDarkMode
                      ? "white"
                      : "black"
                    : isDarkMode
                    ? "#9ca3af"
                    : "#6b7280",
                  fontWeight: hasUnread ? "600" : "400",
                },
              ]}
              numberOfLines={1}
            >
              {item.lastMessage}
            </Text>
            {hasUnread && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
  },
  bottomLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  preview: {
    fontSize: 14,
    flex: 1,
  },
  badge: {
    backgroundColor: "#16a34a",
    borderRadius: 9999,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
});
