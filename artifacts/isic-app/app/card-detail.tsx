import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import QRCode from "react-native-qrcode-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_W = Math.min(SCREEN_WIDTH - 40, 360);

const cards = [
  {
    id: "1",
    type: "ISIC",
    cardNumber: "S 123 456 789 012 X",
    holderName: "Karolína Veselá",
    school: "Škola",
    validFrom: "09/2025",
    validTo: "12/2026",
    born: "21. 03. 2002",
    valid: true,
  },
];

function ISICCard({ card }: { card: typeof cards[0] }) {
  const cardH = CARD_W * 1.55;

  return (
    <View style={[styles.card, { width: CARD_W, height: cardH }]}>
      <View style={styles.cardHeader}>
        <View style={styles.isicLogoArea}>
          <View style={styles.isicCircle}>
            <Text style={styles.isicCircleText}>ISIC</Text>
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.isicIntl}>INTERNATIONAL</Text>
            <Text style={styles.isicStudent}>STUDENT</Text>
            <Text style={styles.isicIdentity}>IDENTITY CARD</Text>
          </View>
        </View>
        <View style={styles.unescoArea}>
          <Feather name="globe" size={20} color="#0D5C84" />
          <View style={{ marginLeft: 4 }}>
            <Text style={styles.cardNumLabel}>ISIC card number</Text>
            <Text style={styles.cardNum}>{card.cardNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.photoContainer}>
          <View style={styles.photoPlaceholder}>
            <Feather name="user" size={52} color="#ffffff" />
          </View>
        </View>

        <Text style={styles.holderName}>{card.holderName}</Text>
        <Text style={styles.holderSchool}>{card.school}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Platnost | Validity</Text>
            <Text style={styles.infoValue}>
              {card.validFrom} – {card.validTo}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Narozen(a) | Born</Text>
            <Text style={styles.infoValue}>{card.born}</Text>
          </View>
        </View>

        <View style={styles.qrContainer}>
          <QRCode
            value={`ISIC-${card.cardNumber}`}
            size={CARD_W * 0.4}
            color="#1C1B2E"
            backgroundColor="#ffffff"
          />
        </View>
      </View>
    </View>
  );
}

export default function CardDetailScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [activeTab, setActiveTab] = useState<"front" | "back">("front");
  const [activeCard, setActiveCard] = useState(0);

  const now = new Date();
  const dateStr = `${now.getDate()}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: topPad + 4 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.validBadge}>
          <View style={styles.greenDot} />
          <Text style={styles.validText}>PLATNÝ</Text>
        </View>
        <Text style={styles.dateTimeText}>
          {dateStr} | {timeStr}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomPad + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardWrapper}>
          <ISICCard card={cards[activeCard]} />
        </View>

        <View style={styles.dotRow}>
          {cards.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeCard === i ? styles.dotActive : {}]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomActions, { paddingBottom: bottomPad + 10 }]}>
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "front" && styles.tabBtnActive]}
            onPress={() => setActiveTab("front")}
          >
            <Feather
              name="credit-card"
              size={22}
              color={activeTab === "front" ? "#ffffff" : "#8A8A9A"}
            />
          </TouchableOpacity>
          <View style={styles.tabDivider} />
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "back" && styles.tabBtnActive]}
            onPress={() => setActiveTab("back")}
          >
            <Feather
              name="list"
              size={22}
              color={activeTab === "back" ? "#ffffff" : "#8A8A9A"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBar: {
    backgroundColor: "#1C1B2E",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  validBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greenDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#34D399",
  },
  validText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#34D399",
    letterSpacing: 0.5,
  },
  dateTimeText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#A0A0C0",
    marginLeft: "auto",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 20,
  },
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderRadius: 16,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#5ECECE",
  },
  cardHeader: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  isicLogoArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  isicCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#30B8B8",
    alignItems: "center",
    justifyContent: "center",
  },
  isicCircleText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  isicIntl: {
    fontFamily: "Inter_400Regular",
    fontSize: 8,
    color: "#1C3A6E",
    letterSpacing: 0.5,
  },
  isicStudent: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#1C3A6E",
    letterSpacing: 0.5,
  },
  isicIdentity: {
    fontFamily: "Inter_400Regular",
    fontSize: 8,
    color: "#1C3A6E",
    letterSpacing: 0.5,
  },
  unescoArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardNumLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 9,
    color: "#6B6B8A",
  },
  cardNum: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#1C1B2E",
  },
  cardBody: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 20,
    backgroundColor: "#5ECECE",
  },
  photoContainer: {
    marginBottom: 16,
  },
  photoPlaceholder: {
    width: CARD_W * 0.38,
    height: CARD_W * 0.38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  holderName: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#1C1B2E",
    marginBottom: 4,
  },
  holderSchool: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#1C3A6E",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  infoBlock: {
    alignItems: "flex-start",
  },
  infoLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#1C3A6E",
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#1C1B2E",
  },
  qrContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
  },
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#C7C7CC",
  },
  dotActive: {
    backgroundColor: "#6C63FF",
  },
  bottomActions: {
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F2F3F7",
    backgroundColor: "#ffffff",
  },
  tabSwitcher: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F7",
    borderRadius: 50,
    padding: 4,
  },
  tabBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBtnActive: {
    backgroundColor: "#6C63FF",
  },
  tabDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E5EA",
    marginHorizontal: 2,
  },
});
