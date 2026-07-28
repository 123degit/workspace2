import { Navigate, Route, Routes } from 'react-router-dom';
import { LearningShell } from '../components/layout/LearningShell';
import { TodayPage } from '../features/today/TodayPage';
import { ReviewPage } from '../features/review/ReviewPage';
import { VocabularyPage } from '../features/vocabulary/VocabularyPage';
import { ExtensionPage } from '../features/extension/ExtensionPage';
import { ReportPage } from '../features/report/ReportPage';
import { ShopPage } from '../features/shop/ShopPage';

export default function App() { return <Routes><Route element={<LearningShell />}><Route path="/today" element={<TodayPage />} /><Route path="/review" element={<ReviewPage />} /><Route path="/vocabulary/*" element={<VocabularyPage />} /><Route path="/extension" element={<ExtensionPage />} /><Route path="/report" element={<ReportPage />} /><Route path="/shop" element={<ShopPage />} /><Route path="*" element={<Navigate to="/today" replace />} /></Route></Routes>; }
