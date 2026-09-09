import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#061018",
  card: "#0D1B26",
  card2: "#102330",
  green: "#20F28A",
  blue: "#1EA7FF",
  text: "#F4F8FB",
  muted: "#8EA1AE",
  line: "#1B303D",
  red: "#FF5571",
  yellow: "#FFD54A",
};

const workouts = [
  { id: "chest", title: "Chest Workout", icon: "barbell", duration: "45 min", exercises: 6, image: "💪" },
  { id: "back", title: "Back Workout", icon: "weight-lifter", duration: "45 min", exercises: 6, image: "🏋️" },
  { id: "shoulder", title: "Shoulder Workout", icon: "arm-flex", duration: "40 min", exercises: 5, image: "🔥" },
  { id: "arms", title: "Arm Workout", icon: "dumbbell", duration: "40 min", exercises: 5, image: "💪" },
  { id: "legs", title: "Leg Workout", icon: "run-fast", duration: "50 min", exercises: 6, image: "🦵" },
  { id: "full", title: "Full Body Workout", icon: "human", duration: "60 min", exercises: 8, image: "⚡" },
];

const exerciseData = {
  chest: [
    ["Bench Press", "3 sets", "10-12 reps", "60s", "Lie on a flat bench, grip the bar slightly wider than your shoulders, lower with control, then press upward."],
    ["Incline Dumbbell Press", "3 sets", "10 reps", "60s", "Keep your shoulder blades back, lower the dumbbells beside your chest and press them up."],
    ["Cable Fly", "3 sets", "12-15 reps", "45s", "Keep a soft bend in your elbows and bring your hands together in front of your chest."],
    ["Push Up", "3 sets", "12 reps", "45s", "Keep your body straight, brace your core and lower your chest before pushing away."],
    ["Chest Dip", "3 sets", "8-12 reps", "60s", "Lean slightly forward and lower your body until you feel a chest stretch."],
    ["Pec Deck", "3 sets", "12 reps", "45s", "Sit tall and bring the handles together without shrugging your shoulders."],
  ],
  back: [
    ["Lat Pulldown", "3 sets", "10-12 reps", "60s", "Pull the bar toward your upper chest while keeping your torso stable."],
    ["Seated Cable Row", "3 sets", "10-12 reps", "60s", "Pull toward your waist and squeeze your shoulder blades together."],
    ["Deadlift", "3 sets", "6-8 reps", "90s", "Brace your core, keep the bar close and drive through the floor."],
    ["One Arm Row", "3 sets", "10 reps", "60s", "Keep your back neutral and pull the dumbbell toward your hip."],
    ["Face Pull", "3 sets", "12-15 reps", "45s", "Pull the rope toward your face while rotating your hands outward."],
    ["Back Extension", "3 sets", "12 reps", "45s", "Move through your hips and keep the motion controlled."],
  ],
  shoulder: [
    ["Overhead Press", "3 sets", "8-10 reps", "75s", "Press the weight overhead while keeping your ribs down and core tight."],
    ["Lateral Raise", "3 sets", "12-15 reps", "45s", "Raise dumbbells to shoulder height with a slight bend in the elbows."],
    ["Front Raise", "3 sets", "12 reps", "45s", "Lift the dumbbells in front of you without swinging."],
    ["Rear Delt Fly", "3 sets", "12-15 reps", "45s", "Hinge forward and move your arms outward while keeping your neck relaxed."],
    ["Shrug", "3 sets", "12 reps", "45s", "Lift your shoulders toward your ears, pause, then lower slowly."],
  ],
  arms: [
    ["Dumbbell Curl", "3 sets", "10-12 reps", "45s", "Keep elbows close to your body and curl without swinging."],
    ["Hammer Curl", "3 sets", "10-12 reps", "45s", "Keep palms facing inward throughout the curl."],
    ["Tricep Pushdown", "3 sets", "12 reps", "45s", "Keep elbows pinned and extend your arms fully."],
    ["Overhead Tricep Extension", "3 sets", "10-12 reps", "45s", "Lower the weight behind your head and extend smoothly."],
    ["Close Grip Push Up", "3 sets", "10 reps", "45s", "Keep elbows close to your sides as you lower and press."],
  ],
  legs: [
    ["Barbell Squat", "4 sets", "8-10 reps", "90s", "Brace your core, sit down between your hips and drive upward through your feet."],
    ["Leg Press", "3 sets", "10-12 reps", "75s", "Keep your lower back supported and lower the platform with control."],
    ["Romanian Deadlift", "3 sets", "10 reps", "75s", "Push your hips back while keeping the weights close to your legs."],
    ["Leg Extension", "3 sets", "12 reps", "60s", "Extend your knees smoothly and squeeze your quads at the top."],
    ["Leg Curl", "3 sets", "12 reps", "60s", "Curl your heels toward your glutes without lifting your hips."],
    ["Calf Raise", "4 sets", "15 reps", "45s", "Rise onto your toes, pause, then lower through a full range."],
  ],
  full: [
    ["Goblet Squat", "3 sets", "12 reps", "60s", "Keep the weight close to your chest and squat with control."],
    ["Push Up", "3 sets", "12 reps", "45s", "Maintain a straight body line and brace your core."],
    ["Dumbbell Row", "3 sets", "10 reps", "60s", "Pull the dumbbell toward your hip while keeping your back neutral."],
    ["Overhead Press", "3 sets", "10 reps", "60s", "Press overhead while keeping your core tight."],
    ["Romanian Deadlift", "3 sets", "10 reps", "60s", "Hinge at the hips and keep the dumbbells close."],
    ["Plank", "3 sets", "45 sec", "45s", "Keep your hips level and breathe steadily while bracing your core."],
    ["Lunge", "3 sets", "10/leg", "60s", "Step forward, lower under control and push back to standing."],
    ["Mountain Climber", "3 sets", "30 sec", "30s", "Drive knees toward your chest while keeping your shoulders over your hands."],
  ],
};

