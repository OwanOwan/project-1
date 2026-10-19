/**
 * VitalFlow - Daily Routine & Healthy Living Companion
 * Premium Vanilla JavaScript Architecture with Web Audio API,
 * Dynamic Radial Wellness Scoring, Breathwork Guide, Vitals Tracking & LocalStorage.
 */

// --------------------------------------------------------------------------
// 1. Initial State, Storage Keys & Healthy Living Data
// --------------------------------------------------------------------------
const STORAGE_KEYS = {
  ROUTINES: 'vitalflow_routines_v2',
  METRICS: 'vitalflow_metrics_v2',
  SETTINGS: 'vitalflow_settings_v2',
  STREAK_HISTORY: 'vitalflow_streak_history_v2',
  LAST_ACTIVE_DATE: 'vitalflow_last_date'
};

// Curated Evidence-Backed Routine Presets Prioritizing Healthy Living
const DEFAULT_HEALTHY_ROUTINES = [
  {
    id: 'vf-routine-1',
    title: 'Morning Sunlight & Circadian Hydration (500ml)',
    phase: 'morning',
    time: '07:00',
    duration: 15,
    category: 'hydration',
    priority: 'vital',
    icon: '☀️',
    benefit: 'Syncs master circadian clock & rehydrates cellular mitochondria',
    completed: false,
    streak: 5
  },
  {
    id: 'vf-routine-2',
    title: 'Spinal Mobility, Joint Lubrication & Stretching',
    phase: 'morning',
    time: '07:20',
    duration: 15,
    category: 'movement',
    priority: 'high',
    icon: '🧘',
    benefit: 'Releases fascia tension and stimulates synovial fluid flow',
    completed: false,
    streak: 4
  },
  {
    id: 'vf-routine-3',
    title: 'High-Protein & Whole Food Breakfast',
    phase: 'morning',
    time: '08:00',
    duration: 25,
    category: 'nutrition',
    priority: 'vital',
    icon: '🥗',
    benefit: 'Stabilizes insulin, feeds dopamine synthesis & blocks brain fog',
    completed: false,
    streak: 6
  },
  {
    id: 'vf-routine-4',
    title: '20-20-20 Eye Strain & Posture Alignment Reset',
    phase: 'midday',
    time: '11:30',
    duration: 5,
    category: 'habits',
    priority: 'high',
    icon: '👁️',
    benefit: 'Relieves ciliary muscle spasm and decompresses lumbar spine',
    completed: false,
    streak: 3
  },
  {
    id: 'vf-routine-5',
    title: 'Balanced Nutrient Lunch & 15-min Digestive Walk',
    phase: 'midday',
    time: '13:00',
    duration: 35,
    category: 'movement',
    priority: 'vital',
    icon: '🚶',
    benefit: 'Blunts post-prandial glucose spike by up to 35%',
    completed: false,
    streak: 5
  },
  {
    id: 'vf-routine-6',
    title: 'Midday Hydration & Herbal Electrolytes (500ml)',
    phase: 'midday',
    time: '15:30',
    duration: 5,
    category: 'hydration',
    priority: 'high',
    icon: '💧',
    benefit: 'Prevents mid-afternoon cognitive decline and fatigue',
    completed: false,
    streak: 7
  },
  {
    id: 'vf-routine-7',
    title: 'Endorphin Movement: 30-min Fitness / Cardio / Yoga',
    phase: 'evening',
    time: '17:45',
    duration: 30,
    category: 'movement',
    priority: 'vital',
    icon: '🏃',
    benefit: 'Elevates BDNF, reduces cortisol and promotes deep REM sleep',
    completed: false,
    streak: 4
  },
  {
    id: 'vf-routine-8',
    title: 'Light Anti-Inflammatory Dinner with Leafy Greens',
    phase: 'evening',
    time: '19:15',
    duration: 30,
    category: 'nutrition',
    priority: 'high',
    icon: '🍵',
    benefit: 'Eases gut transit and prepares microbiome for nocturnal fast',
    completed: false,
    streak: 6
  },
  {
    id: 'vf-routine-9',
    title: 'Digital Sunset: No Screens 45m Before Bed',
    phase: 'night',
    time: '21:30',
    duration: 45,
    category: 'sleep',
    priority: 'vital',
    icon: '📵',
    benefit: 'Protects natural pineal gland melatonin surge for deep sleep',
    completed: false,
    streak: 2
  },
  {
    id: 'vf-routine-10',
    title: 'Gratitude Reflection & 10 Pages of Calming Reading',
    phase: 'night',
    time: '22:15',
    duration: 20,
    category: 'mindfulness',
    priority: 'high',
    icon: '📖',
    benefit: 'Lowers amygdala activity and shifts brainwaves to Alpha/Theta',
    completed: false,
    streak: 4
  }
];

// Health Biohacks Library
const HEALTH_BIOHACKS = [
  {
    title: 'Morning Sunlight & Circadian Clock',
    body: 'Viewing 10–15 minutes of natural sunlight within 1 hour of waking triggers a healthy morning cortisol pulse and sets an internal timer for restorative melatonin release 14–16 hours later.',
    tag: '⚡ Circadian Biology',
    preset: {
      title: '15-min Morning Natural Light Exposure',
      phase: 'morning',
      time: '07:15',
      duration: 15,
      category: 'habits',
      priority: 'vital',
      icon: '☀️',
      benefit: 'Syncs master circadian clock & increases daytime energy'
    }
  },
  {
    title: 'Post-Meal Digestive Stroll',
    body: 'A light 10–15 minute walk right after eating stimulates glucose transporter GLUT4 in skeletal muscle, pulling sugar from the blood without demanding excess insulin spikes.',
    tag: '🥗 Metabolic Health',
    preset: {
      title: '15-min Post-Lunch Digestive Walk',
      phase: 'midday',
      time: '13:30',
      duration: 15,
      category: 'movement',
      priority: 'high',
      icon: '🚶',
      benefit: 'Blunts blood glucose peaks and boosts mental alertness'
    }
  },
  {
    title: 'Cold Water Face Immersion',
    body: 'Splashing cool water on your face triggers the Mammalian Dive Reflex. It rapidly stimulates the vagus nerve, dropping your heart rate and easing sympathetic stress in under 60 seconds.',
    tag: '🧘 Nervous System Reset',
    preset: {
      title: 'Cold Splash & 2-min Vagus Nerve Reset',
      phase: 'midday',
      time: '14:00',
      duration: 5,
      category: 'mindfulness',
      priority: 'moderate',
      icon: '💧',
      benefit: 'Activates parasympathetic calm & sharpens focus'
    }
  },
  {
    title: 'The 3-2-1 Sleep Hygiene Rule',
    body: 'No heavy food 3 hours before bed, no fluids/alcohol 2 hours before bed, and no glowing screens 1 hour before sleep to maximize deep slow-wave restorative sleep.',
    tag: '💤 Sleep Architecture',
    preset: {
      title: '3-2-1 Evening Sleep Sanctuary Wind-Down',
      phase: 'night',
      time: '21:00',
      duration: 30,
      category: 'sleep',
      priority: 'vital',
      icon: '💤',
      benefit: 'Maximizes Stage 3 slow-wave sleep and cellular recovery'
    }
  },
  {
    title: '4-7-8 Parasympathetic Breathing',
    body: 'Inhaling for 4s, holding for 7s, and exhaling for 8s doubles your vagal tone, slowing heart rate and activating the parasympathetic brake against chronic stress.',
    tag: '🫁 Breath Physiology',
    preset: {
      title: '5-min 4-7-8 Breathwork Session',
      phase: 'evening',
      time: '20:30',
      duration: 5,
      category: 'mindfulness',
      priority: 'high',
      icon: '🧘',
      benefit: 'Lowers heart rate variability stress & prepares for rest'
    }
  }
];

