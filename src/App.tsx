import React, { useState, useCallback } from 'react';
import {
  KioskScreen,
  KioskMode,
  Language,
  BodyType,
  ClothingSize,
  Gender,
  Occasion,
  StylePreference,
  GarmentStyle,
  Fabric,
  CustomerSession,
  AppExperienceMode,
} from './types';
import { FABRIC_CATALOG } from './data/fabrics';
import { KioskFrame } from './components/KioskFrame';
import { KioskBackground } from './components/KioskBackground';
import { PadavalaWebApp } from './webapp/PadavalaWebApp';

// Screen Components
import { K1Attract } from './screens/K1Attract';
import { K2ModeSelect } from './screens/K2ModeSelect';
import { K3CustomerPhoto } from './screens/K3CustomerPhoto';
import { K4BodyDetails } from './screens/K4BodyDetails';
import { K5StyleQuestions } from './screens/K5StyleQuestions';
import { K6CatalogBrowse } from './screens/K6CatalogBrowse';
import { K6aFabricDetail } from './screens/K6aFabricDetail';
import { K7TryOnProcessing } from './screens/K7TryOnProcessing';
import { K8TryOnResult } from './screens/K8TryOnResult';
import { K9InquiryForm } from './screens/K9InquiryForm';
import { K10ThankYou } from './screens/K10ThankYou';

const DEFAULT_SESSION: CustomerSession = {
  language: 'en',
  mode: 'try_on',
  photoUrl: null,
  photoSource: null,
  consentSavePhoto: true,
  heightFeet: 5,
  heightInches: 5,
  heightCm: 165,
  heightUnit: 'ft',
  bodyType: 'regular',
  size: 'M',
  gender: 'women',
  occasions: ['Wedding'],
  stylePreference: 'Royal',
  supportingCloth: true,
  lookDescription: '',
  selectedFabric: FABRIC_CATALOG[0],
  selectedGarment: 'Saree',
  calculatedMetres: 7.5,
  calculatedTotalCost: 6375,
  customerName: '',
  customerPhone: '',
  preferredVisitTime: 'Today',
  specialRequests: '',
  inquirySubmitted: false,
  sessionId: 'PDV-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
};