const meals = [
  ["Breakfast", "Oats + Banana + Nuts", "≈ 450 kcal", "🥣"],
  ["Lunch", "Chicken Breast + Brown Rice", "≈ 600 kcal", "🍗"],
  ["Snack", "Greek Yogurt + Berries", "≈ 250 kcal", "🫐"],
  ["Dinner", "Fish + Vegetables", "≈ 550 kcal", "🐟"],
];

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function Header({ title, onBack, right }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
      ) : <View style={{ width: 42 }} />}
      <Text style={styles.headerTitle}>{title}</Text>
      {right || <View style={{ width: 42 }} />}
    </View>
  );
}

function Stat({ icon, value, label }) {
  return (
    <View style={styles.stat}>
      <View style={styles.statIcon}><Ionicons name={icon} size={18} color={COLORS.green} /></View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function BottomTabs({ tab, setTab }) {
  const items = [
    ["home", "Home", "home"],
    ["workouts", "Workouts", "barbell-outline"],
    ["progress", "Progress", "stats-chart-outline"],
    ["diet", "Diet", "restaurant-outline"],
    ["profile", "Profile", "person-outline"],
  ];
  return (
    <View style={styles.bottom}>
      {items.map(([id, label, icon]) => (
        <TouchableOpacity key={id} onPress={() => setTab(id)} style={styles.tab}>
          <Ionicons name={icon} size={22} color={tab === id ? COLORS.green : COLORS.muted} />
          <Text style={[styles.tabText, tab === id && { color: COLORS.green }]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Home({ setTab, openWorkout }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.smallText}>GOOD MORNING,</Text>
          <Text style={styles.greeting}>Rana 💪</Text>
        </View>
        <View style={styles.avatar}><Text style={{fontSize: 22}}>🏋️</Text></View>
      </View>

      <TouchableOpacity onPress={() => openWorkout("full")} activeOpacity={0.9}>
        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroKicker}>TODAY'S WORKOUT</Text>
            <Text style={styles.heroTitle}>Full Body</Text>
            <Text style={styles.heroSub}>8 exercises • 60 min</Text>
            <View style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Start Workout</Text></View>
          </View>
          <Text style={{ fontSize: 72 }}>🏋️</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.statsRow}>
        <Stat icon="flame" value="7" label="Day Streak" />
        <Stat icon="scale-outline" value="68 kg" label="Current Weight" />
        <Stat icon="calendar-outline" value="3" label="This Week" />
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickGrid}>
        {[
          ["barbell-outline", "Exercise Guide", "workouts"],
          ["restaurant-outline", "Diet Plan", "diet"],
          ["water-outline", "Water Tracker", "water"],
          ["ellipsis-horizontal", "More", "progress"],
        ].map(([icon, label, id]) => (
          <TouchableOpacity key={label} onPress={() => id === "water" ? setTab("progress") : setTab(id)} style={styles.quick}>
            <View style={styles.quickIcon}><Ionicons name={icon} size={23} color={COLORS.green} /></View>
            <Text style={styles.quickText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <TouchableOpacity onPress={() => setTab("progress")}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
      </View>
      <Card>
        <View style={styles.sectionRow}>
          <View>
            <Text style={styles.muted}>Weight</Text>
            <Text style={styles.bigValue}>68 kg <Text style={{fontSize: 14, color: COLORS.green}}>↓ 2 kg</Text></Text>
          </View>
          <Text style={{fontSize: 36}}>📈</Text>
        </View>
        <View style={styles.chartBars}>
          {[18,24,20,31,27,38,44,52,47,61,56,68].map((h, i) => <View key={i} style={[styles.bar, {height: h}]} />)}
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Today's Tip</Text>
      <Card>
        <Text style={{fontSize: 28, marginBottom: 6}}>💧</Text>
        <Text style={styles.cardTitle}>Stay hydrated</Text>
        <Text style={styles.muted}>Aim for 8 glasses of water today to support your workout and recovery.</Text>
      </Card>
    </ScrollView>
  );
}

function WorkoutList({ openWorkout }) {
  const [search, setSearch] = useState("");
  const filtered = workouts.filter(w => w.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <View style={styles.sectionRow}>
        <View>
          <Text style={styles.smallText}>TRAIN SMART</Text>
          <Text style={styles.pageTitle}>Workout Plans</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}><Ionicons name="search" size={22} color={COLORS.text} /></TouchableOpacity>
      </View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search workouts..."
        placeholderTextColor={COLORS.muted}
        style={styles.search}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 14}}>
        {["All", "Upper Body", "Lower Body", "Full Body"].map((x, i) =>
          <View key={x} style={[styles.pill, i === 0 && styles.pillActive]}><Text style={[styles.pillText, i === 0 && {color: COLORS.bg}]}>{x}</Text></View>
        )}
      </ScrollView>
      {filtered.map(w => (
        <TouchableOpacity key={w.id} onPress={() => openWorkout(w.id)} activeOpacity={0.85}>
          <Card style={styles.workoutCard}>
            <View style={styles.workoutEmoji}><Text style={{fontSize: 30}}>{w.image}</Text></View>
            <View style={{flex: 1}}>
              <Text style={styles.cardTitle}>{w.title}</Text>
              <Text style={styles.muted}>{w.exercises} exercises • {w.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function WorkoutDetail({ workoutId, onBack, startExercise }) {
  const w = workouts.find(x => x.id === workoutId) || workouts[0];
  const list = exerciseData[w.id] || exerciseData.full;
  return (
    <View style={{flex: 1}}>
      <Header title={w.title} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.detailHero}>
          <Text style={{fontSize: 64}}>{w.image}</Text>
          <View>
            <Text style={styles.heroTitle}>{w.title}</Text>
            <Text style={styles.muted}>{w.exercises} exercises • {w.duration}</Text>
          </View>
        </View>
        {list.map((e, i) => (
          <TouchableOpacity key={e[0]} onPress={() => startExercise(e, i, list.length)} activeOpacity={0.85}>
            <Card style={{marginBottom: 10}}>
              <View style={styles.sectionRow}>
                <View style={styles.exerciseNum}><Text style={{color: COLORS.green, fontWeight: "800"}}>{i+1}</Text></View>
                <View style={{flex: 1}}>
                  <Text style={styles.cardTitle}>{e[0]}</Text>
                  <Text style={styles.muted}>{e[1]} • {e[2]} • Rest {e[3]}</Text>
                </View>
                <Ionicons name="play-circle" size={28} color={COLORS.green} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function ExerciseScreen({ exercise, index, total, onBack, onDone }) {
  const [seconds, setSeconds] = useState(60);
  React.useEffect(() => {
    const t = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header title={`Exercise ${index+1}/${total}`} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.exerciseVisual}><Text style={{fontSize: 100}}>🏋️</Text></View>
        <Text style={styles.pageTitle}>{exercise[0]}</Text>
        <View style={styles.metaRow}>
          <View style={styles.meta}><Text style={styles.metaValue}>{exercise[1]}</Text><Text style={styles.metaLabel}>Sets</Text></View>
          <View style={styles.meta}><Text style={styles.metaValue}>{exercise[2]}</Text><Text style={styles.metaLabel}>Reps</Text></View>
          <View style={styles.meta}><Text style={styles.metaValue}>{exercise[3]}</Text><Text style={styles.metaLabel}>Rest</Text></View>
        </View>
        <Text style={styles.sectionTitle}>How to do it</Text>
        <Card><Text style={styles.bodyText}>{exercise[4]}</Text></Card>
        <Text style={styles.sectionTitle}>Rest Timer</Text>
        <View style={styles.timer}>
          <Text style={styles.timerText}>00:{String(seconds).padStart(2, "0")}</Text>
          <Text style={styles.muted}>Keep breathing and prepare for your next set</Text>
        </View>
        <TouchableOpacity style={styles.primaryWide} onPress={onDone}>
          <Text style={styles.primaryBtnText}>Mark as Done ✓</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Progress({ water, setWater }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.pageTitle}>Progress</Text>
      <View style={styles.segment}><Text style={styles.segmentActive}>Weight</Text><Text style={styles.segmentText}>Workout</Text><Text style={styles.segmentText}>Body Stats</Text></View>
      <Card>
        <Text style={styles.cardTitle}>Weight Progress</Text>
        <Text style={styles.bigValue}>68 kg <Text style={{fontSize: 14, color: COLORS.green}}>↓ 2 kg</Text></Text>
        <View style={styles.fakeChart}>
          {[72,71,71.5,70,70,69,68.5,68].map((v,i)=><View key={i} style={{alignItems:"center", flex:1}}><View style={[styles.dot, {marginTop: 95-(72-v)*18}]} /><Text style={styles.chartLabel}>{i+1}</Text></View>)}
        </View>
      </Card>
      <Text style={styles.sectionTitle}>Water Tracker</Text>
      <Card>
        <View style={{alignItems:"center"}}>
          <View style={styles.waterCircle}><Text style={styles.waterValue}>{water}/8</Text><Text style={styles.muted}>Glasses</Text></View>
          <Text style={styles.cardTitle}>Today's Goal • 2.5 L</Text>
          <View style={styles.glasses}>{Array.from({length:8}).map((_,i)=><TouchableOpacity key={i} onPress={() => setWater(i+1)}><Text style={{fontSize:30}}>{i < water ? "🥤" : "▫️"}</Text></TouchableOpacity>)}</View>
          <TouchableOpacity style={styles.primaryWide} onPress={() => setWater(Math.min(8, water+1))}><Text style={styles.primaryBtnText}>+ Add Water</Text></TouchableOpacity>
        </View>
      </Card>
      <Text style={styles.sectionTitle}>Achievements</Text>
      <View style={styles.achRow}>
        {["🔥\n7 Days", "🏆\n30 Days", "💪\n100 Reps"].map(x => <Card key={x} style={{flex:1, marginHorizontal:4, alignItems:"center"}}><Text style={{fontSize:25, textAlign:"center"}}>{x}</Text></Card>)}
      </View>
    </ScrollView>
  );
}

function Diet() {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.pageTitle}>Diet Plan</Text>
      <View style={styles.segment}><Text style={styles.segmentActive}>Meal Plan</Text><Text style={styles.segmentText}>Food Guide</Text></View>
      <Card>
        <Text style={styles.cardTitle}>Today's Meal Plan</Text>
        <Text style={styles.muted}>≈ 2000 kcal • High protein</Text>
      </Card>
      {meals.map(m => (
        <Card key={m[0]} style={{marginBottom:10}}>
          <View style={styles.sectionRow}>
            <Text style={{fontSize: 38}}>{m[3]}</Text>
            <View style={{flex:1}}>
              <Text style={styles.cardTitle}>{m[0]}</Text>
              <Text style={styles.bodyText}>{m[1]}</Text>
              <Text style={styles.muted}>{m[2]}</Text>
            </View>
          </View>
        </Card>
      ))}
      <Card style={{marginTop:4}}>
        <Text style={styles.cardTitle}>Nutrition Tip 🥗</Text>
        <Text style={styles.muted}>Build meals around protein, vegetables, whole-food carbohydrates and healthy fats. Adjust portions to your goals.</Text>
      </Card>
    </ScrollView>
  );
}

function Profile() {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.profileTop}>
        <View style={styles.bigAvatar}><Text style={{fontSize:34}}>🏋️</Text></View>
        <Text style={styles.pageTitle}>Rana</Text>
        <Text style={styles.muted}>Fitness Enthusiast</Text>
      </View>
      <View style={styles.statsRow}>
        <Stat icon="flame" value="7" label="Day Streak" />
        <Stat icon="trophy-outline" value="12" label="Workouts" />
        <Stat icon="scale-outline" value="68 kg" label="Weight" />
      </View>
      {[
        ["person-outline","Personal Info"],["flag-outline","Goals"],["settings-outline","Settings"],["notifications-outline","Notifications"],["moon-outline","Dark Mode"],["help-circle-outline","Help & Support"],["information-circle-outline","About App"]
      ].map(([icon,label],i)=>
        <TouchableOpacity key={label} style={styles.setting}>
          <Ionicons name={icon} size={21} color={COLORS.green} />
          <Text style={styles.settingText}>{label}</Text>
          {label === "Dark Mode" ? <View style={styles.toggle}><View style={styles.toggleDot}/></View> : <Ionicons name="chevron-forward" size={19} color={COLORS.muted}/>}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState("main");
  const [workoutId, setWorkoutId] = useState("full");
  const [exercise, setExercise] = useState(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseTotal, setExerciseTotal] = useState(1);
  const [water, setWater] = useState(5);

  const openWorkout = id => { setWorkoutId(id); setScreen("workout"); };
  const startExercise = (e, i, total) => { setExercise(e); setExerciseIndex(i); setExerciseTotal(total); setScreen("exercise"); };

  let content;
  if (screen === "workout") content = <WorkoutDetail workoutId={workoutId} onBack={() => setScreen("main")} startExercise={startExercise}/>;
  else if (screen === "exercise") content = <ExerciseScreen exercise={exercise} index={exerciseIndex} total={exerciseTotal} onBack={() => setScreen("workout")} onDone={() => setScreen("workout")}/>;
  else {
    if (tab === "home") content = <Home setTab={setTab} openWorkout={openWorkout}/>;
    if (tab === "workouts") content = <WorkoutList openWorkout={openWorkout}/>;
    if (tab === "progress") content = <Progress water={water} setWater={setWater}/>;
    if (tab === "diet") content = <Diet/>;
    if (tab === "profile") content = <Profile/>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg}/>
      {content}
      {screen === "main" && <BottomTabs tab={tab} setTab={setTab}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:COLORS.bg},
  scroll:{padding:18, paddingBottom:30},
  topRow:{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:18},
  smallText:{fontSize:11, letterSpacing:1.3, color:COLORS.muted, fontWeight:"700"},
  greeting:{fontSize:27, fontWeight:"800", color:COLORS.text, marginTop:3},
  avatar:{width:46,height:46,borderRadius:23,backgroundColor:COLORS.card2,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:COLORS.line},
  hero:{backgroundColor:"#087B55",borderRadius:22,padding:18,flexDirection:"row",alignItems:"center",overflow:"hidden",marginBottom:14},
  heroKicker:{fontSize:11,color:"#C7FFE5",fontWeight:"800",letterSpacing:1},
  heroTitle:{fontSize:27,fontWeight:"900",color:COLORS.text,marginTop:3},
  heroSub:{fontSize:13,color:"#D4F7E7",marginTop:4,marginBottom:14},
  primaryBtn:{backgroundColor:COLORS.green,borderRadius:22,paddingVertical:10,paddingHorizontal:18,alignSelf:"flex-start"},
  primaryWide:{backgroundColor:COLORS.green,borderRadius:25,paddingVertical:14,alignItems:"center",width:"100%",marginTop:14},
  primaryBtnText:{color:COLORS.bg,fontWeight:"900",fontSize:14},
  statsRow:{flexDirection:"row",gap:8,marginBottom:18},
  stat:{flex:1,backgroundColor:COLORS.card,borderRadius:15,padding:12,alignItems:"center",borderWidth:1,borderColor:COLORS.line},
  statIcon:{width:31,height:31,borderRadius:10,backgroundColor:"#12372C",alignItems:"center",justifyContent:"center",marginBottom:5},
  statValue:{color:COLORS.text,fontWeight:"900",fontSize:16},
  statLabel:{color:COLORS.muted,fontSize:10,marginTop:3,textAlign:"center"},
  sectionTitle:{color:COLORS.text,fontSize:18,fontWeight:"800",marginBottom:10,marginTop:4},
  sectionRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  seeAll:{color:COLORS.green,fontWeight:"700"},
  quickGrid:{flexDirection:"row",gap:8,marginBottom:18},
  quick:{flex:1,backgroundColor:COLORS.card,borderRadius:15,padding:11,alignItems:"center",borderWidth:1,borderColor:COLORS.line},
  quickIcon:{width:38,height:38,borderRadius:12,backgroundColor:"#102B28",alignItems:"center",justifyContent:"center",marginBottom:7},
  quickText:{fontSize:10,color:COLORS.text,textAlign:"center"},
  card:{backgroundColor:COLORS.card,borderRadius:17,padding:15,borderWidth:1,borderColor:COLORS.line},
  muted:{color:COLORS.muted,fontSize:13,lineHeight:20},
  cardTitle:{color:COLORS.text,fontWeight:"800",fontSize:16,marginBottom:3},
  bigValue:{color:COLORS.text,fontWeight:"900",fontSize:24,marginTop:4},
  chartBars:{height:75,flexDirection:"row",alignItems:"flex-end",gap:5,marginTop:10},
  bar:{backgroundColor:COLORS.green,borderRadius:5,flex:1,minWidth:7,opacity:.8},
  header:{height:62,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:12,borderBottomWidth:1,borderBottomColor:COLORS.line},
  headerTitle:{fontSize:17,fontWeight:"800",color:COLORS.text},
  iconBtn:{width:42,height:42,borderRadius:13,backgroundColor:COLORS.card,alignItems:"center",justifyContent:"center"},
  bottom:{height:72,borderTopWidth:1,borderTopColor:COLORS.line,backgroundColor:"#07131C",flexDirection:"row",justifyContent:"space-around",alignItems:"center"},
  tab:{alignItems:"center",justifyContent:"center",width:70},
  tabText:{fontSize:10,color:COLORS.muted,marginTop:4,fontWeight:"700"},
  pageTitle:{fontSize:28,fontWeight:"900",color:COLORS.text,marginBottom:14},
  search:{backgroundColor:COLORS.card,borderRadius:14,borderWidth:1,borderColor:COLORS.line,color:COLORS.text,padding:13,marginBottom:12},
  pill:{paddingHorizontal:15,paddingVertical:9,borderRadius:20,backgroundColor:COLORS.card,marginRight:7,borderWidth:1,borderColor:COLORS.line},
  pillActive:{backgroundColor:COLORS.green,borderColor:COLORS.green},
  pillText:{color:COLORS.muted,fontSize:12,fontWeight:"700"},
  workoutCard:{flexDirection:"row",alignItems:"center",marginBottom:10,gap:12},
  workoutEmoji:{width:58,height:58,borderRadius:15,backgroundColor:COLORS.card2,alignItems:"center",justifyContent:"center"},
  detailHero:{backgroundColor:COLORS.card,borderRadius:20,padding:20,flexDirection:"row",alignItems:"center",gap:15,marginBottom:15,borderWidth:1,borderColor:COLORS.line},
  exerciseNum:{width:38,height:38,borderRadius:12,backgroundColor:"#12372C",alignItems:"center",justifyContent:"center",marginRight:12},
  exerciseVisual:{height:230,borderRadius:22,backgroundColor:COLORS.card,alignItems:"center",justifyContent:"center",marginBottom:18,borderWidth:1,borderColor:COLORS.line},
  metaRow:{flexDirection:"row",gap:8,marginBottom:18},
  meta:{flex:1,backgroundColor:COLORS.card,borderRadius:14,padding:12,alignItems:"center",borderWidth:1,borderColor:COLORS.line},
  metaValue:{color:COLORS.text,fontWeight:"900",fontSize:13},
  metaLabel:{color:COLORS.muted,fontSize:10,marginTop:3},
  bodyText:{color:"#D7E1E7",fontSize:14,lineHeight:22},
  timer:{alignItems:"center",justifyContent:"center",padding:25,backgroundColor:COLORS.card,borderRadius:20,borderWidth:1,borderColor:COLORS.line},
  timerText:{fontSize:48,fontWeight:"900",color:COLORS.green,letterSpacing:2,marginBottom:5},
  segment:{flexDirection:"row",backgroundColor:COLORS.card,borderRadius:13,padding:4,marginBottom:14,borderWidth:1,borderColor:COLORS.line},
  segmentActive:{flex:1,textAlign:"center",backgroundColor:COLORS.green,color:COLORS.bg,fontWeight:"900",padding:9,borderRadius:9,fontSize:12},
  segmentText:{flex:1,textAlign:"center",color:COLORS.muted,fontWeight:"700",padding:9,fontSize:12},
  fakeChart:{height:150,flexDirection:"row",alignItems:"flex-start",marginTop:15,paddingHorizontal:5},
  dot:{width:10,height:10,borderRadius:5,backgroundColor:COLORS.green},
  chartLabel:{color:COLORS.muted,fontSize:9,marginTop:7},
  waterCircle:{width:150,height:150,borderRadius:75,borderWidth:12,borderColor:COLORS.blue,alignItems:"center",justifyContent:"center",marginBottom:12},
  waterValue:{fontSize:32,fontWeight:"900",color:COLORS.text},
  glasses:{flexDirection:"row",flexWrap:"wrap",justifyContent:"center",marginTop:10},
  achRow:{flexDirection:"row",marginHorizontal:-4},
  profileTop:{alignItems:"center",marginBottom:18},
  bigAvatar:{width:90,height:90,borderRadius:45,backgroundColor:COLORS.card2,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:COLORS.line,marginBottom:10},
  setting:{height:58,backgroundColor:COLORS.card,borderRadius:14,marginBottom:8,paddingHorizontal:15,flexDirection:"row",alignItems:"center",borderWidth:1,borderColor:COLORS.line},
  settingText:{flex:1,color:COLORS.text,fontWeight:"700",fontSize:14,marginLeft:13},
  toggle:{width:43,height:24,borderRadius:15,backgroundColor:COLORS.green,padding:3,justifyContent:"center"},
  toggleDot:{width:18,height:18,borderRadius:9,backgroundColor:COLORS.bg,alignSelf:"flex-end"},
});