// Quick Add Presets Carousel Data
const QUICK_HABIT_PRESETS = [
  { title: '☀️ 10-min Morning Sun Exposure', phase: 'morning', time: '07:15', category: 'habits', duration: 10, icon: '☀️' },
  { title: '💧 500ml Electrolyte Hydration', phase: 'morning', time: '07:30', category: 'hydration', duration: 5, icon: '💧' },
  { title: '🧘 5-min Box Breathing Reset', phase: 'midday', time: '12:00', category: 'mindfulness', duration: 5, icon: '🧘' },
  { title: '🥗 Eat 30g Protein at Lunch', phase: 'midday', time: '13:00', category: 'nutrition', duration: 25, icon: '🥗' },
  { title: '🚶 15-min Nature Stroll', phase: 'midday', time: '13:45', category: 'movement', duration: 15, icon: '🚶' },
  { title: '👁️ 20-20-20 Eye & Spine Check', phase: 'midday', time: '15:00', category: 'habits', duration: 3, icon: '👁️' },
  { title: '🍵 Soothing Chamomile Tea', phase: 'evening', time: '20:30', category: 'nutrition', duration: 10, icon: '🍵' },
  { title: '📵 Digital Sunset (No Screens)', phase: 'night', time: '21:45', category: 'sleep', duration: 45, icon: '📵' },
  { title: '📖 Read 10 Pages of Non-Fiction', phase: 'night', time: '22:15', category: 'mindfulness', duration: 15, icon: '📖' },
  { title: '💤 Cool Dark Bedroom Sleep (8h)', phase: 'night', time: '22:45', category: 'sleep', duration: 480, icon: '💤' }
];

// --------------------------------------------------------------------------
// 2. Audio Synthesizer (Web Audio API)
// --------------------------------------------------------------------------
class ZenSoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft crystalline chime on habit completion
  playHabitChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (harmonious pure chord)

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.05 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.95);
    });
  }

  // Gentle water droplet chime
  playWaterChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.12);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Singing bowl meditation tone for breath transitions
  playSingingBowl(freq = 432) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  }
}

