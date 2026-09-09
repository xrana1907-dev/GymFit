import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const COLORS = {
  bg: "#0B0F14",
  card: "#131A22",
  card2: "#18222D",
  text: "#F7F9FC",
  muted: "#9BA8B5",
  green: "#42E87B",
  blue: "#4AA8FF",
  line: "#263341",
};

const plans = [
  { id: "chest", title: "Chest", emoji: "🏋️", exercises: ["Push-up", "Bench Press", "Incline Press", "Chest Fly"] },
  { id: "back", title: "Back", emoji: "💪", exercises: ["Pull-up", "Lat Pulldown", "Barbell Row", "Seated Row"] },
  { id: "legs", title: "Legs", emoji: "🦵", exercises: ["Squat", "Lunges", "Leg Press", "Calf Raise"] },
  { id: "shoulder", title: "Shoulder", emoji: "🔥", exercises: ["Shoulder Press", "Lateral Raise", "Front Raise", "Reverse Fly"] },
  { id: "arms", title: "Arms", emoji: "💥", exercises: ["Bicep Curl", "Hammer Curl", "Tricep Pushdown", "Dips"] },
  { id: "full", title: "Full Body", emoji: "⚡", exercises: ["Squat", "Push-up", "Row", "Plank", "Burpee"] },
];