export function App() {
  const [experienceMode, setExperienceMode] = useState<AppExperienceMode>('web');
  const [currentScreen, setCurrentScreen] = useState<KioskScreen>('K1');
  const [session, setSession] = useState<CustomerSession>(DEFAULT_SESSION);

  // Reset session safely back to K1
  const handleResetSession = useCallback(() => {
    setSession({
      ...DEFAULT_SESSION,
      sessionId: 'PDV-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    });
    setCurrentScreen('K1');
  }, []);

  // Update language
  const handleLanguageChange = (lang: Language) => {
    setSession((prev) => ({ ...prev, language: lang }));
  };

  // K1 -> K2
  const handleStartFromAttract = () => {
    setCurrentScreen('K2');
  };

  // K2 -> K3
  const handleSelectMode = (mode: KioskMode) => {
    setSession((prev) => ({ ...prev, mode }));
    setCurrentScreen('K3');
  };

  // K3 Photo Selected
  const handlePhotoSelected = (url: string, source: 'camera' | 'upload' | 'sample') => {
    setSession((prev) => ({
      ...prev,
      photoUrl: url,
      photoSource: source,
    }));
  };

  const handleToggleConsent = (val: boolean) => {
    setSession((prev) => ({ ...prev, consentSavePhoto: val }));
  };

  // K3 -> K4
  const handleContinueFromPhoto = () => {
    setCurrentScreen('K4');
  };

  // K4 Body Details
  const handleHeightChange = (feet: number, inches: number, cm: number) => {
    setSession((prev) => ({
      ...prev,
      heightFeet: feet,
      heightInches: inches,
      heightCm: cm,
    }));
  };

  const handleUnitChange = (unit: 'ft' | 'cm') => {
    setSession((prev) => ({ ...prev, heightUnit: unit }));
  };

  const handleBodyTypeChange = (bodyType: BodyType) => {
    setSession((prev) => ({ ...prev, bodyType }));
  };

  const handleSizeChange = (size: ClothingSize) => {
    setSession((prev) => ({ ...prev, size }));
  };

  const handleGenderChange = (gender: Gender) => {
    setSession((prev) => ({
      ...prev,
      gender,
      selectedGarment: gender === 'men' ? 'Sherwani' : 'Saree',
    }));
  };

  // K4 -> K5
  const handleContinueFromBody = () => {
    setCurrentScreen('K5');
  };

  // K5 Style Questions
  const handleToggleOccasion = (occ: Occasion) => {
    setSession((prev) => {
      const exists = prev.occasions.includes(occ);
      const updated = exists
        ? prev.occasions.filter((o) => o !== occ)
        : [...prev.occasions, occ];
      return { ...prev, occasions: updated.length > 0 ? updated : [occ] };
    });
  };

  const handleStyleChange = (stylePreference: StylePreference) => {
    setSession((prev) => ({ ...prev, stylePreference }));
  };

  const handleSupportingClothChange = (supportingCloth: boolean) => {
    setSession((prev) => ({ ...prev, supportingCloth }));
  };

  const handleDescriptionChange = (lookDescription: string) => {
    setSession((prev) => ({ ...prev, lookDescription }));
  };

  // K5 -> K6
  const handleContinueFromStyle = () => {
    setCurrentScreen('K6');
  };

  // K6 Catalog -> K6a Detail
  const handleSelectFabric = (fabric: Fabric) => {
    setSession((prev) => ({
      ...prev,
      selectedFabric: fabric,
      selectedGarment: fabric.defaultGarment,
    }));
    setCurrentScreen('K6a');
  };

  // K6a Detail -> K7 Processing
  const handleStartTryOn = (
    fabric: Fabric,
    garment: GarmentStyle,
    totalMetres: number,
    totalCost: number
  ) => {
    setSession((prev) => ({
      ...prev,
      selectedFabric: fabric,
      selectedGarment: garment,
      calculatedMetres: totalMetres,
      calculatedTotalCost: totalCost,
    }));
    setCurrentScreen('K7');
  };

  // K7 Processing Complete -> K8 Result
  const handleProcessingComplete = () => {
    setCurrentScreen('K8');
  };

  // K7 Processing Cancel -> K6a
  const handleProcessingCancel = () => {
    setCurrentScreen('K6a');
  };

  // K8 Result Actions
  const handleBuyThis = () => {
    setCurrentScreen('K9');
  };

  const handleTryAnother = () => {
    setCurrentScreen('K6');
  };

  // K9 Inquiry Form Actions
  const handleNameChange = (name: string) => {
    setSession((prev) => ({ ...prev, customerName: name }));
  };

  const handlePhoneChange = (phone: string) => {
    setSession((prev) => ({ ...prev, customerPhone: phone }));
  };

  const handleVisitTimeChange = (time: 'Today' | 'Tomorrow' | 'Later') => {
    setSession((prev) => ({ ...prev, preferredVisitTime: time }));
  };

  const handleRequestChange = (req: string) => {
    setSession((prev) => ({ ...prev, specialRequests: req }));
  };

  const handleSubmitInquiry = () => {
    setSession((prev) => ({ ...prev, inquirySubmitted: true }));
    setCurrentScreen('K10');
  };

  const handleSkipInquiry = () => {
    setCurrentScreen('K10');
  };

  if (experienceMode === 'web') {
    return (
      <PadavalaWebApp
        experienceMode={experienceMode}
        onSwitchExperience={setExperienceMode}
      />
    );
  }

  return (
    <KioskFrame
      currentScreen={currentScreen}
      onNavigateScreen={(s) => setCurrentScreen(s)}
      language={session.language}
      onLanguageChange={handleLanguageChange}
      onResetSession={handleResetSession}
      experienceMode={experienceMode}
      onSwitchExperience={setExperienceMode}
    >
      <KioskBackground>
        {currentScreen === 'K1' && (
          <K1Attract
            onStart={handleStartFromAttract}
            language={session.language}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'K2' && (
          <K2ModeSelect
            onSelectMode={handleSelectMode}
            onBack={() => setCurrentScreen('K1')}
            language={session.language}
          />
        )}

        {currentScreen === 'K3' && (
          <K3CustomerPhoto
            photoUrl={session.photoUrl}
            onPhotoSelected={handlePhotoSelected}
            consentSave={session.consentSavePhoto}
            onToggleConsent={handleToggleConsent}
            onContinue={handleContinueFromPhoto}
            onBack={() => setCurrentScreen('K2')}
            language={session.language}
          />
        )}

        {currentScreen === 'K4' && (
          <K4BodyDetails
            heightFeet={session.heightFeet}
            heightInches={session.heightInches}
            heightCm={session.heightCm}
            heightUnit={session.heightUnit}
            onHeightChange={handleHeightChange}
            onUnitChange={handleUnitChange}
            bodyType={session.bodyType}
            onBodyTypeChange={handleBodyTypeChange}
            size={session.size}
            onSizeChange={handleSizeChange}
            gender={session.gender}
            onGenderChange={handleGenderChange}
            onContinue={handleContinueFromBody}
            onBack={() => setCurrentScreen('K3')}
            language={session.language}
          />
        )}

        {currentScreen === 'K5' && (
          <K5StyleQuestions
            occasions={session.occasions}
            onToggleOccasion={handleToggleOccasion}
            stylePreference={session.stylePreference}
            onStyleChange={handleStyleChange}
            supportingCloth={session.supportingCloth}
            onSupportingClothChange={handleSupportingClothChange}
            lookDescription={session.lookDescription}
            onDescriptionChange={handleDescriptionChange}
            onContinue={handleContinueFromStyle}
            onBack={() => setCurrentScreen('K4')}
            language={session.language}
          />
        )}

        {currentScreen === 'K6' && (
          <K6CatalogBrowse
            onSelectFabric={handleSelectFabric}
            onBack={() => setCurrentScreen('K5')}
            language={session.language}
          />
        )}

        {currentScreen === 'K6a' && session.selectedFabric && (
          <K6aFabricDetail
            fabric={session.selectedFabric}
            selectedGarment={session.selectedGarment}
            onGarmentChange={(g) =>
              setSession((prev) => ({ ...prev, selectedGarment: g }))
            }
            heightFeet={session.heightFeet + session.heightInches / 12}
            bodyType={session.bodyType}
            onStartTryOn={handleStartTryOn}
            onBack={() => setCurrentScreen('K6')}
            language={session.language}
          />
        )}

        {currentScreen === 'K7' && (
          <K7TryOnProcessing
            fabric={session.selectedFabric}
            garment={session.selectedGarment}
            onComplete={handleProcessingComplete}
            onCancel={handleProcessingCancel}
            language={session.language}
          />
        )}

        {currentScreen === 'K8' && (
          <K8TryOnResult
            customerPhotoUrl={session.photoUrl}
            fabric={session.selectedFabric}
            garment={session.selectedGarment}
            calculatedMetres={session.calculatedMetres}
            calculatedCost={session.calculatedTotalCost}
            mode={session.mode}
            onBuyThis={handleBuyThis}
            onTryAnother={handleTryAnother}
            onBack={() => setCurrentScreen('K6a')}
            language={session.language}
          />
        )}

        {currentScreen === 'K9' && (
          <K9InquiryForm
            fabric={session.selectedFabric}
            garment={session.selectedGarment}
            calculatedMetres={session.calculatedMetres}
            calculatedCost={session.calculatedTotalCost}
            customerName={session.customerName}
            customerPhone={session.customerPhone}
            preferredVisitTime={session.preferredVisitTime}
            specialRequests={session.specialRequests}
            onNameChange={handleNameChange}
            onPhoneChange={handlePhoneChange}
            onVisitTimeChange={handleVisitTimeChange}
            onRequestChange={handleRequestChange}
            onSubmitInquiry={handleSubmitInquiry}
            onSkip={handleSkipInquiry}
            onBack={() => setCurrentScreen('K8')}
            language={session.language}
          />
        )}

        {currentScreen === 'K10' && (
          <K10ThankYou
            fabric={session.selectedFabric}
            garment={session.selectedGarment}
            calculatedCost={session.calculatedTotalCost}
            customerName={session.customerName}
            sessionId={session.sessionId}
            onStartNewSession={handleResetSession}
            language={session.language}
          />
        )}
      </KioskBackground>
    </KioskFrame>
  );
}

export default App;