// --------------------------------------------------------------------------
// 3. Confetti Particle Engine
// --------------------------------------------------------------------------
class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.particles = [];
    this.animating = false;
    this.colors = ['#10b981', '#34d399', '#06b6d4', '#38bdf8', '#fbbf24', '#f59e0b', '#a78bfa'];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(count = 70) {
    if (!this.canvas || !this.ctx) return;
    this.resize();

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height * 0.45 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        opacity: 1,
        gravity: 0.35 + Math.random() * 0.15
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.loop();
    }
  }

  loop() {
    if (!this.animating || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.opacity -= 0.012;

      if (p.opacity <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// --------------------------------------------------------------------------
// 4. Main VitalFlow Application Controller
// --------------------------------------------------------------------------
class VitalFlowApp {
  constructor() {
    this.sound = new ZenSoundSynthesizer();
    this.confetti = new ConfettiEngine(document.getElementById('confettiCanvas'));

    // State Variables
    this.routines = this.loadRoutines();
    this.metrics = this.loadMetrics();
    this.settings = this.loadSettings();
    this.streakHistory = this.loadStreakHistory();

    this.currentPhase = 'all';
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentSort = 'time';

    this.activeBiohackIndex = 0;
    this.lastDeletedRoutine = null;
    this.toastTimer = null;

    // Breathwork and Timer states
    this.breathingActive = false;
    this.breathingTimer = null;
    this.breathingMode = '478'; // '478' | 'box'
    this.breathingCycles = 0;
    this.timerInterval = null;
    this.timerRemainingSeconds = 15 * 60;
    this.timerIsRunning = false;

    // Initialize application
    this.cacheDOM();
    this.initTheme();
    this.initSoundSetting();
    this.checkDailyRollover();
    this.bindEvents();
    this.startLiveClock();
    this.renderAll();
  }

  // ------------------------------------------------------------------------
  // State Persistence & Initialization
  // ------------------------------------------------------------------------
  loadRoutines() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROUTINES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not parse routines from localStorage', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_HEALTHY_ROUTINES));
  }

  saveRoutines() {
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(this.routines));
  }

  loadMetrics() {
    const todayKey = new Date().toISOString().split('T')[0];
    const defaultMetrics = {
      date: todayKey,
      waterMl: 1000,
      waterTargetMl: 2500,
      steps: 4200,
      stepsTarget: 8000,
      activeMins: 20,
      activeMinsTarget: 30,
      sleepHours: 7.5,
      sleepQuality: 'Restful',
      currentMood: 'radiant',
      mindfulnessSessions: 0
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.METRICS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.date === todayKey) {
          return { ...defaultMetrics, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Metrics load error', e);
    }
    return defaultMetrics;
  }

  saveMetrics() {
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(this.metrics));
  }

  loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { theme: 'dark', soundEnabled: true };
  }

  saveSettings() {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
  }

  loadStreakHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STREAK_HISTORY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    // Default 7 days mock history for instant high UX appeal
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      days.push({
        date: iso,
        completed: i > 0, // past days completed
        isToday: i === 0
      });
    }
    return days;
  }

  saveStreakHistory() {
    localStorage.setItem(STORAGE_KEYS.STREAK_HISTORY, JSON.stringify(this.streakHistory));
  }

  // Automated Midnight / New-Day rollover handler
  checkDailyRollover() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);

    if (lastDate && lastDate !== today) {
      // Archive yesterday's completion status
      const total = this.routines.length;
      const completedCount = this.routines.filter(r => r.completed).length;
      const completedYesterday = total > 0 && completedCount >= Math.floor(total * 0.7);

      this.streakHistory.push({
        date: lastDate,
        completed: completedYesterday,
        isToday: false
      });
      if (this.streakHistory.length > 7) {
        this.streakHistory.shift();
      }
      this.saveStreakHistory();

      // Reset daily completed checkboxes for the new day
      this.routines.forEach(r => {
        if (r.completed) {
          r.streak = (r.streak || 0) + 1;
        } else {
          r.streak = Math.max(0, (r.streak || 0) - 1);
        }
        r.completed = false;
      });
      this.saveRoutines();

      // Reset daily vitals
      this.metrics.date = today;
      this.metrics.waterMl = 0;
      this.metrics.steps = 0;
      this.metrics.activeMins = 0;
      this.metrics.mindfulnessSessions = 0;
      this.saveMetrics();
    }

    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
  }

  // ------------------------------------------------------------------------
  // DOM Cache
  // ------------------------------------------------------------------------
  cacheDOM() {
    this.dom = {
      // Header
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      soundToggleBtn: document.getElementById('soundToggleBtn'),
      soundOnIcon: document.querySelector('.sound-on-icon'),
      soundOffIcon: document.querySelector('.sound-off-icon'),
      currentDayText: document.getElementById('currentDayText'),
      currentDateText: document.getElementById('currentDateText'),
      liveClockText: document.getElementById('liveClockText'),
      openBreathworkBtn: document.getElementById('openBreathworkBtn'),
      dayMenuBtn: document.getElementById('dayMenuBtn'),
      dayMenuDropdown: document.getElementById('dayMenuDropdown'),
      resetDayBtn: document.getElementById('resetDayBtn'),
      loadHealthyPresetsBtn: document.getElementById('loadHealthyPresetsBtn'),
      exportDataBtn: document.getElementById('exportDataBtn'),
      importDataBtn: document.getElementById('importDataBtn'),
      importFileInput: document.getElementById('importFileInput'),

      // Hero: Wellness Score & Streaks
      wellnessScoreVal: document.getElementById('wellnessScoreVal'),
      scoreProgressCircle: document.getElementById('scoreProgressCircle'),
      scoreStatusBadge: document.getElementById('scoreStatusBadge'),
      scoreFooterMessage: document.getElementById('scoreFooterMessage'),
      miniRoutineVal: document.getElementById('miniRoutineVal'),
      miniRoutineFill: document.getElementById('miniRoutineFill'),
      miniHydrationVal: document.getElementById('miniHydrationVal'),
      miniHydrationFill: document.getElementById('miniHydrationFill'),
      miniMovementVal: document.getElementById('miniMovementVal'),
      miniMovementFill: document.getElementById('miniMovementFill'),
      streakDaysCount: document.getElementById('streakDaysCount'),
      streakSubtitle: document.getElementById('streakSubtitle'),
      weeklyStreakStrip: document.getElementById('weeklyStreakStrip'),
      milestoneDesc: document.getElementById('milestoneDesc'),

      // Hero: Health Biohack
      biohackTitle: document.getElementById('biohackTitle'),
      biohackBody: document.getElementById('biohackBody'),
      biohackTag: document.getElementById('biohackTag'),
      refreshTipBtn: document.getElementById('refreshTipBtn'),
      applyBiohackBtn: document.getElementById('applyBiohackBtn'),

      // Vitals Dock
      currentWaterMl: document.getElementById('currentWaterMl'),
      waterGlassFill: document.getElementById('waterGlassFill'),
      waterPercentage: document.getElementById('waterPercentage'),
      waterTargetLabel: document.getElementById('waterTargetLabel'),
      waterSubtext: document.getElementById('waterSubtext'),
      addWater250Btn: document.getElementById('addWater250Btn'),
      addWater500Btn: document.getElementById('addWater500Btn'),
      subWaterBtn: document.getElementById('subWaterBtn'),

      currentStepsCount: document.getElementById('currentStepsCount'),
      activeMinsCount: document.getElementById('activeMinsCount'),
      movementPercentage: document.getElementById('movementPercentage'),
      movementProgressBar: document.getElementById('movementProgressBar'),
      moveTargetLabel: document.getElementById('moveTargetLabel'),
      addSteps1000Btn: document.getElementById('addSteps1000Btn'),
      addWalk15Btn: document.getElementById('addWalk15Btn'),
      addWorkout30Btn: document.getElementById('addWorkout30Btn'),

      sleepSummaryText: document.getElementById('sleepSummaryText'),
      logSleepBtn: document.getElementById('logSleepBtn'),
      moodButtons: document.querySelectorAll('.mood-btn'),
      startQuickBreathBtn: document.getElementById('startQuickBreathBtn'),

      // Routine Tracker Section
      routineCompletionBadge: document.getElementById('routineCompletionBadge'),
      openPresetsDrawerBtn: document.getElementById('openPresetsDrawerBtn'),
      closePresetsStripBtn: document.getElementById('closePresetsStripBtn'),
      healthyPresetsStrip: document.getElementById('healthyPresetsStrip'),
      presetChipsContainer: document.getElementById('presetChipsContainer'),
      openAddRoutineModalBtn: document.getElementById('openAddRoutineModalBtn'),
      phaseTabs: document.querySelectorAll('.phase-tab'),
      categoryChips: document.querySelectorAll('.category-chip'),
      routineSearchInput: document.getElementById('routineSearchInput'),
      routineSortSelect: document.getElementById('routineSortSelect'),
      routineList: document.getElementById('routineList'),
      emptyRoutineState: document.getElementById('emptyRoutineState'),
      emptyActionBtn: document.getElementById('emptyActionBtn'),
      footerRoutinesRemaining: document.getElementById('footerRoutinesRemaining'),
      markAllVisibleCompleteBtn: document.getElementById('markAllVisibleCompleteBtn'),
      uncheckAllBtn: document.getElementById('uncheckAllBtn'),

      // Modals
      routineModal: document.getElementById('routineModal'),
      routineModalTitle: document.getElementById('routineModalTitle'),
      closeRoutineModalBtn: document.getElementById('closeRoutineModalBtn'),
      cancelRoutineModalBtn: document.getElementById('cancelRoutineModalBtn'),
      routineForm: document.getElementById('routineForm'),
      routineFormId: document.getElementById('routineFormId'),
      routineTitleInput: document.getElementById('routineTitleInput'),
      routinePhaseSelect: document.getElementById('routinePhaseSelect'),
      routineTimeInput: document.getElementById('routineTimeInput'),
      routineCategorySelect: document.getElementById('routineCategorySelect'),
      routineDurationInput: document.getElementById('routineDurationInput'),
      routinePrioritySelect: document.getElementById('routinePrioritySelect'),
      routineIconInput: document.getElementById('routineIconInput'),
      routineNotesInput: document.getElementById('routineNotesInput'),

      // Breathwork Modal
      breathworkModal: document.getElementById('breathworkModal'),
      closeBreathworkModalBtn: document.getElementById('closeBreathworkModalBtn'),
      tabModeBreathing: document.getElementById('tabModeBreathing'),
      tabModeBox: document.getElementById('tabModeBox'),
      tabModeTimer: document.getElementById('tabModeTimer'),
      breathingGuideView: document.getElementById('breathingGuideView'),
      timerView: document.getElementById('timerView'),
      breathOrb: document.getElementById('breathOrb'),
      breathAura: document.getElementById('breathAura'),
      breathInstruction: document.getElementById('breathInstruction'),
      breathSeconds: document.getElementById('breathSeconds'),
      breathGuidance: document.getElementById('breathGuidance'),
      breathCycleCount: document.getElementById('breathCycleCount'),
      startBreathingBtn: document.getElementById('startBreathingBtn'),
      stopBreathingBtn: document.getElementById('stopBreathingBtn'),
      timerDigits: document.getElementById('timerDigits'),
      timerTaskName: document.getElementById('timerTaskName'),
      timerChips: document.querySelectorAll('.timer-chip'),
      startTimerBtn: document.getElementById('startTimerBtn'),
      resetTimerBtn: document.getElementById('resetTimerBtn'),

      // Sleep Modal
      sleepModal: document.getElementById('sleepModal'),
      closeSleepModalBtn: document.getElementById('closeSleepModalBtn'),
      cancelSleepModalBtn: document.getElementById('cancelSleepModalBtn'),
      sleepForm: document.getElementById('sleepForm'),
      sleepHoursInput: document.getElementById('sleepHoursInput'),
      sleepQualityBtns: document.querySelectorAll('.quality-btn'),

      // Toast
      toastContainer: document.getElementById('toastContainer')
    };
  }

  // ------------------------------------------------------------------------
  // Theme & Sound Setup
  // ------------------------------------------------------------------------
  initTheme() {
    const theme = this.settings.theme || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    this.settings.theme = next;
    this.saveSettings();
    this.showToast(`Switched to ${next === 'dark' ? 'Dark Obsidian' : 'Daylight Pearl'} theme`);
  }

  initSoundSetting() {
    this.sound.enabled = this.settings.soundEnabled !== false;
    this.updateSoundIcons();
  }

  toggleSound() {
    this.sound.enabled = !this.sound.enabled;
    this.settings.soundEnabled = this.sound.enabled;
    this.saveSettings();
    this.updateSoundIcons();
    if (this.sound.enabled) {
      this.sound.playHabitChime();
      this.showToast('Sound cues enabled 🔔');
    } else {
      this.showToast('Sound cues muted 🔕');
    }
  }

  updateSoundIcons() {
    if (this.dom.soundOnIcon && this.dom.soundOffIcon) {
      this.dom.soundOnIcon.style.display = this.sound.enabled ? 'block' : 'none';
      this.dom.soundOffIcon.style.display = this.sound.enabled ? 'none' : 'block';
    }
  }

  // ------------------------------------------------------------------------
  // Live Date & Clock
  // ------------------------------------------------------------------------
  startLiveClock() {
    const updateTime = () => {
      const now = new Date();
      const optionsDay = { weekday: 'long' };
      const optionsDate = { month: 'short', day: 'numeric', year: 'numeric' };

      if (this.dom.currentDayText) {
        this.dom.currentDayText.textContent = now.toLocaleDateString('en-US', optionsDay);
      }
      if (this.dom.currentDateText) {
        this.dom.currentDateText.textContent = now.toLocaleDateString('en-US', optionsDate);
      }
      if (this.dom.liveClockText) {
        this.dom.liveClockText.textContent = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // ------------------------------------------------------------------------
  // Event Listeners Binding
  // ------------------------------------------------------------------------
  bindEvents() {
    // Global Header controls
    this.dom.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    this.dom.soundToggleBtn.addEventListener('click', () => this.toggleSound());
    this.dom.openBreathworkBtn.addEventListener('click', () => this.openBreathworkModal());

    // Dropdown menu
    this.dom.dayMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = this.dom.dayMenuDropdown.style.display === 'block';
      this.dom.dayMenuDropdown.style.display = isVisible ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
      if (this.dom.dayMenuDropdown) this.dom.dayMenuDropdown.style.display = 'none';
    });

    this.dom.resetDayBtn.addEventListener('click', () => this.resetTodayChecks());
    this.dom.loadHealthyPresetsBtn.addEventListener('click', () => this.restoreHealthyPresets());
    this.dom.exportDataBtn.addEventListener('click', () => this.exportRoutineData());
    this.dom.importDataBtn.addEventListener('click', () => this.dom.importFileInput.click());
    this.dom.importFileInput.addEventListener('change', (e) => this.importRoutineData(e));

    // Health Biohack controls
    this.dom.refreshTipBtn.addEventListener('click', () => this.nextBiohack());
    this.dom.applyBiohackBtn.addEventListener('click', () => this.applyCurrentBiohack());

    // Hydration buttons
    this.dom.addWater250Btn.addEventListener('click', () => this.addWater(250));
    this.dom.addWater500Btn.addEventListener('click', () => this.addWater(500));
    this.dom.subWaterBtn.addEventListener('click', () => this.addWater(-250));

    // Movement buttons
    this.dom.addSteps1000Btn.addEventListener('click', () => this.addSteps(1000));
    this.dom.addWalk15Btn.addEventListener('click', () => this.addMovement(15, 1200));
    this.dom.addWorkout30Btn.addEventListener('click', () => this.addMovement(30, 2500));

    // Mood buttons
    this.dom.moodButtons.forEach(btn => {
      btn.addEventListener('click', () => this.selectMood(btn.dataset.mood));
    });

    // Sleep log modal
    this.dom.logSleepBtn.addEventListener('click', () => this.openSleepModal());
    this.dom.closeSleepModalBtn.addEventListener('click', () => this.closeSleepModal());
    this.dom.cancelSleepModalBtn.addEventListener('click', () => this.closeSleepModal());
    this.dom.sleepForm.addEventListener('submit', (e) => this.saveSleepLog(e));
    this.dom.sleepQualityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.sleepQualityBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    this.dom.startQuickBreathBtn.addEventListener('click', () => this.openBreathworkModal());

    // Presets drawer
    this.dom.openPresetsDrawerBtn.addEventListener('click', () => this.togglePresetsDrawer());
    this.dom.closePresetsStripBtn.addEventListener('click', () => this.togglePresetsDrawer(false));

    // Phase Filter Tabs
    this.dom.phaseTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.dom.phaseTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        this.currentPhase = tab.dataset.phase;
        this.renderRoutines();
      });
    });

    // Category Filter Chips
    this.dom.categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.dom.categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentCategory = chip.dataset.category;
        this.renderRoutines();
      });
    });

    // Search and Sort
    this.dom.routineSearchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.renderRoutines();
    });

    this.dom.routineSortSelect.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.renderRoutines();
    });

    // Routine Form Modal
    this.dom.openAddRoutineModalBtn.addEventListener('click', () => this.openRoutineModal());
    this.dom.emptyActionBtn.addEventListener('click', () => this.openRoutineModal());
    this.dom.closeRoutineModalBtn.addEventListener('click', () => this.closeRoutineModal());
    this.dom.cancelRoutineModalBtn.addEventListener('click', () => this.closeRoutineModal());
    this.dom.routineForm.addEventListener('submit', (e) => this.handleRoutineFormSubmit(e));

    // Routine List Item delegation (Checkbox, Timer, Edit, Delete)
    this.dom.routineList.addEventListener('click', (e) => this.handleRoutineListClick(e));

    // Bulk actions
    this.dom.markAllVisibleCompleteBtn.addEventListener('click', () => this.markAllVisibleComplete());
    this.dom.uncheckAllBtn.addEventListener('click', () => this.uncheckAllVisible());

    // Breathwork and Timer Modal controls
    this.dom.closeBreathworkModalBtn.addEventListener('click', () => this.closeBreathworkModal());
    this.dom.tabModeBreathing.addEventListener('click', () => this.setZenMode('478'));
    this.dom.tabModeBox.addEventListener('click', () => this.setZenMode('box'));
    this.dom.tabModeTimer.addEventListener('click', () => this.setZenMode('timer'));

    this.dom.startBreathingBtn.addEventListener('click', () => this.startBreathingExercise());
    this.dom.stopBreathingBtn.addEventListener('click', () => this.stopBreathingExercise());

    this.dom.timerChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.dom.timerChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const mins = parseInt(chip.dataset.mins, 10);
        this.setTimerDuration(mins);
      });
    });

    this.dom.startTimerBtn.addEventListener('click', () => this.toggleFocusTimer());
    this.dom.resetTimerBtn.addEventListener('click', () => this.resetFocusTimer());

    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeRoutineModal();
        this.closeBreathworkModal();
        this.closeSleepModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // Wellness Score & Progress Calculation
  // ------------------------------------------------------------------------
  updateWellnessScore() {
    const totalRoutines = this.routines.length;
    const completedRoutines = this.routines.filter(r => r.completed).length;

    // 1. Routine Completion Rate (45% weight)
    const routineRate = totalRoutines > 0 ? (completedRoutines / totalRoutines) : 0;
    const routinePoints = routineRate * 45;

    // 2. Hydration Target Rate (20% weight)
    const waterRate = Math.min(1, this.metrics.waterMl / (this.metrics.waterTargetMl || 2500));
    const waterPoints = waterRate * 20;

    // 3. Movement Target Rate (15% weight)
    const stepsRate = Math.min(1, this.metrics.steps / (this.metrics.stepsTarget || 8000));
    const movementPoints = stepsRate * 15;

    // 4. Mindfulness & Sleep Check (10% weight)
    const mindfulPoints = Math.min(10, (this.metrics.mindfulnessSessions || 0) * 5 + 5);

    // 5. Vitality & Mood Check (10% weight)
    const moodScores = { radiant: 10, calm: 9, focused: 8, tired: 5, stressed: 4 };
    const moodPoints = moodScores[this.metrics.currentMood] || 7;

    const totalScore = Math.round(routinePoints + waterPoints + movementPoints + mindfulPoints + moodPoints);
    const clampedScore = Math.max(0, Math.min(100, totalScore));

    // Update DOM Score Ring
    if (this.dom.wellnessScoreVal) {
      this.dom.wellnessScoreVal.textContent = `${clampedScore}%`;
    }

    if (this.dom.scoreProgressCircle) {
      // Circumference = 2 * PI * 50 = 314
      const circumference = 314;
      const offset = circumference - (circumference * clampedScore) / 100;
      this.dom.scoreProgressCircle.style.strokeDashoffset = offset;
    }

    // Status Badge & Footer message based on score tier
    if (this.dom.scoreStatusBadge && this.dom.scoreFooterMessage) {
      if (clampedScore >= 95) {
        this.dom.scoreStatusBadge.textContent = '🏆 Optimal Harmony';
        this.dom.scoreFooterMessage.textContent = 'Spectacular consistency! Your body and mind are operating at peak vitality.';
      } else if (clampedScore >= 75) {
        this.dom.scoreStatusBadge.textContent = '🔥 Peak Vitality';
        this.dom.scoreFooterMessage.textContent = 'Tremendous momentum! Keep fueling your routine and stay energized.';
      } else if (clampedScore >= 50) {
        this.dom.scoreStatusBadge.textContent = '⚡ Vibrant & Thriving';
        this.dom.scoreFooterMessage.textContent = 'Over halfway through your daily health goals. Drink water and take a breath reset!';
      } else if (clampedScore >= 25) {
        this.dom.scoreStatusBadge.textContent = '🌿 Gaining Momentum';
        this.dom.scoreFooterMessage.textContent = 'Good start. Check off your next routine habit to boost your score.';
      } else {
        this.dom.scoreStatusBadge.textContent = '🌱 Fresh Start';
        this.dom.scoreFooterMessage.textContent = 'Complete your morning routine to kickstart daily vitality!';
      }
    }

    // Update Mini Bars
    if (this.dom.miniRoutineVal && this.dom.miniRoutineFill) {
      this.dom.miniRoutineVal.textContent = `${completedRoutines} / ${totalRoutines}`;
      this.dom.miniRoutineFill.style.width = `${Math.round(routineRate * 100)}%`;
    }

    if (this.dom.miniHydrationVal && this.dom.miniHydrationFill) {
      this.dom.miniHydrationVal.textContent = `${Math.round(waterRate * 100)}%`;
      this.dom.miniHydrationFill.style.width = `${Math.round(waterRate * 100)}%`;
    }

    if (this.dom.miniMovementVal && this.dom.miniMovementFill) {
      this.dom.miniMovementVal.textContent = `${Math.round(stepsRate * 100)}%`;
      this.dom.miniMovementFill.style.width = `${Math.round(stepsRate * 100)}%`;
    }

    // Check celebration condition
    if (clampedScore === 100 && totalRoutines > 0) {
      if (!this._celebratedToday) {
        this._celebratedToday = true;
        this.confetti.fire(120);
        this.sound.playSingingBowl(528);
        this.showToast('🎉 Outstanding! You reached 100% Daily Wellness Score!');
      }
    }
  }

  // ------------------------------------------------------------------------
  // Streaks & Milestone Render
  // ------------------------------------------------------------------------
  renderStreaks() {
    // Current streak calculation
    let currentStreak = 1;
    if (this.streakHistory && this.streakHistory.length > 0) {
      for (let i = this.streakHistory.length - 1; i >= 0; i--) {
        if (this.streakHistory[i].completed) {
          currentStreak++;
        }
      }
    }

    if (this.dom.streakDaysCount) {
      this.dom.streakDaysCount.textContent = currentStreak;
    }

    if (this.dom.streakSubtitle) {
      this.dom.streakSubtitle.textContent = currentStreak > 3 
        ? 'Unstoppable consistency! Your healthy habits are compounding.'
        : 'Small daily healthy choices build lasting vitality.';
    }

    // Weekly 7-Day Visual Strip
    if (this.dom.weeklyStreakStrip) {
      this.dom.weeklyStreakStrip.innerHTML = '';
      const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

      this.streakHistory.forEach((day, idx) => {
        const item = document.createElement('div');
        item.className = 'day-dot-item';

        const label = document.createElement('span');
        label.className = 'day-dot-label';
        label.textContent = dayLetters[idx % 7] || '•';

        const circle = document.createElement('div');
        circle.className = `day-dot-circle ${day.completed ? 'completed' : ''} ${day.isToday ? 'today' : ''}`;
        circle.innerHTML = day.completed ? '✓' : (day.isToday ? '★' : '•');

        item.appendChild(label);
        item.appendChild(circle);
        this.dom.weeklyStreakStrip.appendChild(item);
      });
    }

    if (this.dom.milestoneDesc) {
      this.dom.milestoneDesc.textContent = currentStreak >= 7
        ? `🔥 Incredible 7-day milestone achieved! Aim for 14 days!`
        : `Complete today's routines to reach a ${currentStreak + 1}-day streak milestone!`;
    }
  }

  // ------------------------------------------------------------------------
  // Health Biohack Carousel
  // ------------------------------------------------------------------------
  renderBiohack() {
    const tip = HEALTH_BIOHACKS[this.activeBiohackIndex];
    if (!tip) return;

    if (this.dom.biohackTitle) this.dom.biohackTitle.textContent = tip.title;
    if (this.dom.biohackBody) this.dom.biohackBody.textContent = tip.body;
    if (this.dom.biohackTag) this.dom.biohackTag.textContent = tip.tag;
  }

  nextBiohack() {
    this.activeBiohackIndex = (this.activeBiohackIndex + 1) % HEALTH_BIOHACKS.length;
    this.renderBiohack();
  }

  applyCurrentBiohack() {
    const tip = HEALTH_BIOHACKS[this.activeBiohackIndex];
    if (!tip || !tip.preset) return;

    const newRoutine = {
      id: 'biohack-' + Date.now(),
      ...tip.preset,
      completed: false,
      streak: 1
    };

    this.routines.unshift(newRoutine);
    this.saveRoutines();
    this.renderAll();
    this.sound.playHabitChime();
    this.showToast(`Added "${newRoutine.title}" to your routine timeline!`);
  }

  // ------------------------------------------------------------------------
  // Health Vitals Dock (Hydration, Movement, Sleep, Mood)
  // ------------------------------------------------------------------------
  renderVitals() {
    // 1. Hydration
    const waterMl = this.metrics.waterMl || 0;
    const targetMl = this.metrics.waterTargetMl || 2500;
    const waterPct = Math.round((waterMl / targetMl) * 100);

    if (this.dom.currentWaterMl) this.dom.currentWaterMl.textContent = waterMl.toLocaleString();
    if (this.dom.waterPercentage) this.dom.waterPercentage.textContent = `${waterPct}%`;
    if (this.dom.waterGlassFill) {
      const fillHeight = Math.min(100, Math.max(0, waterPct));
      this.dom.waterGlassFill.style.height = `${fillHeight}%`;
    }
    if (this.dom.waterSubtext) {
      this.dom.waterSubtext.textContent = waterPct >= 100
        ? '💧 Optimal cellular hydration reached!'
        : `${(targetMl - waterMl).toLocaleString()} ml remaining for peak energy`;
    }

    // 2. Movement
    const steps = this.metrics.steps || 0;
    const stepsTarget = this.metrics.stepsTarget || 8000;
    const stepsPct = Math.min(100, Math.round((steps / stepsTarget) * 100));

    if (this.dom.currentStepsCount) this.dom.currentStepsCount.textContent = steps.toLocaleString();
    if (this.dom.activeMinsCount) this.dom.activeMinsCount.textContent = `${this.metrics.activeMins || 0}m`;
    if (this.dom.movementPercentage) this.dom.movementPercentage.textContent = `${stepsPct}%`;
    if (this.dom.movementProgressBar) this.dom.movementProgressBar.style.width = `${stepsPct}%`;

    // 3. Sleep & Mood
    if (this.dom.sleepSummaryText) {
      this.dom.sleepSummaryText.textContent = `Sleep: ${this.metrics.sleepHours} hrs (${this.metrics.sleepQuality})`;
    }

    if (this.dom.moodButtons) {
      this.dom.moodButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mood === this.metrics.currentMood);
      });
    }
  }

  addWater(amount) {
    this.metrics.waterMl = Math.max(0, (this.metrics.waterMl || 0) + amount);
    this.saveMetrics();
    this.renderVitals();
    this.updateWellnessScore();

    if (amount > 0) {
      this.sound.playWaterChime();
      this.showToast(`+${amount} ml logged! Hydration powers your cells 💧`);
    } else {
      this.showToast('Hydration updated');
    }
  }

  addSteps(count) {
    this.metrics.steps = (this.metrics.steps || 0) + count;
    this.metrics.activeMins = (this.metrics.activeMins || 0) + Math.round(count / 100);
    this.saveMetrics();
    this.renderVitals();
    this.updateWellnessScore();
    this.sound.playHabitChime();
    this.showToast(`+${count.toLocaleString()} steps added! Keep moving 🏃`);
  }

  addMovement(mins, stepsEstimate) {
    this.metrics.activeMins = (this.metrics.activeMins || 0) + mins;
    this.metrics.steps = (this.metrics.steps || 0) + stepsEstimate;
    this.saveMetrics();
    this.renderVitals();
    this.updateWellnessScore();
    this.sound.playHabitChime();
    this.showToast(`+${mins}m active movement logged! Great work 🔥`);
  }

  selectMood(mood) {
    this.metrics.currentMood = mood;
    this.saveMetrics();
    this.renderVitals();
    this.updateWellnessScore();

    const moodNames = {
      radiant: '⚡ Radiant & Full of Energy',
      calm: '🧘 Calm & Centered',
      focused: '🎯 Focused & Deeply Productive',
      tired: '🥱 Low Energy - Take a pause to rehydrate',
      stressed: '🌪️ Stressed - Try a 2-min breathwork reset'
    };
    this.showToast(moodNames[mood] || 'Mood recorded');
  }

  // ------------------------------------------------------------------------
  // Sleep Modal Controls
  // ------------------------------------------------------------------------
  openSleepModal() {
    if (this.dom.sleepHoursInput) {
      this.dom.sleepHoursInput.value = this.metrics.sleepHours || 7.5;
    }
    if (this.dom.sleepQualityBtns) {
      this.dom.sleepQualityBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.quality === (this.metrics.sleepQuality || 'Restful'));
      });
    }
    this.dom.sleepModal.style.display = 'flex';
  }

  closeSleepModal() {
    this.dom.sleepModal.style.display = 'none';
  }

  saveSleepLog(e) {
    e.preventDefault();
    const hours = parseFloat(this.dom.sleepHoursInput.value) || 7.5;
    const activeQualityBtn = document.querySelector('.quality-btn.active');
    const quality = activeQualityBtn ? activeQualityBtn.dataset.quality : 'Restful';

    this.metrics.sleepHours = hours;
    this.metrics.sleepQuality = quality;
    this.saveMetrics();
    this.closeSleepModal();
    this.renderVitals();
    this.updateWellnessScore();
    this.showToast(`Sleep logged: ${hours} hours (${quality}) 💤`);
  }

  // ------------------------------------------------------------------------
  // Quick Presets Strip
  // ------------------------------------------------------------------------
  togglePresetsDrawer(forceState) {
    const isCurrentlyShown = this.dom.healthyPresetsStrip.style.display === 'block';
    const newState = forceState !== undefined ? forceState : !isCurrentlyShown;
    this.dom.healthyPresetsStrip.style.display = newState ? 'block' : 'none';

    if (newState && this.dom.presetChipsContainer.children.length === 0) {
      this.renderPresetChips();
    }
  }

  renderPresetChips() {
    this.dom.presetChipsContainer.innerHTML = '';
    QUICK_HABIT_PRESETS.forEach(preset => {
      const card = document.createElement('div');
      card.className = 'preset-chip-card';
      card.innerHTML = `
        <span class="preset-chip-icon">${preset.icon}</span>
        <div class="preset-chip-info">
          <span class="preset-chip-title">${preset.title}</span>
          <span class="preset-chip-meta">${preset.time} • ${preset.duration}m</span>
        </div>
      `;
      card.addEventListener('click', () => {
        this.addPresetRoutine(preset);
      });
      this.dom.presetChipsContainer.appendChild(card);
    });
  }

  addPresetRoutine(preset) {
    const newRoutine = {
      id: 'preset-' + Date.now(),
      title: preset.title,
      phase: preset.phase,
      time: preset.time,
      duration: preset.duration,
      category: preset.category,
      priority: 'high',
      icon: preset.icon,
      benefit: 'Supports overall physical and mental vitality',
      completed: false,
      streak: 1
    };

    this.routines.push(newRoutine);
    this.saveRoutines();
    this.renderRoutines();
    this.updateWellnessScore();
    this.sound.playHabitChime();
    this.showToast(`Added "${preset.title}" to routine!`);
  }

  // ------------------------------------------------------------------------
  // Routine Filter, Search & Render
  // ------------------------------------------------------------------------
  getFilteredRoutines() {
    return this.routines.filter(routine => {
      // Phase Filter
      if (this.currentPhase !== 'all' && routine.phase !== this.currentPhase) {
        return false;
      }
      // Category Filter
      if (this.currentCategory !== 'all' && routine.category !== this.currentCategory) {
        return false;
      }
      // Search Query
      if (this.searchQuery) {
        const titleMatch = routine.title.toLowerCase().includes(this.searchQuery);
        const benefitMatch = (routine.benefit || '').toLowerCase().includes(this.searchQuery);
        if (!titleMatch && !benefitMatch) return false;
      }
      return true;
    }).sort((a, b) => {
      if (this.currentSort === 'time') {
        return (a.time || '00:00').localeCompare(b.time || '00:00');
      }
      if (this.currentSort === 'priority') {
        const pOrder = { vital: 3, high: 2, moderate: 1 };
        return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
      }
      if (this.currentSort === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (this.currentSort === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }

  renderRoutines() {
    const filtered = this.getFilteredRoutines();
    const total = this.routines.length;
    const completed = this.routines.filter(r => r.completed).length;

    // Update section count badges
    if (this.dom.routineCompletionBadge) {
      this.dom.routineCompletionBadge.textContent = `${completed} / ${total} Completed`;
    }

    if (this.dom.footerRoutinesRemaining) {
      const remaining = total - completed;
      this.dom.footerRoutinesRemaining.textContent = `${remaining} routine${remaining === 1 ? '' : 's'} left for today`;
    }

    // Update tab counts
    const phaseCounts = { all: total, morning: 0, midday: 0, evening: 0, night: 0 };
    this.routines.forEach(r => {
      if (phaseCounts[r.phase] !== undefined) phaseCounts[r.phase]++;
    });

    const phaseMap = {
      all: 'countPhaseAll',
      morning: 'countPhaseMorning',
      midday: 'countPhaseMidday',
      evening: 'countPhaseEvening',
      night: 'countPhaseNight'
    };
    Object.keys(phaseMap).forEach(key => {
      const el = document.getElementById(phaseMap[key]);
      if (el) el.textContent = phaseCounts[key];
    });

    // Render list
    this.dom.routineList.innerHTML = '';

    if (filtered.length === 0) {
      this.dom.emptyRoutineState.style.display = 'flex';
      return;
    }

    this.dom.emptyRoutineState.style.display = 'none';

    filtered.forEach(routine => {
      const li = document.createElement('li');
      li.className = `routine-item ${routine.completed ? 'completed' : ''}`;
      li.dataset.id = routine.id;

      // Pillar Tag Class
      const catClass = `cat-${routine.category}`;
      const priorityClass = `priority-${routine.priority}`;

      li.innerHTML = `
        <div class="routine-check-wrap">
          <button type="button" class="routine-check-btn" aria-label="Toggle completed" data-action="toggle">
            <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>

        <div class="routine-content">
          <div class="routine-primary-row">
            <span class="routine-icon-display">${routine.icon || '🌿'}</span>
            <span class="routine-title">${this.escapeHTML(routine.title)}</span>
          </div>

          <div class="routine-meta-row">
            <span class="meta-pill time-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              ${routine.time || '--:--'}
            </span>
            <span class="meta-pill duration-pill">${routine.duration || 10}m</span>
            <span class="category-tag ${catClass}">${this.capitalize(routine.category)}</span>
            <span class="meta-pill ${priorityClass}">${routine.priority}</span>
            ${routine.streak > 1 ? `<span class="meta-pill" style="background: rgba(245, 158, 11, 0.12); color: var(--amber-400)">🔥 ${routine.streak}d</span>` : ''}
          </div>

          ${routine.benefit ? `<p class="routine-benefit">💡 ${this.escapeHTML(routine.benefit)}</p>` : ''}
        </div>

        <div class="routine-actions">
          <button type="button" class="action-btn timer-action-btn" title="Start timer for this habit" data-action="timer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </button>
          <button type="button" class="action-btn edit-action-btn" title="Edit routine" data-action="edit">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button type="button" class="action-btn delete-action-btn" title="Delete routine" data-action="delete">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      `;

      this.dom.routineList.appendChild(li);
    });
  }

  // Handle click on routine item actions
  handleRoutineListClick(e) {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const itemEl = actionBtn.closest('.routine-item');
    if (!itemEl) return;

    const id = itemEl.dataset.id;
    const routine = this.routines.find(r => r.id === id);
    if (!routine) return;

    const action = actionBtn.dataset.action;

    if (action === 'toggle') {
      this.toggleRoutineCompletion(routine);
    } else if (action === 'timer') {
      this.openRoutineTimer(routine);
    } else if (action === 'edit') {
      this.openRoutineModal(routine);
    } else if (action === 'delete') {
      this.deleteRoutine(routine);
    }
  }

  toggleRoutineCompletion(routine) {
    routine.completed = !routine.completed;
    if (routine.completed) {
      routine.streak = (routine.streak || 0) + 1;
      this.sound.playHabitChime();
      this.confetti.fire(35);
      this.showToast(`Completed "${routine.title}"! Keep up the momentum ✨`);
    }

    this.saveRoutines();
    this.renderRoutines();
    this.updateWellnessScore();
  }

  markAllVisibleComplete() {
    const visible = this.getFilteredRoutines();
    if (visible.length === 0) return;

    let newlyCompleted = 0;
    visible.forEach(r => {
      if (!r.completed) {
        r.completed = true;
        r.streak = (r.streak || 0) + 1;
        newlyCompleted++;
      }
    });

    if (newlyCompleted > 0) {
      this.sound.playHabitChime();
      this.confetti.fire(80);
      this.showToast(`Completed ${newlyCompleted} routines! 🔥`);
    }

    this.saveRoutines();
    this.renderRoutines();
    this.updateWellnessScore();
  }

  uncheckAllVisible() {
    const visible = this.getFilteredRoutines();
    visible.forEach(r => {
      r.completed = false;
    });
    this.saveRoutines();
    this.renderRoutines();
    this.updateWellnessScore();
    this.showToast('Unchecked routines');
  }

  resetTodayChecks() {
    this.routines.forEach(r => { r.completed = false; });
    this.metrics.waterMl = 0;
    this.metrics.steps = 0;
    this.metrics.activeMins = 0;
    this.saveRoutines();
    this.saveMetrics();
    this.renderAll();
    this.showToast('Reset today\'s checks & vitals for a fresh start 🌱');
  }

  restoreHealthyPresets() {
    if (confirm('Restore the standard recommended healthy routines? Custom routines will be preserved.')) {
      DEFAULT_HEALTHY_ROUTINES.forEach(preset => {
        if (!this.routines.some(r => r.title === preset.title)) {
          this.routines.push({ ...preset, id: 'vf-' + Date.now() + Math.random().toString(36).substr(2, 4) });
        }
      });
      this.saveRoutines();
      this.renderAll();
      this.sound.playHabitChime();
      this.showToast('Healthy Routine Presets Restored! 🌿');
    }
  }

  deleteRoutine(routine) {
    this.lastDeletedRoutine = { ...routine };
    this.routines = this.routines.filter(r => r.id !== routine.id);
    this.saveRoutines();
    this.renderRoutines();
    this.updateWellnessScore();

    this.showToast(`Deleted "${routine.title}"`, true);
  }

  undoDelete() {
    if (this.lastDeletedRoutine) {
      this.routines.push(this.lastDeletedRoutine);
      this.lastDeletedRoutine = null;
      this.saveRoutines();
      this.renderRoutines();
      this.updateWellnessScore();
      this.showToast('Restored routine');
    }
  }

  // ------------------------------------------------------------------------
  // Add / Edit Routine Modal
  // ------------------------------------------------------------------------
  openRoutineModal(routine = null) {
    if (routine) {
      this.dom.routineModalTitle.textContent = 'Edit Healthy Routine';
      this.dom.routineFormId.value = routine.id;
      this.dom.routineTitleInput.value = routine.title;
      this.dom.routinePhaseSelect.value = routine.phase;
      this.dom.routineTimeInput.value = routine.time || '08:00';
      this.dom.routineCategorySelect.value = routine.category;
      this.dom.routineDurationInput.value = routine.duration || 15;
      this.dom.routinePrioritySelect.value = routine.priority;
      this.dom.routineIconInput.value = routine.icon || '🌿';
      this.dom.routineNotesInput.value = routine.benefit || '';
    } else {
      this.dom.routineModalTitle.textContent = 'Add Healthy Routine';
      this.dom.routineFormId.value = '';
      this.dom.routineForm.reset();
      this.dom.routinePhaseSelect.value = this.currentPhase !== 'all' ? this.currentPhase : 'morning';
      this.dom.routineCategorySelect.value = this.currentCategory !== 'all' ? this.currentCategory : 'movement';
      this.dom.routineTimeInput.value = '08:00';
      this.dom.routineDurationInput.value = '15';
    }
    this.dom.routineModal.style.display = 'flex';
    this.dom.routineTitleInput.focus();
  }

  closeRoutineModal() {
    this.dom.routineModal.style.display = 'none';
  }

  handleRoutineFormSubmit(e) {
    e.preventDefault();
    const id = this.dom.routineFormId.value;
    const title = this.dom.routineTitleInput.value.trim();
    if (!title) return;

    const phase = this.dom.routinePhaseSelect.value;
    const time = this.dom.routineTimeInput.value;
    const category = this.dom.routineCategorySelect.value;
    const duration = parseInt(this.dom.routineDurationInput.value, 10) || 15;
    const priority = this.dom.routinePrioritySelect.value;
    const icon = this.dom.routineIconInput.value || '🌿';
    const benefit = this.dom.routineNotesInput.value.trim();

    if (id) {
      // Edit existing
      const existing = this.routines.find(r => r.id === id);
      if (existing) {
        existing.title = title;
        existing.phase = phase;
        existing.time = time;
        existing.category = category;
        existing.duration = duration;
        existing.priority = priority;
        existing.icon = icon;
        existing.benefit = benefit;
      }
      this.showToast(`Updated "${title}"`);
    } else {
      // Create new
      const newRoutine = {
        id: 'routine-' + Date.now(),
        title,
        phase,
        time,
        category,
        duration,
        priority,
        icon,
        benefit,
        completed: false,
        streak: 1
      };
      this.routines.push(newRoutine);
      this.sound.playHabitChime();
      this.showToast(`Added "${title}" to your routine! 🌱`);
    }

    this.saveRoutines();
    this.closeRoutineModal();
    this.renderRoutines();
    this.updateWellnessScore();
  }

  // ------------------------------------------------------------------------
  // Breathwork & Zen Focus Timer Modal
  // ------------------------------------------------------------------------
  openBreathworkModal() {
    this.dom.breathworkModal.style.display = 'flex';
    this.setZenMode('478');
  }

  closeBreathworkModal() {
    this.stopBreathingExercise();
    this.dom.breathworkModal.style.display = 'none';
  }

  setZenMode(mode) {
    this.stopBreathingExercise();
    this.dom.tabModeBreathing.classList.toggle('active', mode === '478');
    this.dom.tabModeBox.classList.toggle('active', mode === 'box');
    this.dom.tabModeTimer.classList.toggle('active', mode === 'timer');

    if (mode === 'timer') {
      this.dom.breathingGuideView.style.display = 'none';
      this.dom.timerView.style.display = 'block';
    } else {
      this.dom.breathingGuideView.style.display = 'block';
      this.dom.timerView.style.display = 'none';
      this.breathingMode = mode;

      if (mode === '478') {
        this.dom.breathGuidance.textContent = 'Inhale calmly through your nose for 4s, hold gently for 7s, exhale completely through mouth for 8s.';
      } else {
        this.dom.breathGuidance.textContent = 'Box Breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold empty 4s. Used by athletes & Navy SEALs for supreme focus.';
      }
    }
  }

  startBreathingExercise() {
    this.breathingActive = true;
    this.breathingCycles = 0;
    this.dom.startBreathingBtn.style.display = 'none';
    this.dom.stopBreathingBtn.style.display = 'inline-block';
    this.dom.breathCycleCount.textContent = '0';

    this.sound.playSingingBowl(432);
    this.runBreathingLoop();
  }

  stopBreathingExercise() {
    this.breathingActive = false;
    clearTimeout(this.breathingTimer);
    clearInterval(this.breathSecondsInterval);

    this.dom.startBreathingBtn.style.display = 'inline-block';
    this.dom.stopBreathingBtn.style.display = 'none';
    this.dom.breathInstruction.textContent = 'Ready';
    this.dom.breathSeconds.textContent = '';
    this.dom.breathOrb.style.transform = 'scale(1)';
    this.dom.breathAura.style.transform = 'scale(1)';
  }

  runBreathingLoop() {
    if (!this.breathingActive) return;

    if (this.breathingMode === '478') {
      // 4-7-8 Protocol: Inhale 4s, Hold 7s, Exhale 8s
      this.executeBreathPhase('Inhale', 4, 1.45, () => {
        this.executeBreathPhase('Hold', 7, 1.45, () => {
          this.executeBreathPhase('Exhale', 8, 0.95, () => {
            this.breathingCycles++;
            this.dom.breathCycleCount.textContent = this.breathingCycles;
            this.metrics.mindfulnessSessions = (this.metrics.mindfulnessSessions || 0) + 1;
            this.saveMetrics();
            this.updateWellnessScore();

            if (this.breathingCycles >= 4) {
              this.stopBreathingExercise();
              this.sound.playSingingBowl(528);
              this.confetti.fire(50);
              this.showToast('🌿 4 cycles complete! Your nervous system is deeply recalibrated.');
            } else {
              this.runBreathingLoop();
            }
          });
        });
      });
    } else {
      // Box Breathing: 4-4-4-4
      this.executeBreathPhase('Inhale', 4, 1.4, () => {
        this.executeBreathPhase('Hold', 4, 1.4, () => {
          this.executeBreathPhase('Exhale', 4, 0.95, () => {
            this.executeBreathPhase('Hold Empty', 4, 0.95, () => {
              this.breathingCycles++;
              this.dom.breathCycleCount.textContent = this.breathingCycles;
              this.metrics.mindfulnessSessions = (this.metrics.mindfulnessSessions || 0) + 1;
              this.saveMetrics();
              this.updateWellnessScore();

              if (this.breathingCycles >= 4) {
                this.stopBreathingExercise();
                this.sound.playSingingBowl(528);
                this.confetti.fire(50);
                this.showToast('🎯 Box breathing complete! Senses sharpened and calm.');
              } else {
                this.runBreathingLoop();
              }
            });
          });
        });
      });
    }
  }

  executeBreathPhase(text, seconds, scale, onComplete) {
    if (!this.breathingActive) return;

    this.dom.breathInstruction.textContent = text;
    this.dom.breathSeconds.textContent = `${seconds}s`;
    this.dom.breathOrb.style.transform = `scale(${scale})`;
    this.dom.breathAura.style.transform = `scale(${scale * 1.1})`;

    if (text === 'Inhale') {
      this.sound.playSingingBowl(380);
    } else if (text === 'Exhale') {
      this.sound.playSingingBowl(285);
    }

    let remaining = seconds;
    clearInterval(this.breathSecondsInterval);
    this.breathSecondsInterval = setInterval(() => {
      remaining--;
      if (remaining > 0 && this.breathingActive) {
        this.dom.breathSeconds.textContent = `${remaining}s`;
      }
    }, 1000);

    this.breathingTimer = setTimeout(() => {
      clearInterval(this.breathSecondsInterval);
      if (this.breathingActive) onComplete();
    }, seconds * 1000);
  }

  // ------------------------------------------------------------------------
  // Routine Focus Timer
  // ------------------------------------------------------------------------
  openRoutineTimer(routine) {
    this.openBreathworkModal();
    this.setZenMode('timer');
    this.dom.timerTaskName.textContent = routine.title;
    const mins = routine.duration || 15;
    this.setTimerDuration(mins);
  }

  setTimerDuration(mins) {
    this.resetFocusTimer();
    this.timerRemainingSeconds = mins * 60;
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.timerRemainingSeconds / 60);
    const secs = this.timerRemainingSeconds % 60;
    this.dom.timerDigits.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  toggleFocusTimer() {
    if (this.timerIsRunning) {
      clearInterval(this.timerInterval);
      this.timerIsRunning = false;
      this.dom.startTimerBtn.textContent = 'Resume Timer';
    } else {
      this.timerIsRunning = true;
      this.dom.startTimerBtn.textContent = 'Pause Timer';
      this.sound.playHabitChime();

      this.timerInterval = setInterval(() => {
        if (this.timerRemainingSeconds > 0) {
          this.timerRemainingSeconds--;
          this.updateTimerDisplay();
        } else {
          clearInterval(this.timerInterval);
          this.timerIsRunning = false;
          this.dom.startTimerBtn.textContent = 'Start Timer';
          this.sound.playSingingBowl(528);
          this.confetti.fire(80);
          this.showToast('🔔 Time completed! Wonderful focus on your routine.');
        }
      }, 1000);
    }
  }

  resetFocusTimer() {
    clearInterval(this.timerInterval);
    this.timerIsRunning = false;
    this.dom.startTimerBtn.textContent = 'Start Timer';
    this.updateTimerDisplay();
  }

  // ------------------------------------------------------------------------
  // Data Export & Import
  // ------------------------------------------------------------------------
  exportRoutineData() {
    const payload = {
      version: 2,
      exportDate: new Date().toISOString(),
      routines: this.routines,
      metrics: this.metrics,
      streakHistory: this.streakHistory
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vitalflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Exported routine backup file');
  }

  importRoutineData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.routines && Array.isArray(data.routines)) {
          this.routines = data.routines;
          this.saveRoutines();
        }
        if (data.metrics) {
          this.metrics = data.metrics;
          this.saveMetrics();
        }
        if (data.streakHistory) {
          this.streakHistory = data.streakHistory;
          this.saveStreakHistory();
        }
        this.renderAll();
        this.sound.playHabitChime();
        this.showToast('Routine data successfully restored! 🌿');
      } catch (err) {
        alert('Invalid routine backup file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  // ------------------------------------------------------------------------
  // Toast Notifications
  // ------------------------------------------------------------------------
  showToast(message, allowUndo = false) {
    const toast = document.createElement('div');
    toast.className = 'toast';

    toast.innerHTML = `
      <span class="toast-icon">✨</span>
      <span class="toast-msg">${this.escapeHTML(message)}</span>
      ${allowUndo ? `<button type="button" class="toast-undo-btn" id="toastUndoBtn">Undo</button>` : ''}
    `;

    if (allowUndo) {
      toast.querySelector('#toastUndoBtn').addEventListener('click', () => {
        this.undoDelete();
        toast.remove();
      });
    }

    this.dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // ------------------------------------------------------------------------
  // Utilities & Full Render
  // ------------------------------------------------------------------------
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderAll() {
    this.renderStreaks();
    this.renderBiohack();
    this.renderVitals();
    this.renderRoutines();
    this.updateWellnessScore();
  }
}

// --------------------------------------------------------------------------
// 5. Bootstrap Application on DOM Ready
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  window.vitalFlow = new VitalFlowApp();
});
