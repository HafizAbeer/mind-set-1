import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import "./App.css";

// Pages
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPassword";
import EnterPinPage from "./pages/EnterPin";
import NewPasswordPage from "./pages/NewPassword";
import DashboardPage from "./pages/Dashboard";
import MindsetModule from "./pages/MindsetModule";
import TriggerRadar from "./pages/TriggerRadar";
import CauseRadar from "./pages/CauseRadar";
import CauseSelect from "./pages/CauseSelect";
import ReflectionRadar from "./pages/ReflectionRadar";
import ReflectionQuestions from "./pages/ReflectionQuestions";
import ReflectionTrigger from "./pages/ReflectionTrigger";
import ReflectionAspects from "./pages/ReflectionAspects";
import ReflectionExperiences from "./pages/ReflectionExperiences";
import ReflectionBehaviour from "./pages/ReflectionBehaviour";
import ReflectionConsequences from "./pages/ReflectionConsequences";
import ReflectionViews from "./pages/ReflectionViews";
import SymptomSelect from "./pages/SymptomSelect";
import IntentionSelect from "./pages/IntentionSelect";
import ExercisesSelect from "./pages/ExercisesSelect";
import LifeScriptSelect from "./pages/LifeScriptSelect";
import OldScriptSelect from "./pages/OldScriptSelect";
import NewScriptSelect from "./pages/NewScriptSelect";
import SuccessGaugeSelect from "./pages/SuccessGaugeSelect";
import SlightImprovement from "./pages/SlightImprovement";
import ClearImprovement from "./pages/ClearImprovement";
import InconstantDevelopment from "./pages/InconstantDevelopment";
import MostlyProblemFree from "./pages/MostlyProblemFree";
import LittleWorsening from "./pages/LittleWorsening";
import NoChangings from "./pages/NoChangings";
import LongTimeProblemFree from "./pages/LongTimeProblemFree";
import SlightImprovementFeedback from "./pages/SlightImprovementFeedback";
import ClearImprovementFeedback from "./pages/ClearImprovementFeedback";
import InconstantDevelopmentFeedback from "./pages/InconstantDevelopmentFeedback";
import MostlyProblemFreeFeedback from "./pages/MostlyProblemFreeFeedback";
import LittleWorseningFeedback from "./pages/LittleWorseningFeedback";
import NoChangingsFeedback from "./pages/NoChangingsFeedback";
import LongTimeProblemFreeFeedback from "./pages/LongTimeProblemFreeFeedback";
import SuccessGaugeFeedback from "./pages/SuccessGaugeFeedback";
import AnchorRadarSelect from "./pages/AnchorRadarSelect";
import Body from "./pages/BodyRadar";
import BodyRadarSelect from "./pages/BodyRadarSelect";
import SymptomRadar from "./pages/SymptomRadar";
import IntentionRadar from "./pages/IntentionRadar";
import AnchorRadar from "./pages/AnchorRadar";
import ExercisesRadar from "./pages/ExercisesRadar";
import LifeScriptRadar from "./pages/LifeScriptRadar";
import OldScriptRadar from "./pages/OldScriptRadar";
import NewScriptRadar from "./pages/NewScriptRadar";
import RewardChoice from "./pages/RewardChoice";
import RewardChoiceSelect from "./pages/RewardChoiceSelect";
import SuccessGuage from "./pages/SuccessGuage";
import MindsetSelect from "./pages/MindsetSelect";
import PositiveMindset from "./pages/PositiveMindset";
import UnclearMindset from "./pages/UnclearMindset";
import NegativeMindset from "./pages/NegativeMindset";
import TriggerIntroPage from "./pages/TriggerIntro";
import StatisticRevue from "./pages/StatisticRevue";
import StatisticsDetail from "./pages/StatisticsDetail";
import TherapistDialog from "./pages/TherapistDialog";
import TherapistNewEntry from "./pages/TherapistNewEntry";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";