function App() {
  const [tab, setTab] = useState("Home");
  const [water, setWater] = useState(3);
  const [workouts, setWorkouts] = useState(4);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const progress = useMemo(() => Math.min(workouts / 7, 1), [workouts]);

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.logo}>GYMFIT</Text>
        <Text style={styles.subtitle}>Train • Track • Improve</Text>
      </View>
      <View style={styles.avatar}><Text style={styles.avatarText}>GF</Text></View>
    </View>
  );

  const Nav = () => (
    <View style={styles.nav}>
      {["Home", "Workout", "Progress", "Profile"].map((item) => (
        <TouchableOpacity key={item} style={styles.navBtn} onPress={() => { setSelectedPlan(null); setTab(item); }}>
          <Text style={[styles.navText, tab === item && styles.navTextActive]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const Home = () => (
    <ScrollView contentContainerStyle={styles.content}>
      <Header />
      <View style={styles.hero}>
        <Text style={styles.heroKicker}>TODAY'S GOAL</Text>
        <Text style={styles.heroTitle}>Build a stronger you.</Text>
        <Text style={styles.heroText}>Complete one focused workout and keep your daily streak alive.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => setTab("Workout")}>
          <Text style={styles.primaryBtnText}>Start workout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>This week</Text>
      <View style={styles.row}>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{workouts}/7</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{water}/8</Text>
          <Text style={styles.statLabel}>Water glasses</Text>
        </View>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Weekly progress</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.muted}>{Math.round(progress * 100)}% of weekly workout target</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick actions</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.actionCard} onPress={() => setWater((n) => Math.min(8, n + 1))}>
          <Text style={styles.actionEmoji}>💧</Text>
          <Text style={styles.cardTitle}>Add water</Text>
          <Text style={styles.muted}>Tap to log 1 glass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => setWorkouts((n) => Math.min(7, n + 1))}>
          <Text style={styles.actionEmoji}>✅</Text>
          <Text style={styles.cardTitle}>Log workout</Text>
          <Text style={styles.muted}>Mark one complete</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 90}} />
    </ScrollView>
  );

  const Workout = () => (
    <ScrollView contentContainerStyle={styles.content}>
      <Header />
      {selectedPlan ? (
        <>
          <TouchableOpacity onPress={() => setSelectedPlan(null)} style={styles.backBtn}>
            <Text style={styles.backText}>← Back to plans</Text>
          </TouchableOpacity>
          <View style={styles.hero}>
            <Text style={styles.heroKicker}>{selectedPlan.emoji} {selectedPlan.title.toUpperCase()}</Text>
            <Text style={styles.heroTitle}>{selectedPlan.title} workout</Text>
            <Text style={styles.heroText}>3 sets each • 8–12 reps • 60–90 sec rest</Text>
          </View>
          {selectedPlan.exercises.map((ex, i) => (
            <View style={styles.exerciseCard} key={ex}>
              <View style={styles.numberCircle}><Text style={styles.numberText}>{i + 1}</Text></View>
              <View style={{flex: 1}}>
                <Text style={styles.cardTitle}>{ex}</Text>
                <Text style={styles.muted}>Controlled movement • Focus on form</Text>
              </View>
            </View>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.pageTitle}>Workout plans</Text>
          <Text style={styles.pageText}>Choose a muscle group and follow the exercise list.</Text>
          {plans.map((p) => (
            <TouchableOpacity key={p.id} style={styles.planCard} onPress={() => setSelectedPlan(p)}>
              <Text style={styles.planEmoji}>{p.emoji}</Text>
              <View style={{flex: 1}}>
                <Text style={styles.planTitle}>{p.title}</Text>
                <Text style={styles.muted}>{p.exercises.length} exercises</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
      <View style={{height: 90}} />
    </ScrollView>
  );

  const Progress = () => (
    <ScrollView contentContainerStyle={styles.content}>
      <Header />
      <Text style={styles.pageTitle}>Progress</Text>
      <Text style={styles.pageText}>Simple offline tracking. Your values stay while the app remains open.</Text>
      <View style={styles.bigCard}>
        <Text style={styles.heroKicker}>WORKOUTS THIS WEEK</Text>
        <Text style={styles.bigNumber}>{workouts}</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => setWorkouts((n) => Math.min(7, n + 1))}>
          <Text style={styles.primaryBtnText}>+ Add workout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bigCard}>
        <Text style={styles.heroKicker}>WATER TODAY</Text>
        <Text style={styles.bigNumber}>{water} / 8</Text>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => setWater((n) => Math.min(8, n + 1))}>
          <Text style={styles.secondaryBtnText}>+ Add glass</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 90}} />
    </ScrollView>
  );

  const Profile = () => (
    <ScrollView contentContainerStyle={styles.content}>
      <Header />
      <Text style={styles.pageTitle}>Profile</Text>
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>GF</Text></View>
        <Text style={styles.profileName}>GymFit User</Text>
        <Text style={styles.muted}>Fitness journey started</Text>
      </View>
      {["🎯 Goal: Stay consistent", "🔥 Streak: Keep moving", "🥗 Diet: Balanced meals", "😴 Recovery: Sleep 7–8 hours"].map((x) => (
        <View key={x} style={styles.settingRow}><Text style={styles.settingText}>{x}</Text></View>
      ))}
      <View style={{height: 90}} />
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <View style={styles.screen}>
        {tab === "Home" && <Home />}
        {tab === "Workout" && <Workout />}
        {tab === "Progress" && <Progress />}
        {tab === "Profile" && <Profile />}
        <Nav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 18 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 22 },
  logo: { color: COLORS.green, fontSize: 24, fontWeight: "900", letterSpacing: 1.5 },
  subtitle: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.card2, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.line },
  avatarText: { color: COLORS.green, fontWeight: "800" },
  hero: { backgroundColor: COLORS.card, borderRadius: 24, padding: 22, borderWidth: 1, borderColor: COLORS.line, marginBottom: 22 },
  heroKicker: { color: COLORS.green, fontSize: 12, fontWeight: "800", letterSpacing: 1.2, marginBottom: 8 },
  heroTitle: { color: COLORS.text, fontSize: 29, lineHeight: 35, fontWeight: "900" },
  heroText: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginTop: 10, marginBottom: 18 },
  primaryBtn: { alignSelf: "flex-start", backgroundColor: COLORS.green, paddingHorizontal: 18, paddingVertical: 13, borderRadius: 14 },
  primaryBtnText: { color: "#06110A", fontWeight: "900" },
  secondaryBtn: { alignSelf: "flex-start", backgroundColor: COLORS.card2, paddingHorizontal: 18, paddingVertical: 13, borderRadius: 14, borderWidth: 1, borderColor: COLORS.blue },
  secondaryBtnText: { color: COLORS.blue, fontWeight: "900" },
  sectionTitle: { color: COLORS.text, fontSize: 19, fontWeight: "800", marginTop: 4, marginBottom: 12 },
  row: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: COLORS.card, borderRadius: 18, padding: 17, borderWidth: 1, borderColor: COLORS.line },
  statNum: { color: COLORS.text, fontSize: 28, fontWeight: "900" },
  statLabel: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  progressCard: { backgroundColor: COLORS.card, borderRadius: 18, padding: 17, borderWidth: 1, borderColor: COLORS.line, marginBottom: 20 },
  progressTrack: { height: 10, backgroundColor: COLORS.card2, borderRadius: 999, overflow: "hidden", marginVertical: 12 },
  progressFill: { height: "100%", backgroundColor: COLORS.green, borderRadius: 999 },
  actionCard: { flex: 1, minHeight: 135, backgroundColor: COLORS.card, borderRadius: 18, padding: 17, borderWidth: 1, borderColor: COLORS.line },
  actionEmoji: { fontSize: 25, marginBottom: 12 },
  cardTitle: { color: COLORS.text, fontSize: 16, fontWeight: "800" },
  muted: { color: COLORS.muted, fontSize: 12, lineHeight: 18, marginTop: 3 },
  pageTitle: { color: COLORS.text, fontSize: 30, fontWeight: "900", marginBottom: 5 },
  pageText: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginBottom: 20 },
  planCard: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.card, borderRadius: 18, padding: 17, marginBottom: 12, borderWidth: 1, borderColor: COLORS.line },
  planEmoji: { fontSize: 28, marginRight: 14 },
  planTitle: { color: COLORS.text, fontSize: 17, fontWeight: "800" },
  arrow: { color: COLORS.green, fontSize: 32, marginLeft: 10 },
  backBtn: { marginBottom: 14 },
  backText: { color: COLORS.blue, fontWeight: "700" },
  exerciseCard: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.card, borderRadius: 18, padding: 16, marginBottom: 11, borderWidth: 1, borderColor: COLORS.line },
  numberCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.card2, alignItems: "center", justifyContent: "center", marginRight: 13 },
  numberText: { color: COLORS.green, fontWeight: "900" },
  bigCard: { backgroundColor: COLORS.card, borderRadius: 22, padding: 22, marginBottom: 14, borderWidth: 1, borderColor: COLORS.line },
  bigNumber: { color: COLORS.text, fontSize: 42, fontWeight: "900", marginBottom: 18 },
  profileCard: { alignItems: "center", backgroundColor: COLORS.card, borderRadius: 22, padding: 24, marginVertical: 18, borderWidth: 1, borderColor: COLORS.line },
  profileAvatar: { width: 78, height: 78, borderRadius: 39, backgroundColor: COLORS.card2, alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 2, borderColor: COLORS.green },
  profileAvatarText: { color: COLORS.green, fontWeight: "900", fontSize: 24 },
  profileName: { color: COLORS.text, fontSize: 20, fontWeight: "900" },
  settingRow: { backgroundColor: COLORS.card, borderRadius: 16, padding: 17, marginBottom: 10, borderWidth: 1, borderColor: COLORS.line },
  settingText: { color: COLORS.text, fontSize: 14, fontWeight: "700" },
  nav: { position: "absolute", left: 12, right: 12, bottom: 10, height: 66, borderRadius: 22, backgroundColor: "#111821", borderWidth: 1, borderColor: COLORS.line, flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: 8 },
  navBtn: { flex: 1, alignItems: "center", paddingVertical: 14 },
  navText: { color: COLORS.muted, fontSize: 12, fontWeight: "700" },
  navTextActive: { color: COLORS.green },
});

export default App;