function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/enter-pin" element={<EnterPinPage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />

        {/* Dashboard Route */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mindset" element={<MindsetModule />} />
          <Route path="/trigger" element={<TriggerIntroPage />} />
          <Route path="/trigger-radar" element={<TriggerRadar />} />
          <Route path="/cause" element={<CauseRadar />} />
          <Route path="/cause-select" element={<CauseSelect />} />
          <Route path="/reflection" element={<ReflectionRadar />} />
          <Route
            path="/reflection-questions"
            element={<ReflectionQuestions />}
          />
          <Route path="/reflection-trigger" element={<ReflectionTrigger />} />
          <Route path="/reflection-aspects" element={<ReflectionAspects />} />
          <Route
            path="/reflection-experiences"
            element={<ReflectionExperiences />}
          />
          <Route
            path="/reflection-behaviour"
            element={<ReflectionBehaviour />}
          />
          <Route
            path="/reflection-consequences"
            element={<ReflectionConsequences />}
          />
          <Route path="/reflection-views" element={<ReflectionViews />} />
          <Route path="/symptom-select" element={<SymptomSelect />} />
          <Route path="/intention-select" element={<IntentionSelect />} />
          <Route path="/exercises-select" element={<ExercisesSelect />} />
          <Route path="/life-script-select" element={<LifeScriptSelect />} />
          <Route path="/old-script-select" element={<OldScriptSelect />} />
          <Route path="/new-script-select" element={<NewScriptSelect />} />
          <Route
            path="/success-gauge-select"
            element={<SuccessGaugeSelect />}
          />
          <Route path="/slight-improvement" element={<SlightImprovement />} />
          <Route path="/clear-improvement" element={<ClearImprovement />} />
          <Route
            path="/inconstant-development"
            element={<InconstantDevelopment />}
          />
          <Route path="/mostly-problem-free" element={<MostlyProblemFree />} />
          <Route path="/little-worsening" element={<LittleWorsening />} />
          <Route path="/no-changings" element={<NoChangings />} />
          <Route
            path="/long-time-problem-free"
            element={<LongTimeProblemFree />}
          />
          <Route
            path="/slight-improvement-feedback"
            element={<SlightImprovementFeedback />}
          />
          <Route
            path="/clear-improvement-feedback"
            element={<ClearImprovementFeedback />}
          />
          <Route
            path="/inconstant-development-feedback"
            element={<InconstantDevelopmentFeedback />}
          />
          <Route
            path="/mostly-problem-free-feedback"
            element={<MostlyProblemFreeFeedback />}
          />
          <Route
            path="/little-worsening-feedback"
            element={<LittleWorseningFeedback />}
          />
          <Route
            path="/no-changings-feedback"
            element={<NoChangingsFeedback />}
          />
          <Route
            path="/long-time-problem-free-feedback"
            element={<LongTimeProblemFreeFeedback />}
          />
          <Route
            path="/success-gauge-feedback"
            element={<SuccessGaugeFeedback />}
          />
          <Route path="/body" element={<Body />} />
          <Route path="/body-select" element={<BodyRadarSelect />} />
          <Route path="/symptom" element={<SymptomRadar />} />
          <Route path="/intention" element={<IntentionRadar />} />
          <Route path="/anchor" element={<AnchorRadar />} />
          <Route path="/anchor-select" element={<AnchorRadarSelect />} />
          <Route path="/exercises" element={<ExercisesRadar />} />
          <Route path="/life-script" element={<LifeScriptRadar />} />
          <Route path="/old-script" element={<OldScriptRadar />} />
          <Route path="/new-script" element={<NewScriptRadar />} />
          <Route path="/reward-choice" element={<RewardChoice />} />
          <Route path="/reward-choice-select" element={<RewardChoiceSelect />} />
          <Route path="/success-gauge" element={<SuccessGuage />} />
          <Route path="/mindset-select" element={<MindsetSelect />} />
          <Route path="/positive-mindset" element={<PositiveMindset />} />
          <Route path="/unclear-mindset" element={<UnclearMindset />} />
          <Route path="/negative-mindset" element={<NegativeMindset />} />
          <Route path="/statistic-revue" element={<StatisticRevue />} />
          <Route path="/statistics-detail" element={<StatisticsDetail />} />
          <Route path="/therapist-dialog" element={<TherapistDialog />} />
          <Route path="/therapist-new-entry" element={<TherapistNewEntry />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
